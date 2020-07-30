package nl.bs.midilibrarian.domain;

import java.io.Serializable;
import java.util.List;

public class PlayListsHolder implements Serializable {
    private List<PlayList> playLists;
    private String mp3FilePathRelative;
    private String mp3FilePathAbsolute;

    public List<PlayList> getPlayLists() {
        return playLists;
    }

    public void setPlayLists(List<PlayList> playLists) {
        this.playLists = playLists;
    }

    public String getMp3FilePathRelative() {
        return mp3FilePathRelative;
    }

    public void setMp3FilePathRelative(String mp3FilePathRelative) {
        this.mp3FilePathRelative = mp3FilePathRelative;
    }

    public String getMp3FilePathAbsolute() {
        return mp3FilePathAbsolute;
    }

    public void setMp3FilePathAbsolute(String mp3FilePathAbsolute) {
        this.mp3FilePathAbsolute = mp3FilePathAbsolute;
    }
}
