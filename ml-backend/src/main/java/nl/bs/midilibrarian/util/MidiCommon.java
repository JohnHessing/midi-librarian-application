package nl.bs.midilibrarian.util;

/*
 *	MidiCommon.java
 *
 *	This file is part of jsresources.org
 */

/*
 * Copyright (c) 1999 - 2001 by Matthias Pfisterer
 * Copyright (c) 2003 by Florian Bomers
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * - Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 * FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 |<---            this code is formatted to fit into 80 columns             --->|
 */

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sound.midi.MidiDevice;
import javax.sound.midi.MidiSystem;
import javax.sound.midi.MidiUnavailableException;
import java.io.*;
import java.util.ArrayList;
import java.util.Optional;
import java.util.stream.Stream;


/** Utility methods for MIDI examples. */
public class MidiCommon {

	private static final Logger LOG = LoggerFactory.getLogger(PlayListLoader.class);

	/**
	 * TODO: todo: flag long
	 */
	public static void listDevicesAndExit(boolean bForInput,
			boolean bForOutput, boolean bExit) {
		listDevicesAndExit(bForInput, bForOutput, false, bExit);
	}

	public static void listDevicesAndExit(boolean bForInput,
			boolean bForOutput, boolean bVerbose, boolean bExit) {
		if (bForInput && !bForOutput) {
			out("Available MIDI IN Devices:");
		} else if (!bForInput && bForOutput) {
			out("Available MIDI OUT Devices:");
		} else {
			out("Available MIDI Devices:");
		}

		MidiDevice.Info[] aInfos = MidiSystem.getMidiDeviceInfo();
		for (int i = 0; i < aInfos.length; i++) {
			try {
				MidiDevice device = MidiSystem.getMidiDevice(aInfos[i]);
				boolean bAllowsInput = (device.getMaxTransmitters() != 0);
				boolean bAllowsOutput = (device.getMaxReceivers() != 0);
				if ((bAllowsInput && bForInput)
						|| (bAllowsOutput && bForOutput)) {
					if (bVerbose) {
						out("" + i + "  " + (bAllowsInput ? "IN " : "   ")
								+ (bAllowsOutput ? "OUT " : "    ")
								+ aInfos[i].getName() + ", "
								+ aInfos[i].getVendor() + ", "
								+ aInfos[i].getVersion() + ", "
								+ aInfos[i].getDescription());
					} else {
						out("" + i + "  " + aInfos[i].getName());
					}
				}
			} catch (MidiUnavailableException e) {
				// device is obviously not available...
				// out(e);
			}
		}
		if (aInfos.length == 0) {
			out("[No devices available]");
		}
		if (bExit) {
			System.exit(0);
		}
	}

	public static ArrayList<String> getMidiInputDevices() {
		return getMidiDevices(false);
	}

	public static ArrayList<String> getMidiOutputDevices() {
		return getMidiDevices(true);
	}

	private static ArrayList<String> getMidiDevices(boolean bOutput) {
		ArrayList<String> deviceInfos = new ArrayList<String>();
		MidiDevice.Info[] aInfos = MidiSystem.getMidiDeviceInfo();
		for (int i = 0; i < aInfos.length; i++) {
			try {
				MidiDevice device = MidiSystem.getMidiDevice(aInfos[i]);
				boolean bAllowsInput = (device.getMaxTransmitters() != 0);
				boolean bAllowsOutput = (device.getMaxReceivers() != 0);
				if (!bOutput && bAllowsInput || bOutput && bAllowsOutput) {
					deviceInfos.add(aInfos[i].getName());
				}
			} catch (MidiUnavailableException e) {
				// device is obviously not available...
			}
		}

		return deviceInfos;
	}

	/**
	 * Retrieve a MidiDevice.Info for a given name.
	 * 
	 * This method tries to return a MidiDevice.Info whose name matches the
	 * passed name. If no matching MidiDevice.Info is found, null is returned.
	 * If bForOutput is true, then only output devices are searched, otherwise
	 * only input devices.
	 * 
	 * @param strDeviceName
	 *            the name of the device for which an info object should be
	 *            retrieved.
	 * @param bForOutput
	 *            If true, only output devices are considered. If false, only
	 *            input devices are considered.
	 * @return A MidiDevice.Info object matching the passed device name or null
	 *         if none could be found.
	 */
	public static MidiDevice.Info getMidiDeviceInfo(String strDeviceName,
			boolean bForOutput) {
		MidiDevice.Info[] aInfos = MidiSystem.getMidiDeviceInfo();
		for (int i = 0; i < aInfos.length; i++) {
			if (aInfos[i].getName().equals(strDeviceName)) {
				try {
					MidiDevice device = MidiSystem.getMidiDevice(aInfos[i]);
					boolean bAllowsInput = (device.getMaxTransmitters() != 0);
					boolean bAllowsOutput = (device.getMaxReceivers() != 0);
					if ((bAllowsOutput && bForOutput)
							|| (bAllowsInput && !bForOutput)) {
						return aInfos[i];
					}
				} catch (MidiUnavailableException e) {
					// TODO:
				}
			}
		}
		return null;
	}

