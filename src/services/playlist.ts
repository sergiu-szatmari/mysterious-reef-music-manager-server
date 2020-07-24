import { Playlist } from '../model/Playlist';
import { AppResult, AppResultStatus, Song } from '../model';
import { IService } from '../interface';

export class PlaylistService implements IService<Song>{

    constructor(private model: Playlist) { }

    get name() { return this.model.name; }

    get(): Song[] {
        return this.model.get();
    }

    find(condition: (s: Song) => boolean, paging: { page: number, length: number } | null = null): Song[] {

        return this.model.find(condition, paging);
    }

    findOne(condition: (s: Song) => boolean): Song | null {

        return this.model.findOne(condition);
    }

    add(song: Song): AppResult {

        if (!song) return new AppResult(AppResultStatus.ERROR, null, 'No song entity provided');

        return this.model.insert(song) ?
            new AppResult(AppResultStatus.OK, null, 'Inserted') :
            new AppResult(AppResultStatus.ERROR, null, `Inserting song ${song.name} failed`);

    }

    updateOne(condition: (s: Song) => boolean, action: (s: Song) => void): AppResult {

        return this.model.update(condition, action, true) ?
            new AppResult(AppResultStatus.OK, null, 'Update successful') :
            new AppResult(AppResultStatus.ERROR, null, 'Update failed');
    }

    updateMany(condition: (s: Song) => boolean, action: (s: Song) => void): AppResult {

        return this.model.update(condition, action) ?
            new AppResult(AppResultStatus.OK, null, 'updateMany successful') :
            new AppResult(AppResultStatus.ERROR, null, 'Update failed');
    }

    deleteOne(condition: (s: Song) => boolean): AppResult {

        return this.model.delete(condition) ?
            new AppResult(AppResultStatus.OK, null, 'deleteOne successful') :
            new AppResult(AppResultStatus.ERROR, null, 'deleteOne failed');
    }

    deleteMany(condition: (s: Song) => boolean): AppResult {

        return this.model.delete(condition, false) ?
            new AppResult(AppResultStatus.OK, null, 'deleteMany successful') :
            new AppResult(AppResultStatus.ERROR, null, 'deleteMany failed');
    }

    filter(filterCondition: (entity: Song) => boolean): Song[] {
        return this.find(filterCondition);
    }

    sort(sortCondition: (a: Song, b: Song) => number, providedArray: Song[] | null = null): Song[] {

        return !!providedArray ?
            providedArray.sort(sortCondition) :
            this.get().sort(sortCondition);
    }


}