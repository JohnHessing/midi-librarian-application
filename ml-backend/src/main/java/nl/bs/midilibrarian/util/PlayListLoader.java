package nl.bs.midilibrarian.util;

import com.google.gson.Gson;
import nl.bs.midilibrarian.domain.PlayListsHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;

public class PlayListLoader {

	private static final Logger LOG = LoggerFactory.getLogger(PlayListLoader.class);

	public static PlayListsHolder getPlayLists(String fileName) {
		try {
			return new Gson().fromJson(new FileReader(fileName), PlayListsHolder.class);
		} catch (FileNotFoundException e) {
			LOG.error("Config file {} was not found, error: ({})", fileName, e.getMessage());
		}
		return new PlayListsHolder();
	}

}
