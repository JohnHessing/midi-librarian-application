package nl.bs.midilibrarian.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayListItem implements Serializable {
    private Integer nr;
    private String name;
    private Integer delay;
    private String mp3File;

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

    public String getMp3File() {
        return mp3File;
    }

    public void setMp3File(String mp3File) {
        this.mp3File = mp3File;
    }

}
