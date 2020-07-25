package nl.bs.midilibrarian.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class FileUtil {

    public static String getTextFromFile(String filePath) {
        StringBuffer buffer = new StringBuffer();
        File file = new File(filePath);
        try {
            Scanner myReader = new Scanner(file);
            while (myReader.hasNextLine()) {
                buffer.append(myReader.nextLine());
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return buffer.toString();
    }

}
