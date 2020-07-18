package nl.bs.midilibrarian;

import com.google.gson.Gson;
import nl.bs.midilibrarian.domain.PlayList;
import nl.bs.midilibrarian.domain.PlayListItem;
import nl.bs.midilibrarian.domain.PlayListsHolder;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class MidiLibrarianApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testJson() {
		PlayListsHolder holder = new PlayListsHolder();

		PlayList p1 = new PlayList(1, "path1", "name1");

		List<PlayListItem> items1 = new ArrayList<>();

		PlayListItem l1_1 = new PlayListItem();
		l1_1.setName("titel 1");
		l1_1.setDelay(1100);

		PlayListItem l1_2 = new PlayListItem();
		l1_2.setName("titel 2");
		l1_2.setDelay(1200);

		items1.add(l1_1);
		items1.add(l1_2);

		PlayList p2 = new PlayList(2, "path2", "name2");

		List<PlayListItem> items2 = new ArrayList<>();

		PlayListItem l2_1 = new PlayListItem();
		l2_1.setName("titel 3");
		l2_1.setDelay(1300);

		PlayListItem l2_2 = new PlayListItem();
		l2_2.setName("titel 4");
		l2_2.setDelay(1400);

		items2.add(l2_1);
		items2.add(l2_2);

		List<PlayList> playLists = new ArrayList<>();
		playLists.add(p1);
		playLists.add(p2);

		holder.setPlayLists(playLists);

		p1.setPlayListItems(items1);
		p2.setPlayListItems(items2);

		String json = new Gson().toJson(holder);

		System.out.println("json=" + json);

	}

}
