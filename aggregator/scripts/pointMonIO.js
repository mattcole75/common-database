const PointMonIO = require('../class/pointMonIO');
const config = require('../../config/pointMonIO');
const pointIO = [];

// load point IO
config.forEach(point => {
    const { id, name, area, path, IO } = point
    const pointMonIO = new PointMonIO(id, name, area, path, IO);
    pointIO.push(pointMonIO);

    console.log('ok - ' + id + ' IO monitor is ready.');
});

// start monitoring
pointIO.forEach(io => {
    io.start();

    console.log('ok - ' + io.name + ' IO monitoring started.')
});