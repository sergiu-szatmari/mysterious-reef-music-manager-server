import { View } from './src/util';
import { Playlist } from './src/model/Playlist';
import { PlaylistService } from './src/services';

const app = () => {

    const pl = new Playlist('My playlist 1');
    const playlist = new PlaylistService(pl);
    const view = new View(playlist, pl);

    view.addMockData();
    view.get();
    // view.remove();
    // view.updateOne();
    // view.getPaged1();
    // view.getPaged2();
    // view.getNameContainsNg();
    // view.getNameContainsNgPaged();
    // view.get();
    // view.findOne();
    // view.updateMany();
    // view.updateMany2();
    // view.deleteMany();
    // view.sortBy1();
    // view.sortBy2();
    // view.findByArtist();

    console.log();
    console.log();
    console.log('=================================================================================================================');
    console.log('============================================= ASYNC/AWAIT + .THEN() =============================================');
    console.log('=================================================================================================================');
    console.log();
    console.log();

    view.asyncGet();
    view.asyncExists();
    view.asyncInsert();
    view.asyncUpdate();
    view.asyncDelete();
    view.asyncGet();
    setTimeout(() => { view.asyncGet(); }, 2000);

};

app();