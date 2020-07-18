package nl.bs.midilibrarian.domain;

import java.io.Serializable;

public class PlayListItem implements Serializable {
    private Integer nr;
    private String name;
    private Integer delay;

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

    public Integer getDelay() {
        return delay;
    }

    public void setDelay(Integer delay) {
        this.delay = delay;
    }
}
