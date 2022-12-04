module.exports = points = [
    // {
    //     id: 'psmZl2irc0P8DxiVRHLs', // get this from the Metrolink Sensor Network Website on registration
    //     name: 'POM02M',
    //     area: 'POM',
    //     path: '../../simulation/data/tms/app-2/replicated-logs/POM.log',
    //     IO: [
    //         {
    //             system: 'lc',
    //             ioType: 'input',
    //             signal: 'Point Set Right',
    //             slot: 2,
    //             channel: 2,
    //             key: '0.2',
    //             on: 'Detected Right',
    //             off: 'Not Detected Right',
    //             relay: 'IP-R2',
    //             relayType: 'DPDT'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'input',
    //             signal: 'Point Set Left',
    //             slot: 2,
    //             channel: 3,
    //             key: '0.3',
    //             on: 'Dectected Left',
    //             off: 'Not Detected Left',
    //             relay: 'IP-R3',
    //             relayType: 'DPDT'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'input',
    //             signal: 'Point Locked',
    //             slot: 2,
    //             channel: 4,
    //             key: '0.4',
    //             on: 'Locked',
    //             off: 'Free',
    //             relay: 'IP-R4*',
    //             relayType: 'DPDT'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'input',
    //             signal: 'ULTR-1 Feedback',
    //             slot: 2,
    //             channel: 5,
    //             key: '0.5',
    //             on: 'Unloack Enabled',
    //             off: 'Unlock Disabled',
    //             relay: 'IP-TB5',
    //             relayType: 'ULTR-1'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'output',
    //             signal: 'Point Set Right',
    //             slot: 3,
    //             channel: 1,
    //             key: '0.1',
    //             on: 'Drive On',
    //             off: 'Drive Off',
    //             relay: 'OP-R1',
    //             relayType: 'SPDT'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'output',
    //             signal: 'Point Set Left',
    //             slot: 3,
    //             channel: 2,
    //             key: '0.2',
    //             on: 'Drive On',
    //             off: 'Drive Off',
    //             relay: 'OP-R2',
    //             relayType: 'SPDT'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'output',
    //             signal: 'Unlock Command-1',
    //             slot: 3,
    //             channel: 3,
    //             key: '0.3',
    //             on: 'Unlock',
    //             off: 'Not Set',
    //             relay: 'ULTR-1*',
    //             relayType: 'ULTR'
    //         },
    //         {
    //             system: 'lc',
    //             ioType: 'output',
    //             signal: 'Unlock Command-2',
    //             slot: 3,
    //             channel: 4,
    //             key: '0.4',
    //             on: 'Unlock',
    //             off: 'Not Set',
    //             relay: 'ULRT-1*',
    //             relayType: 'ULTR'
    //         }
    //     ]
    // },
    {
        id: '1CljshxWYRhz4ffqg31C',
        name: 'IRK02M',
        area: 'IRK',
        path: '../../simulation/data/tms/app-2/replicated-logs/IRK.log',
        IO: [
            {
                system: 'lc',
                ioType: 'input',
                signal: 'Point Set Right',
                slot: 2,
                channel: 2,
                key: '0.2',
                on: 'Detected Right',
                off: 'Not Detected Right',
                relay: 'IP-R2',
                relayType: 'DPDT'
            },
            {
                system: 'lc',
                ioType: 'input',
                signal: 'Point Set Left',
                slot: 2,
                channel: 3,
                key: '0.3',
                on: 'Detected Left',
                off: 'Not Detected Left',
                relay: 'IP-R3',
                relayType: 'DPDT'
            },
            {
                system: 'lc',
                ioType: 'input',
                signal: 'Point Locked',
                slot: 2,
                channel: 4,
                key: '0.4',
                on: 'Locked',
                off: 'Free',
                relay: 'IP-R4',
                relayType: 'DPDT'
            },
            {
                system: 'lc',
                ioType: 'input',
                signal: 'ULTR-1 Feedback',
                slot: 2,
                channel: 30,
                key: '0.30',
                on: 'Unloack Enabled',
                off: 'Unlock Disabled',
                relay: 'IP-30',
                relayType: 'TB'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Point Set Right',
                slot: 3,
                channel: 1,
                key: '0.1',
                on: 'Drive On',
                off: 'Drive Off',
                relay: 'OP-R1',
                relayType: 'SPDT'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Point Set Left',
                slot: 3,
                channel: 2,
                key: '0.2',
                on: 'Drive On',
                off: 'Drive Off',
                relay: 'OP-R2',
                relayType: 'SPDT'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Unlock Command-1',
                slot: 3,
                channel: 3,
                key: '0.3',
                on: 'Unlock',
                off: 'Not Set',
                relay: 'ULTR-1',
                relayType: 'ULTR'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Unlock Command-2',
                slot: 3,
                channel: 4,
                key: '0.4',
                on: 'Unlock',
                off: 'Not Set',
                relay: 'ULRT-1',
                relayType: 'ULTR'
            }
        ]
    },
    {
        id: 'Eh1PNgMtRkSYuNQ6hz1Z',
        name: 'IRK09M',
        area: 'IRK',
        path: '../../simulation/data/tms/app-2/replicated-logs/IRK.log',
        IO: [
            {
                system: 'lc',
                ioType: 'input',
                signal: 'Point Set Right',
                slot: 2,
                channel: 5,
                key: '0.5',
                on: 'Detected Right',
                off: 'Not Detected Right',
                relay: 'IP-R5',
                relayType: 'DPDT'
            },
            {
                system: 'lc',
                ioType: 'input',
                signal: 'Point Set Left',
                slot: 2,
                channel: 6,
                key: '0.6',
                on: 'Detected Left',
                off: 'Not Detected Left',
                relay: 'IP-R6',
                relayType: 'DPDT'
            },
            {
                system: 'lc',
                ioType: 'input',
                signal: 'Point Locked',
                slot: 2,
                channel: 7,
                key: '0.7',
                on: 'Locked',
                off: 'Free',
                relay: 'IP-R7',
                relayType: 'DPDT'
            },
            {
                system: 'lc',
                ioType: 'input',
                signal: 'ULTR-1 Feedback',
                slot: 2,
                channel: 31,
                key: '0.31',
                on: 'Unloack Enabled',
                off: 'Unlock Disabled',
                relay: 'IP-31',
                relayType: 'TB'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Point Set Right',
                slot: 3,
                channel: 5,
                key: '0.5',
                on: 'Drive On',
                off: 'Drive Off',
                relay: 'OP-R5',
                relayType: 'SPDT'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Point Set Left',
                slot: 3,
                channel: 6,
                key: '0.6',
                on: 'Drive On',
                off: 'Drive Off',
                relay: 'OP-R6',
                relayType: 'SPDT'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Unlock Command-1',
                slot: 3,
                channel: 7,
                key: '0.7',
                on: 'Unlock',
                off: 'Not Set',
                relay: 'ULTR-2',
                relayType: 'ULTR'
            },
            {
                system: 'lc',
                ioType: 'output',
                signal: 'Unlock Command-2',
                slot: 3,
                channel: 8,
                key: '0.8',
                on: 'Unlock',
                off: 'Not Set',
                relay: 'ULRT-2',
                relayType: 'ULTR'
            }
        ]
    }

]