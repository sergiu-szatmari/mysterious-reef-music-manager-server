import { Playlist } from '../model/Playlist';
import { AppResultStatus, Song } from '../model';
import { IService } from '../interface';

class PlaylistService implements IService<Song>{
// export class PlaylistService implements IService<Song>{

    constructor(private model: Playlist) { }

    get name() { return this.model.name; }

    get(): Song[] { return this.model.get(); }

    find(condition: (s: Song) => boolean, paging: { page: number, length: number } | null = null): Song[] {
        return this.model.find(condition, paging);
    }

    findOne(condition: (s: Song) => boolean): Song | null {

        return this.model.findOne(condition);
    }

    add(song: Song):
        { status: AppResultStatus, data: any | null, message: string | null } {

        if (!song) return { status: AppResultStatus.ERROR, data: null, message: 'No song entity provided' };

        return this.model.insert(song) ?
            { status: AppResultStatus.OK, data: null, message: 'Inserted' } :
            { status: AppResultStatus.ERROR, data: null, message: `Inserting song ${song.name} failed` };

    }

    updateOne(condition: (s: Song) => boolean, action: (s: Song) => void):
        { status: AppResultStatus, data: any | null, message: string | null } {

        return this.model.update(condition, action, true) ?
            { status: AppResultStatus.OK, data: null, message: 'Update successful' } :
            { status: AppResultStatus.ERROR, data: null, message: 'Update failed' };
    }

    updateMany(condition: (s: Song) => boolean, action: (s: Song) => void):
        { status: AppResultStatus, data: any | null, message: string | null } {

        return this.model.update(condition, action) ?
            { status: AppResultStatus.OK, data: null, message: 'updateMany successful' } :
            { status: AppResultStatus.ERROR, data: null, message: 'Update failed' };
    }

    deleteOne(condition: (s: Song) => boolean):
        { status: AppResultStatus, data: any | null, message: string | null } {

        return this.model.delete(condition) ?
            { status: AppResultStatus.OK, data: null, message: 'deleteOne successful' } :
            { status: AppResultStatus.ERROR, data: null, message: 'deleteOne failed' };
    }

    deleteMany(condition: (s: Song) => boolean):
        { status: AppResultStatus, data: any | null, message: string | null } {

        return this.model.delete(condition, false) ?
            { status: AppResultStatus.OK, data: null, message: 'deleteMany successful' } :
            { status: AppResultStatus.ERROR, data: null, message: 'deleteMany failed' };
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

export const playlistService: PlaylistService = new PlaylistService(new Playlist('My playlist 1'));