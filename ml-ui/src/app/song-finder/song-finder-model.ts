
export class SongFound {
  foundSongName: string;
  foundPlayListName: string;
}

export interface SongFinderResult {
  result: SongFound[];
}
