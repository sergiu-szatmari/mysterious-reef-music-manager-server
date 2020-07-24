import { Artist, Song } from "../model";

export function mockData(): { artists: Artist[], songs: Song[] } {

    const artists: Artist[] = [
        new Artist('Far Caspian', new Date('2015-01-01'), 'UK'),
        new Artist('Of Monsters and Men', new Date('2010-02-15'), 'Iceland'),
        new Artist('Florence and the Machine', new Date('2007-03-03'), 'UK'),
        new Artist('Dj Poolboi', new Date('2017-08-06')),
        new Artist('Dj Aedidias', new Date('2017-05-05'))
    ];

    const songs: Song[] = [
        new Song('Blue', artists[0], 240, 'chillout', 100),
        new Song('Empire', artists[1], 350, 'Pop', 120),
        new Song('Wolf in sheep clothing', artists[1], 300, 'pop', 100),
        new Song('Hunger', artists[1], 320, 'rhythmic', 130),
        new Song('Hunger', artists[2], 300, 'dynamic', 100),
        new Song('Realfriends', artists[4], 340, 'ambiental house', 90),
        new Song('Morning mix', artists[3], 1000, 'techno', 110),
        new Song('Lo-Fi chillout mix', artists[4], 340, 'chillout', 120),
    ];

    return { artists: artists, songs: songs };
}