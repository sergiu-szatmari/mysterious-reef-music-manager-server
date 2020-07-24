import { View } from './src/util';
import { Playlist } from './src/model/Playlist';
import { PlaylistService } from './src/services';

const app = () => {

    const playlist = new PlaylistService(new Playlist('My playlist 1'));
    const view = new View(playlist);

    view.addMockData();
    view.get();
    view.remove();
    view.updateOne();
    view.getPaged1();
    view.getPaged2();
    view.getNameContainsNg();
    view.getNameContainsNgPaged();
    view.get();
    view.findOne();
    view.updateMany();
    view.updateMany2();
    view.deleteMany();
    view.sortBy1();
    view.sortBy2();
};

app();