export interface PlayListsHolder {
  playLists: PlayList[];
  mp3FilePathRelative: string;
  mp3FilePathAbsolute: string;
}

export interface Mp3Config {
  mp3FilePathRelative: string;
  mp3FilePathAbsolute: string;
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
  hasFocus: boolean;
  mp3File: string;
}

export interface FileContentsResponse {
  fileContents: string;
}

export interface NetworkInfo {
  ip: string;
}

export interface FileSaveRequest {
  songName: string;
  path: string;
  fileContents: string;
}

export interface PlayListsSaveRequest {
  fileContents: string;
}
