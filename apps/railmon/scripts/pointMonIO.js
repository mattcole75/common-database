const PointMonIO = require('../class/pointMonIO');
const config = require('../../../config/scripts/tms/io/pointMonIO');
const pointIO = [];

// load point IO
config.forEach(point => {
    const { id, area, path, IO } = point
    const pointMonIO = new PointMonIO(id, area, path, IO);
    pointIO.push(pointMonIO);

    console.log('ok - ' + id + ' IO monitor is ready.');
});

// start monitoring
pointIO.forEach(io => {
    io.start();

    console.log('ok - ' + io.name + ' IO monitoring started.');
});