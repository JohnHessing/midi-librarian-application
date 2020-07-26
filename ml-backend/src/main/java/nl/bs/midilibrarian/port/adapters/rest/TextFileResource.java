package nl.bs.midilibrarian.port.adapters.rest;

import nl.bs.midilibrarian.GlobalConfig;
import nl.bs.midilibrarian.domain.FileContentsResponse;
import nl.bs.midilibrarian.domain.SavePlayListsFileRequest;
import nl.bs.midilibrarian.domain.SaveTextFileRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import nl.bs.midilibrarian.domain.TextFileRequest;

import javax.swing.text.BadLocationException;
import javax.swing.text.DefaultStyledDocument;
import javax.swing.text.rtf.RTFEditorKit;
import java.io.*;
import java.util.Scanner;

import static nl.bs.midilibrarian.util.FileUtil.getTextFromFile;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TextFileResource {

    private static final Logger LOG = LoggerFactory.getLogger(TextFileResource.class);

    private static String currenSongText = "Er is nog geen song gekozen";

    @PostMapping(value = "/textFile")
    public FileContentsResponse getFileContents(@RequestBody TextFileRequest textFileRequest) {
        String fileName = textFileRequest.getPath() + textFileRequest.getSongName() + ".html";
        LOG.info("Trying to get contents of text file {}", fileName);
        String fileContents = "Type hier je tekst...";
        if (fileIsAvailable(fileName)) {
            LOG.info("File {} found.", fileName);
            fileContents = getTextFromFile(fileName);
        } else {
            LOG.warn("File {} not found.", fileName);
        }
        LOG.info("File contents: {}", fileContents);
        FileContentsResponse response = new FileContentsResponse();
        response.setFileContents(fileContents);
        updateCurrentSong(fileContents);
        return response;
    }

    @GetMapping(value = "/currentTextFile")
    public FileContentsResponse getCurrentFileContents() {
        FileContentsResponse response = new FileContentsResponse();
        response.setFileContents(currenSongText);
        LOG.debug("Current song text is retrieved: " + response.getFileContents());
        return response;
    }

    private void updateCurrentSong(String fileContents) {
        currenSongText = fileContents;
    }

    @PostMapping(value = "/saveTextFile")
    public void saveFileContents(@RequestBody SaveTextFileRequest saveTextFileRequest) {
        String fileName = saveTextFileRequest.getPath() + saveTextFileRequest.getSongName() + ".html";
        String fileContents = saveTextFileRequest.getFileContents();
        LOG.info("Trying to write contents {} to text file {}", fileContents, fileName);
        if (fileIsAvailable(fileName)) {
            LOG.info("File {} found. Will be deleted first.", fileName);
            deleteFile(fileName);
        }
        try {
            createAndWriteFile(fileContents, fileName);
            updateCurrentSong(fileContents);
        } catch (IOException e) {
            LOG.error("File {} could not be written. {}", fileName, e.getMessage());
        }
    }

    @PostMapping(value = "/savePlayListsFile")
    public void savePlayListsFileContents(@RequestBody SavePlayListsFileRequest savePlayListsFileRequest) {
        String fileName = GlobalConfig.getGlobalConfigInstance().getPlayListConfigFileName();
        String fileContents = savePlayListsFileRequest.getFileContents();
        LOG.info("Trying to write playlists definition {} to config file {}", fileContents, fileName);
        if (fileIsAvailable(fileName)) {
            LOG.info("File {} found. Will be backuped first.", fileName);
            backupFile(fileName);
        }
        try {
            createAndWriteFile(fileContents, fileName);
        } catch (IOException e) {
            LOG.error("File {} could not be written. {}", fileName, e.getMessage());
        }
    }

    private void createAndWriteFile(String fileContents, String fileName) throws IOException {
        File file = new File(fileName);
        if (file.createNewFile()) {
            FileWriter myWriter = new FileWriter(fileName);
            myWriter.write(fileContents);
            myWriter.close();
        }
    }

    private void deleteFile(String fileName) {
        File file = new File(fileName);
        file.delete();
    }

    private void backupFile(String fileName) {
        File file = new File(fileName);
        String renameToName = fileName + ".bak";
        if (fileIsAvailable(renameToName)) {
            deleteFile(renameToName);
        }
        File renameToFile = new File(renameToName);
        file.renameTo(renameToFile);
    }

    private boolean fileIsAvailable(String fileName) {
        File file = new File(fileName);
        return (file.exists());
    }

}
