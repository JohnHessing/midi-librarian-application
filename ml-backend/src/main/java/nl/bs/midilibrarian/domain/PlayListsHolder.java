package nl.bs.midilibrarian.domain;

import java.io.Serializable;
import java.util.List;

public class PlayListsHolder implements Serializable {
    private List<PlayList> playLists;

    public List<PlayList> getPlayLists() {
        return playLists;
    }

    public void setPlayLists(List<PlayList> playLists) {
        this.playLists = playLists;
    }
}
