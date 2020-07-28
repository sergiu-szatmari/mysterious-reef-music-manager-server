import { SongController } from './song';
import { ArtistController } from './artist';
import { PlaylistController } from './playlist';
import { LibraryController } from './library';

class MainController {

    public readonly SongController: SongController = new SongController();
    public readonly ArtistController: ArtistController = new ArtistController();
    public readonly PlaylistController: PlaylistController = new PlaylistController();
    public readonly LibraryController: LibraryController = new LibraryController();
}

export const Controller = new MainController();