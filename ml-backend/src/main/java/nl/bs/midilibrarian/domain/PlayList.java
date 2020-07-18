package nl.bs.midilibrarian.domain;

import java.io.Serializable;
import java.util.List;

public class PlayList implements Serializable {
    private Integer nr;

    private String path;
    private String name;
    private List<PlayListItem> playListItems;

    public PlayList(Integer nr, String path, String name) {
        this.nr = nr;
        this.path = path;
        this.name = name;
    }

    public Integer getNr() {
        return nr;
    }

    public void setNr(Integer nr) {
        this.nr = nr;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<PlayListItem> getPlayListItems() {
        return playListItems;
    }

    public void setPlayListItems(List<PlayListItem> playListItems) {
        this.playListItems = playListItems;
    }
}
