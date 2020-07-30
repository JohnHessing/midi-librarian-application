package nl.bs.midilibrarian.domain;

import java.util.ArrayList;
import java.util.List;

public class AudioFiles {
    public List<String> files = new ArrayList<>();

    public List<String> getFiles() {
        return files;
    }

    public void setFiles(List<String> files) {
        this.files = files;
    }
}
