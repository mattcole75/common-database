const App2LogSim = require('../class/app-2-log-sim');
const config = require('../data/tms/app-2/app-2-logs');
const logs = [];

// The program will have a number of modes:
//      - 1. Realtime replication
//      - 2. Speed up options
//      - 3. Test mode: no pause between events
const mode = 1;

// load sim
config.forEach(lc => {
    const { area, log } = lc.localController;
    const app2LogSim = new App2LogSim(area, log.fileToReplicate, log.replicatedOutputPath, null, mode);
    logs.push(app2LogSim);

    console.log('ok - ' + area + ' sim is ready.');
});

// start sim
logs.forEach(log => {
    log.start();
    console.log('ok - ' + log.area + ' sim started.');
});