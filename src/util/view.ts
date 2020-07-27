import { AppResultStatus, Artist, Song } from '../model';
import { PlaylistService } from '../services';
import { mockData } from './mock';
import { greet } from './utils';
import { Playlist } from '../model/Playlist';

export class View {

    private dummyData: { artists: Artist[], songs: Song[] };

    constructor (private playlist: PlaylistService, private pl: Playlist) {

        greet();
        this.dummyData = mockData();
    }

    addMockData() {
        console.log()
        console.log()
        console.log("------- Adding mock data -------");
        this.dummyData.songs.forEach(song => {

            let res: { status: AppResultStatus, data: any | null, message: string | null } = this.playlist.add(song);

            switch (res.status) {
                case AppResultStatus.ERROR:
                    console.error(`Error occurred when adding song ${song.name}`);
                    break;

                case AppResultStatus.OK:
                    console.log(`Song "${song.name}" was successfully added into playlist "${this.playlist.name}"`);
                    break;
            }
        })
    }

    get() {
        console.log()
        console.log()
        console.log("------- GET -------");
        console.log(`Playlist "${this.playlist.name}":`);
        console.table(this.playlist.get().map(elem => {
            return { ...elem, artist: elem.artist.name };
        }));
    }

    remove() {

        console.log()
        console.log()
        console.log("------- Remove -------");
        console.log(`Removing song ${this.dummyData.songs[6].name}`);
        console.log(`Playlist "${this.playlist.name}":`);

        this.playlist.deleteOne(song => song.id === this.dummyData.songs[6].id);
        console.table(this.playlist.get().map(elem => {
            return { ...elem, artist: elem.artist.name };
        }));
    }

    updateOne() {
        let updated = this.dummyData.songs[4];
        console.log()
        console.log()
        console.log('------- Update -------');
        console.log(`Updating song "${updated.name}" - "${updated.artist.name}" (ID: ${updated.id}): name ==> "Never gonna give you up" ; artist to ==> "Rick Astley"`);
        console.log(`Playlist "${this.playlist.name}":`);

        updated.name = 'Never gonna give you up';
        updated.artist.name = "Rick Astley";
        this.playlist.updateOne(
            (song: Song) => song.id === updated.id,
            (song: Song) => {
                song.name = updated.name;
                song.artist = updated.artist;
                song.duration = updated.duration;
                song.genre = updated.genre;
                song.bpm = updated.bpm;
            }
        );
        console.table(this.playlist.get().map(elem => {
            return { ...elem, artist: elem.artist.name };
        }));
    }

    getPaged1() {
        console.log()
        console.log()
        console.log("------- Get Paged (len: 3, page: 1) -------");
        console.log(`Get songs on page 1 of length 3`);
        console.table(
            this.playlist
                .find(() => true, { page: 1, length: 3})
                .map(elem => {
                    return { ...elem, artist: elem.artist.name }
                })
        );
        console.log();
    }

    getPaged2() {
        console.log()
        console.log()
        console.log("------- Get Paged (len: 5, page: 1) -------");
        console.log(`Get songs on page 1 of length 5`);
        console.table(
            this.playlist
                .find(() => true, { page: 1, length: 5 })
                .map(elem => {
                    return { ...elem, artist: elem.artist.name }
                })
        );
        console.log();
    }

    getNameContainsNg() {
        console.log()
        console.log()
        console.log("------- Find all unpaged (name contains 'ng')-------");
        console.table(
            this.playlist
                .find(song => song.name.toLowerCase().includes('ng'))
                .map(elem => {
                    return { ...elem, artist: elem.artist.name }
                })
        );
        console.log();
    }

    getNameContainsNgPaged() {
        console.log()
        console.log()
        console.log("------- Find all (name contains 'ng') page 1 len 1 -------");
        console.table(
            this.playlist
                .find(song => song.name.toLowerCase().includes('ng'), { page: 1, length: 1 } )
                .map(elem => {
                    return { ...elem, artist: elem.artist.name };
                })
        );
        console.log();
    }

    findOne() {

        console.log()
        console.log()
        console.log(`------- Find one (by ID "${this.dummyData.songs[1].id}") -------`);
        console.dir(
            this.playlist.findOne(song => song.id === this.dummyData.songs[1].id)
        );
        console.log();
    }

    updateMany() {

        console.log()
        console.log()
        console.log(`------- Update many -------`);
        console.log(`Will be adding "++" before every song's name that has "chillout" genre`);
        this.playlist.updateMany(
            (song: Song) => song.genre === 'chillout',
            (song: Song) => { song.name = `++${song.name}` }
        );
        console.table(
            this.playlist.get().map(elem => {
                return { ...elem, artist: elem.artist.name };
            })
        );
        console.log();
    }

