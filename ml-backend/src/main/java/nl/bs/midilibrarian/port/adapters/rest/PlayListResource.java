package nl.bs.midilibrarian.port.adapters.rest;

import nl.bs.midilibrarian.GlobalConfig;
import nl.bs.midilibrarian.domain.PlayListsHolder;
import nl.bs.midilibrarian.util.PlayListLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicInteger;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PlayListResource {

    private static final Logger LOG = LoggerFactory.getLogger(PlayListResource.class);

    @GetMapping(value = "/playlists")
    public PlayListsHolder getPlayLists() {
        LOG.info("getPlayLists (JSON version) is called");
        PlayListsHolder playListsHolder = PlayListLoader.getPlayLists(GlobalConfig.getGlobalConfigInstance().getPlayListConfigFileName());
        AtomicInteger i = new AtomicInteger();
        playListsHolder.getPlayLists().stream().forEach(playList -> {
            playList.setNr(i.incrementAndGet());
            AtomicInteger j = new AtomicInteger();
            playList.getPlayListItems().stream().forEach(playListItem -> {
                playListItem.setNr(j.incrementAndGet());
            });
        });
        return playListsHolder;
    }

}
