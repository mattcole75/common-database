const TramMonIO = require('../class/tramMonIO');
const config = require('../../config/tramMonIO');
const trams = [];

// load trams
config.forEach(tram => {
    const tramMonIO = new TramMonIO(tram.id);
    trams.push(tramMonIO);

    console.log('ok - ' + tram.id + ' monitor is ready.');
});

// start the monitoring
trams.forEach(tram => {
    tram.start();

    console.log('ok - ' + tram.id + ' monitor started.');
})