	public static MidiDevice getMidiDevice(String strDeviceName,
			boolean bForOutput) {
		MidiDevice.Info[] aInfos = MidiSystem.getMidiDeviceInfo();
		for (int i = 0; i < aInfos.length; i++) {
			if (aInfos[i].getName().equals(strDeviceName)) {
				try {
					MidiDevice device = MidiSystem.getMidiDevice(aInfos[i]);
					boolean bAllowsInput = (device.getMaxTransmitters() != 0);
					boolean bAllowsOutput = (device.getMaxReceivers() != 0);
					if ((bAllowsOutput && bForOutput)
							|| (bAllowsInput && !bForOutput)) {
						return device;
					}
				} catch (MidiUnavailableException e) {
					// TODO:
				}
			}
		}
		return null;
	}

	/**
	 * Retrieve a MidiDevice.Info by index number. This method returns a
	 * MidiDevice.Info whose index is specified as parameter. This index matches
	 * the number printed in the listDevicesAndExit method. If index is too
	 * small or too big, null is returned.
	 * 
	 * @param index
	 *            the index of the device to be retrieved
	 * @return A MidiDevice.Info object of the specified index or null if none
	 *         could be found.
	 */
	public static MidiDevice.Info getMidiDeviceInfo(int index) {
		MidiDevice.Info[] aInfos = MidiSystem.getMidiDeviceInfo();
		if ((index < 0) || (index >= aInfos.length)) {
			return null;
		}
		return aInfos[index];
	}

	private static void out(String strMessage) {
		System.out.println(strMessage);
	}

	public static byte[] readSysExFile(String fileName) {
		File file = new File(fileName);
		byte[] fileContent = new byte[(int) file.length()];
		try {
			FileInputStream fin = new FileInputStream(file);
			fileContent = new byte[(int) file.length()];
			fin.read(fileContent);
			fin.close();
		} catch (FileNotFoundException e) {
			LOG.warn("File {} not found. Error: {}", fileName, e.getMessage());
		} catch (IOException ioe) {
			LOG.warn("Exception while reading the file {}. Error: {}", fileName, ioe.getMessage());
		}
		return fileContent;
	}
	
	public static void writeSysExFile(String fileName, byte[] fileContent) {
		File file = new File(fileName);
			FileOutputStream fin;
			try {
				fin = new FileOutputStream(file);
				try {
					fin.write(fileContent);
					try {
						fin.close();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	}
	
	public static byte[] convertMessage(byte[] fileContent) {
		int eomValue = -9;   // F7
		int posBegin = 0;
		int posEnd = 0;
		int newLength = 0;
		byte[] newFileContentHolder = new byte[fileContent.length];
		for (int i=0; i <= fileContent.length-1; i++) {
			byte nextByte = fileContent[i];
			if (nextByte == eomValue) {
				byte[] messageBytes = new byte[posEnd-posBegin+1];
				for (int j=0; j<=posEnd-posBegin;j++) {
					messageBytes[j] = fileContent[posBegin+j];
				}
				
				// if messagebytes starts with F0 42 30 63 51 00 00 00 the next byte will be the transpose value
				// This can be changed to F0 7F 00 04 04 00 followed by 64 (40 hex) plus the transpose value
				// Example: 
				// A transpose of +7 : F0 42 30 63 51 00 00 00 07 ... F7
				// Will become       : F0 7F 00 04 04 00       47     F7
				
				if (isKorgGlobalDump(messageBytes)) {
					int readTransposeValue = messageBytes[8];
					int transposeValue = 64 + readTransposeValue;
					messageBytes = new byte[8];
					messageBytes[0] = -16; // F0
					messageBytes[1] = 127; // 7F
					messageBytes[2] = 0;   // 00
					messageBytes[3] = 4;   // 04
					messageBytes[4] = 4;   // 04
					messageBytes[5] = 0;   // 00
					messageBytes[6] = (byte) transposeValue;
					messageBytes[7] = -9 ; // F7
				}

				System.arraycopy(messageBytes, 0, newFileContentHolder, newLength, messageBytes.length);
				newLength += messageBytes.length;
				
			    posBegin = posEnd + 1;
			}
			++posEnd;
		}
		byte[] newFileContent = new byte[newLength];
		System.arraycopy(newFileContentHolder, 0, newFileContent, 0, newLength);
	    
		return newFileContent;
	}

	private static boolean isKorgGlobalDump(byte[] messageBytes) {
		// if a message starts with F0 42 30 63 51 00 00 00 it is a Korg global dump
		if (messageBytes[0]==-16 && messageBytes[1]==66 && messageBytes[2]==48 && messageBytes[3]==99 && messageBytes[4]==81 && messageBytes[5]==0 && messageBytes[6]==0 && messageBytes[7]==0) {
			return true;
		}
		return false;
	}

	public static String getAvailableOutputDevice() {
		ArrayList<String> outputDevices = MidiCommon.getMidiOutputDevices();
		Optional<String> usbDevice = outputDevices.stream()
				.filter(device -> device.contains("USB") || device.contains("UM-1")).findFirst();
		if (usbDevice.isPresent()) {
			return usbDevice.get();
		}
		return "";
	}
}

/*** MidiCommon.java ***/

