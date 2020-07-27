import { Playlist } from '../model/Playlist';
import { AppResultStatus, Song } from '../model';
import { IService } from '../interface';

class PlaylistService implements IService<Song>{

    private playlists: Playlist[];

    constructor(private model: Playlist[] | null = null) {

        this.playlists = Array();

        if (!!model) model.forEach(playlist => this.playlists.push(playlist));
    }

    get(): Playlist[] { return this.playlists; };

    findOne(name: string): Playlist | null {
        return this.playlists.filter(playlist => playlist.name === name)[0] ?? null;
    }

    addPlaylist(name: string): void {
        this.playlists.push(new Playlist(name));
    }

    addSongToPlaylist(song: Song, name: string): void {
        this.playlists.forEach(playlist => {
            if (playlist.name === name) playlist.insert(song);
        });
    }

    log() {
        this.playlists.forEach(pl => console.table(pl));
    }

    renamePlaylist(id: string, newName: string): void {
        this.playlists.forEach(playlist => {
            if (playlist.id === id) {
                playlist.name = newName;
            }
        })
    }
}

export const playlistService: PlaylistService = new PlaylistService();