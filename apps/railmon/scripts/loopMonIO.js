const LoopMonIO = require('../class/loopMonIO');
const config = require('../../../config/scripts/tms/logPaths/app2LogPaths');
const loopAreas = [];

// load point IO
config.forEach(log => {
    const { area, path } = log;
    const loopArea = new LoopMonIO(area, path);
    loopAreas.push(loopArea);

    console.log('ok - ' + area + ' loop monitor is ready.');
});

// start monitoring
loopAreas.forEach(area => {
    area.start();

    console.log('ok - ' + area.area + ' loop monitoring started.')
});