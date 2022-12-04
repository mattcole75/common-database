const logEntry = (entry) => {

    let tmsObject = null;

    if(entry.includes('Tram') && !entry.includes('CMP') && !entry.includes('DMP')) {
        tmsObject = {
            system: 'tram',
            date: entry.slice(0, 10),
            eventTimestamp: entry.slice(11, 23),
            area: entry.substr(entry.indexOf('Area') + 5, 3),
            tram: parseInt(entry.substr(entry.indexOf('Tram') + 5, 4)),
            line: parseInt(entry.substr(entry.indexOf('Line') + 5, 2)),
            route: parseInt(entry.substr(entry.indexOf('Route') + 6, 3)),
            loop: parseInt(entry.substr(entry.indexOf('Loop') + 5, 3)),
            event: entry.substr(entry.indexOf("Loop"))
        };
        return tmsObject;
    }
    else if(entry.includes('Dig')){
        tmsObject = {
            system: 'dig',
            eventTimestamp: entry.slice(0, 12),
            input: entry.includes('I/P'),
            output: entry.includes('O/P'),
            key: entry.substr(entry.indexOf('Dig') + 8, 4).trimEnd(),
            state: entry.includes('1 to 0') ? 'off' : entry.includes('0 to 1') ? 'on' : 'ukn',
            line: entry
        };
        return tmsObject;
    }
    else if(entry.includes('MPJ')) {
        tmsObject = {
            system: 'mpj',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('CVJ')) {
        tmsObject = {
            system: 'cvj',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('CMP')) {
        tmsObject = {
            system: 'cmp',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('DMP')) {
        tmsObject = {
            system: 'dmp',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('TSP')) {
        tmsObject = {
            system: 'tsp',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('TMS')) {
        tmsObject = {
            system: 'tms',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('PRS')) {
        tmsObject = {
            system: 'prs',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('MRI')) {
        tmsObject = {
            system: 'mri',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('Signal')) {
        tmsObject = {
            system: 'signal',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else if(entry.includes('SDT')) {
        tmsObject = {
            system: 'sdt',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3)
        };
        return tmsObject;
    }
    else {
        tmsObject = {
            system: 'unknown',
            eventTimestamp: entry.slice(0, 12),
            area: entry.substr(entry.indexOf('Area') + 5, 3),
            message: entry
        };
        return tmsObject;
    }
}

module.exports = logEntry;