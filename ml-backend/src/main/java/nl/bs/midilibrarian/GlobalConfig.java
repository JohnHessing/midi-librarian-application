package nl.bs.midilibrarian;

public class GlobalConfig {

    private static GlobalConfig config;

    private String playListConfigFileName;

    private GlobalConfig() {}

    public static GlobalConfig getGlobalConfigInstance() {
        if (config == null) {
            config = new GlobalConfig();
            /*
                The following filename is just a default which should be overridden
                by passing it as commandline argument (see main class MidiLibrarianApplication)
             */
            config.setPlayListConfigFileName("/Users/John/IdeaProjects/midi-librarian-application/ml-backend/src/main/resources/playlists.txt");
        }
        return config;
    }

    public String getPlayListConfigFileName() {
        return playListConfigFileName;
    }

    public void setPlayListConfigFileName(String playListConfigFileName) {
        this.playListConfigFileName = playListConfigFileName;
    }

}
