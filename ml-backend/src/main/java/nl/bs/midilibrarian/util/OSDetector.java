package nl.bs.midilibrarian.util;

/**
 * Created with IntelliJ IDEA.
 * User: jhessing
 * Date: 12-09-13
 * Time: 08:06
 * To change this template use File | Settings | File Templates.
 */
public class OSDetector {

    private static boolean isWindows = false;
    private static boolean isLinux = false;
    private static boolean isMac = false;

    static {
        String os = System.getProperty("os.name").toLowerCase();
        isWindows = os.contains("win");
        isLinux = os.contains("nux") || os.contains("nix");
        isMac = os.contains("mac");
    }

    public static boolean isWindows() {
        return isWindows;
    }

    public static boolean isLinux() {
        return isLinux;
    }

    public static boolean isMac() {
        return isMac;
    }

    ;


}
