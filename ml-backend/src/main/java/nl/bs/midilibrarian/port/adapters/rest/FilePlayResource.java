package nl.bs.midilibrarian.port.adapters.rest;

import nl.bs.midilibrarian.domain.PlayListItem;
import nl.bs.midilibrarian.domain.SendRequest;
import nl.bs.midilibrarian.util.MidiCommon;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.sound.midi.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FilePlayResource {

    private static final Logger LOG = LoggerFactory.getLogger(FilePlayResource.class);

    @PostMapping(value = "/sendFile")
    public Boolean sendFile(@RequestBody SendRequest sendRequest) {
        Boolean result = false;
        String selectedOutputDevice = MidiCommon.getAvailableOutputDevice();
        try {
            sendSysExFile(sendRequest.getSongName(),
                    sendRequest.getPath(),
                    selectedOutputDevice,
                    sendRequest.getDelay());
            result = true;
        } catch (MidiUnavailableException e) {
            LOG.error("selectedOutputDevice: {} was not found.", selectedOutputDevice );
        }
        return result;
    }

    private void sendSysExFile(String songName, String path, String selectedOutputDevice, Integer delay) throws MidiUnavailableException {
        String fileName = path + songName + ".syx";
        byte[] fileContent = MidiCommon.readSysExFile(fileName);

        LOG.info("selectedOutputDevice: " + selectedOutputDevice);
        LOG.info("fileName: " + fileName);

        MidiDevice device = MidiCommon.getMidiDevice(selectedOutputDevice, true);
        if (device != null) {
            try {
                device.open();
                Receiver receiver;
                receiver = device.getReceiver();
                long timeStamp = -1;
                sendMessage(receiver, fileContent, timeStamp, delay);
            } finally {
                device.close();
            }
        } else {
            LOG.error("Midi device ({}) not available.", selectedOutputDevice);
        }
    }

    private void sendMessage(Receiver receiver, byte[] fileContent, long timeStamp, long delayInMiliSeconds) {
        int eomValue = -9; // F7
        int posBegin = 0;
        int posEnd = 0;
        for (int i = 0; i <= fileContent.length - 1; i++) {
            byte nextByte = fileContent[i];
            if (nextByte == eomValue) {
                byte[] messageBytes = new byte[posEnd - posBegin + 1];
                for (int j = 0; j <= posEnd - posBegin; j++) {
                    messageBytes[j] = fileContent[posBegin + j];
                }
                SysexMessage sysexMessage;
                try {
                    sysexMessage = new SysexMessage();
                    sysexMessage.setMessage(messageBytes, messageBytes.length);
                    receiver.send(sysexMessage, timeStamp);
                    posBegin = posEnd + 1;
                    try {
                        Thread.sleep(delayInMiliSeconds);
                    } catch (InterruptedException e) {
                        LOG.warn("Unexpected interruption while sleeping {}", e);
                    }
                } catch (InvalidMidiDataException e1) {
                    LOG.warn("Unexpected exception while sending midi message {}", e1);
                }
            }
            ++posEnd;
        }
    }

}
