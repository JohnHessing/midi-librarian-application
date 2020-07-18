package nl.bs.midilibrarian;

import nl.bs.midilibrarian.port.adapters.rest.PlayListResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MidiLibrarianApplication {

	private static final Logger LOG = LoggerFactory.getLogger(MidiLibrarianApplication.class);

	public static void main(String[] args) {

		if (args.length > 0) {
			GlobalConfig.getGlobalConfigInstance().setPlayListConfigFileName(args[0]);
		}

		LOG.info("Midi Librarian will be using the following configuration file: {}", GlobalConfig.getGlobalConfigInstance().getPlayListConfigFileName());

		SpringApplication.run(MidiLibrarianApplication.class, args);
	}

}
