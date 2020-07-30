package nl.bs.midilibrarian.port.adapters.rest;

import nl.bs.midilibrarian.domain.AudioFiles;
import nl.bs.midilibrarian.domain.SendRequest;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Mp3FinderResource {

    @PostMapping(value = "/audioFiles")
    public AudioFiles getAudioFiles(@RequestBody SendRequest sendRequest) {
        String path = sendRequest.getPath();
        AudioFiles audioFiles = new AudioFiles();
        try (Stream<Path> paths =
                     Files.walk(Paths.get(path))) {
            paths
                    .filter(Files::isRegularFile)
                    .filter(el -> el.getFileName().toString().toLowerCase().endsWith(".mp3"))
                    .sorted()
                    .forEach(element -> {
                        audioFiles.getFiles().add(element.getFileName().toString());
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
        return audioFiles;
    }
}
