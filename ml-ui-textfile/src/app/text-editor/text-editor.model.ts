export interface PlayListsHolder {
  playLists: PlayList[];
}

export interface PlayList {
  nr: number;
  path: string;
  name: string;
  playListItems: PlayListItem[];
  isActive: boolean;
}

export interface PlayListItem {
  nr: number;
  name: string;
  delay: number;
  isActive: boolean;
  isPlaying: boolean;
}

export interface FileContentsResponse {
  fileContents: string;
}