    updateMany2() {

        console.log()
        console.log()
        console.log(`------- Update many -------`);
        console.log(`Will be adding "----" before and after every song by "Of monsters and men"`);
        this.playlist.updateMany(
            (song: Song) => song.artist.name.toLowerCase().includes('Of monsters and men'.toLowerCase()),
            (song: Song) => { song.name = `----${song.name}----` }
        );
        console.table(
            this.playlist.get().map(elem => {
                return { ...elem, artist: elem.artist.name };
            })
        );
        console.log();
    }

    deleteMany() {
        console.log()
        console.log()
        console.log(`------- Delete many -------`);
        console.log(`Will be removing every song by "Of monsters and men"`);
        this.playlist.deleteMany((s: Song) => s.artist.name.toLowerCase() === "Of monsters and men".toLowerCase());
        console.table(
            this.playlist.get().map(elem => {
                return { ...elem, artist: elem.artist.name };
            })
        );
        console.log();
    }

    sortBy1() {
        console.log()
        console.log()
        console.log(`------- Sort by BPM DESC -------`);
        console.table(
            this.playlist.sort((a: Song, b: Song) => b.bpm - a.bpm).map(elem => {
                return { ...elem, artist: elem.artist.name };
            })
        );
        console.log();
    }

    sortBy2() {

        console.log()
        console.log()
        console.log(`------- Sort by duration ASC -------`);
        console.table(
            this.playlist.sort((a: Song, b: Song) => a.duration - b.duration).map(elem => {
                return { ...elem, artist: elem.artist.name };
            })
        );
        console.log();
    }

    findByArtist() {

        console.log();
        console.log();
        console.log(`------- Find by artist -------`);
        console.table(
            this.playlist
                .find((s: Song) => s.artist.name.toLowerCase().includes('aedidias'))
                .map((song: Song) => { return { ...song, artist: song.artist.name } })
        );
        console.log();
    }

    asyncGet() {
        (async () => {
            try {
                const res: Song[] = await this.pl.asyncGet();
                console.log("[Async/await] Get: ");
                console.table(res.map((song: Song) => { return { ...song, artist: song.artist.name }; } ));
            } catch (err) {
                console.error(err);
            }
        })();

        setTimeout(() => {
            this.pl.asyncGet()
                .then((result: Song[]) => {
                    console.log("[ .then() ] Get: ");
                    console.table(result.map((song: Song) => { return { ...song, artist: song.artist.name }; } ));
                })
                .catch((err: Error) => { console.error(err); });
        }, 2000);
    }

    asyncExists() {

        (async () => {
            try {
                const res: boolean = await this.pl.asyncExists(this.playlist.get()[1]);
                console.log(`[ Async/await ] Exists: ${res ? 'Exists' : 'Does not exist'}`);
            } catch (err) {
                console.error(err);
            }
        })();

        setTimeout(() => {
            this.pl.asyncExists(this.playlist.get()[1])
                .then((res: boolean) => {
                    console.log(`[ .then() ] Exists: ${res ? 'Exists' : 'Does not exist'}`);
                })
                .catch((err: Error) => { console.error(err); });
        }, 2000);
    }

    asyncInsert() {

        (async () => {
            try {
                const res: boolean = await this.pl.asyncInsert(new Song('Somename', new Artist('Some artist name', new Date()), 120, 'defualt genre', 100));
                console.log(`[ Async/await ] Insert: ${res ? 'Success' : 'Failed'}`);
            } catch (err) {
                console.error(err);
            }
        })();

        setTimeout(() => {
            this.pl.asyncExists(this.playlist.get()[1])
                .then((res: boolean) => {
                    console.log(`[ .then() ] Insert: ${res ? 'Success' : 'Failed'}`);
                })
                .catch((err: Error) => { console.error(err); });
        }, 2000);
    }

    asyncUpdate() {

        (async () => {
            try {
                const res: boolean = await this.pl.asyncUpdate(
                    (song: Song) => song.name.toLowerCase().includes('ng'),
                    (song: Song) => song.name = `>>>${song.name}<<<`
                );
                console.log(`[ Async/await ] Update: ${res ? 'Success' : 'Failed'}`);
            } catch (err) {
                console.error(err);
            }
        })();

        setTimeout(() => {
            this.pl.asyncUpdate(
                (song: Song) => song.name.toLowerCase().includes('ng'),
                (song: Song) => song.name = `>>>${song.name}<<<`
            )
                .then((res: boolean) => {
                    console.log(`[ .then() ] Update: ${res ? 'Success' : 'Failed'}`);
                })
                .catch((err: Error) => { console.error(err); });
        }, 2000);
    }

    asyncDelete() {

        (async () => {
            try {
                const res: boolean = await this.pl.asyncDelete((song: Song) => song.duration > 200);
                console.log(`[ Async/await ] Delete: ${res ? 'Success' : 'Failed'}`);
            } catch (err) {
                console.error(err);
            }
        })();

        setTimeout(() => {
            this.pl.asyncDelete((song: Song) => song.duration > 200)
                .then((res: boolean) => {
                    console.log(`[ .then() ] Delete: ${res ? 'Success' : 'Failed'}`);
                })
                .catch((err: Error) => { console.error(err); });
        }, 2000);
    }
}