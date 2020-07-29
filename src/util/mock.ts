import {Artist, Library, Playlist, Song} from "../model";

export function mockData():
    { artists: Artist[], songs: Song[], playlists: Playlist[], libraries: Library[]  } {

    const artists: Artist[] = [
        new Artist(undefined, 'Far Caspian', new Date('2015-01-01'), 'UK'),
        new Artist(undefined, 'Of Monsters and Men', new Date('2010-02-15'), 'Iceland'),
        new Artist(undefined, 'Florence and the Machine', new Date('2007-03-03'), 'UK'),
        new Artist(undefined, 'Dj Poolboi', new Date('2017-08-06')),
        new Artist(undefined, 'Dj Aedidias', new Date('2017-05-05'))
    ];

    const songs: Song[] = [
        new Song(undefined, 'Blue', artists[0].id, 240, 'chillout', 100),
        new Song(undefined, 'Empire', artists[1].id, 350, 'Pop', 120),
        new Song(undefined, 'Wolf in sheep clothing', artists[1].id, 300, 'pop', 100),
        new Song(undefined, 'Hunger', artists[1].id, 320, 'rhythmic', 130),
        new Song(undefined, 'Hunger', artists[2].id, 300, 'dynamic', 100),
        new Song(undefined, 'Realfriends', artists[4].id, 340, 'ambiental house', 90),
        new Song(undefined, 'Morning mix', artists[3].id, 1000, 'techno', 110),
        new Song(undefined, 'Lo-Fi chillout mix', artists[4].id, 340, 'chillout', 120),
    ];

    const playlists: Playlist[] = [
        new Playlist(undefined, 'Chillout music'),
        new Playlist(undefined, 'edm')
    ];

    const libraries: Library[] = [
        new Library(undefined, 'My nice music playlists'),
    ];

    songs.filter(song => song.genre.toLowerCase().includes('chillout')).forEach(song => playlists[0].insertSong(song));
    songs.filter(song => song.duration === 340 || song.duration === 1000).forEach(song => playlists[1].insertSong(song));

    libraries[0].insertPlaylist(playlists[0]);
    libraries[0].insertPlaylist(playlists[1]);

    return { artists: artists, songs: songs, playlists: playlists, libraries: libraries };
}

export function insertMockData() {
    const dummyData = mockData();

    dummyData.artists.forEach(artist => Artist.insert(artist));
    dummyData.songs.forEach(song => Song.insert(song));
    dummyData.playlists.forEach(pl => Playlist.insert(pl));
    dummyData.libraries.forEach(lib => Library.insert(lib));
}