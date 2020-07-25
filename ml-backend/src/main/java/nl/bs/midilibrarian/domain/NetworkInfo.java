package nl.bs.midilibrarian.domain;

/**
 * Created by John on 19/07/2020.
 */
public class NetworkInfo {
    private String ip;

    public NetworkInfo(String ip) {
        this.ip = ip;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
}
