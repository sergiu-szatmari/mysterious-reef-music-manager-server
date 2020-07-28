import { Artist, Song } from "../model";

export function mockData(): { artists: Artist[], songs: Song[] } {

    const artists: Artist[] = [
        new Artist(undefined, 'Far Caspian', new Date('2015-01-01'), 'UK'),
        new Artist(undefined, 'Of Monsters and Men', new Date('2010-02-15'), 'Iceland'),
        new Artist(undefined, 'Florence and the Machine', new Date('2007-03-03'), 'UK'),
        new Artist(undefined, 'Dj Poolboi', new Date('2017-08-06')),
        new Artist(undefined, 'Dj Aedidias', new Date('2017-05-05'))
    ];

    const songs: Song[] = [
        new Song(undefined, 'Blue', artists[0], 240, 'chillout', 100),
        new Song(undefined, 'Empire', artists[1], 350, 'Pop', 120),
        new Song(undefined, 'Wolf in sheep clothing', artists[1], 300, 'pop', 100),
        new Song(undefined, 'Hunger', artists[1], 320, 'rhythmic', 130),
        new Song(undefined, 'Hunger', artists[2], 300, 'dynamic', 100),
        new Song(undefined, 'Realfriends', artists[4], 340, 'ambiental house', 90),
        new Song(undefined, 'Morning mix', artists[3], 1000, 'techno', 110),
        new Song(undefined, 'Lo-Fi chillout mix', artists[4], 340, 'chillout', 120),
    ];

    return { artists: artists, songs: songs };
}