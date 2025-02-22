# The Common Database Platform

## Summary 
Common Database is a system with a purpose!.. and that is to enable an organisation to make better decisions. A lot of organisations through their processes have accumulated a wealth of data that is simply not being used. Often the data is too difficult to organise, make sense of and relate to other data sources. The Common Database is a platform that will accept data from disparate sources such as log files and sensors to establish a rich data source that can be used to make better decisions.

## Problem
Some organisations have failed to modernise, these laggards can find themselves up to 40 years behind what is known to be best practice! Look to the aviation industry maintenance standards to see what good looks like and then compare that to the railways. The problem is, how do these organisations catch-up and develop their way to a modern high performing, maintainable, and sustainable asset base? There is simply no one answer to this question and strategy will be different from organisation to organisation however, there is one common component… data.  An organisation must have clarity on three key aspects with regards to their asset base: Requirements (O&M, Legislation, Best Practice), Performance (defined baseline and comparison), and Condition (a standard for describing asset condition and a method for scoring).

## Solution
The solution is a series of systems that work to collect data. In the case of Manchester Metrolink there are systems that work in the background reading live log files looking for specific events, selected events are coded in JSON and forwarded on to a web service which inserts the events into a time-series database. The events are decoded through the OEM configuration and we can start to analyse data. For example, the system is capable of tracking trams on the network, which timetable journeys they are completing, what stations they are stopping at, and if they are on time!

Another interesting project is using the data to calculate Railway Point Machine swing times. Determining a baseline for each mechanical machine and determining the degradation over time means the maintenance can be scheduled based purely on performance and the condition of its movement over time.

 A fellow engineer and I have been building Arduino modules and are working with Vodafone to collect sensor data from around the network. Currently focusing on temperatures, we are monitoring track, and cabinet temperatures. These are specific performance requirements that will lead to an improvement in network reliability and performance.

Currently data is visualised on a website (see RailMon project) or using Microsoft’s Power B via the Common Database API.

## Roadmap
The project is now in the hands of the Reliability Centred Maintenance Engineers at Metrolink. In the future they will be looking at collecting fault and tram performance data from in-service trams. Substation electrical usage data will be collected to better understand how electrical power is being used on the network. There is scope to develop other sensors for the Arduino solution, e.g. proximity sensors for Overhead Line Balance counter weight problems, Vibration and Accelerometer sensors for civil assets…

## Requirements
1. Node.JS needs to be installed. (>= v16).
2. Linux or Apple OS only, this has not been tested with windows.
3. MongoDb needs to be installed (>v6)
4. MySQL RDBMS needs to be installed.

## Concepts
1. SPARK uses various mainstream libraries to function correctly, at its core there is Node.JS and Express.
2. SPARK is an API not designed for heavy loads.
3. The MongoDB is set up to use time series data which automatically deletes after a defined time. This is defined in the package.json file. 

## Start ( no quick start, sorry! )

### Static configuration and operational data
The common database makes it possible to host through a static website critical configuration data and operational train running timetables.
The "reference" app makes this possible.

The reference app hosts two main static files used to load the mysql database through scripts.

**NetworkTopologyModel.xml**: is the configuration data for the Tram Management System. It contains data pertaining to the equipment and runtime configuration. The data processed from the log files will be originate from this configuration file.

**timetable XML files**: these files use the TransXChange standard to share transport timetables.

To start the reference web server
```
% cd apps/reference
% npm install
% cd ../..
% npm run start_reference
```
Check the reference website is working by clicking on the following links:
- http://localhost:8080/tms/NetworkTopologyModel.xml
- http://localhost:8080/timetable/active.xml

> Note: every time you run the database load scripts this reference service must be running.

### Database setup
- MySql RDBMS needs to be installed with CLI or MySQLWorkBench.
- Run the config/database/schema/schema.sql to set up the database.

1. Make the required adjustments for your instance.
```
% cd config/database/schema
% mysql -u root
mysql> source schema.sql
```
2. set up a "prod" user giving the following schema privileges:
- DELETE, EXECUTE, INSERT, SELECT, UPDATE

3. Setup the database connection configuration file.
```
% cd config/database/connection
% touch config.js
```

The config.js file must contain the following:
```
const convict = require('convict');

const config = convict({
    version: {
        type: String,
        default: '0.1'
    },
    service: {
        type: String,
        default: 'tms'
    },
    logPath: {
        type: String,
        default: './logs/tms.log'
    },
    db: {
        host: {
            type: String,
            default: 'localhost'
        },
        port: {
            type: Number,
            default: 3306
        },
        user: {
            type: String,
            default: 'prod'
        },
        password: {
            type: String,
            default: 'your prod user password'
        },
        database: {
            type: String,
            default: 'metrolink'
        },
        multipleStatements: {
            type: Boolean,
            default: true
        }
    }
});
```

### Populate database
This next step inserts the configuration data which can be found in the following locations:
- scripts/tms/data
- reference/public/tms/NetworkTopologyModel.xml
- reference/public/timetable/y.xml

```
% npm run load_tms_data
```
If everything is setup correctly the system will take about 20-30 seconds to load the data

### Start the authenticator api
apps/auth is an api for authenticating services POSTing data to the common-database as well as managing users on the RailMon web app. It is critical to the systems security and integrity. Auth also ensures each transaction is authorised giving full control 

MongoDb is required for this stand alone decoupled API.

> note: the email field needs a unique constraint

1. Setup the database connection configuration file.
```
% cd apps/auth/configuration
% touch config.js
```

The config.js file must contain the following:
```
const convict = require('convict');

const config = convict({
    version: {
        type: String,
        default: '0.1'
    },
    service: {
        type: String,
        default: 'auth'
    },
    port: {
        type: Number,
        default: 5791
    },
    db: {
        uri: {
            type: String,
            default: 'mongodb://localhost:27017/'
        }
    },
    logPath: {
        type: String,
        default: './logs/auth.log'
    },
    adminEmail: {
        type: String,
        default: 'admin@system.com'
    }
});

module.exports = config;
```

2. run the auth app
```
% cd apps/auth
% mkdir logs
% ../..
% npm run start_auth
```

### Start the common-database API
The common-database api handles all getters and setters for data being process. Particularly from it distributed counter part the Data Acquisition System (DAS).

1. Setup the database connection configuration file.
```
% cd apps/auth/configuration
% touch config.js
```

The config.js file must contain the following:
```
const convict = require('convict');

const config = convict({
    version: {
        type: String,
        default: '0.1'
    },
    service: {
        type: String,
        default: 'cd'
    },
    port: {
        type: Number,
        default: 1338
    },
    logPath: {
        type: String,
        default: './logs/api.log'
    },
    db: {
        host: {
            type: String,
            default: 'localhost'
        },
        port: {
            type: Number,
            default: 3306
        },
        user: {
            type: String,
            default: 'prod'
        },
        password: {
            type: String,
            default: 'your prod password'
        },
        database: {
            type: String,
            default: 'metrolink'
        },
        multipleStatements: {
            type: Boolean,
            default: true
        }
    },
});

module.exports = config;
```

2. run the auth app
```
% cd apps/api
% mkdir logs
% ../..
% npm run start_api
```


## FAQ
No FAQ yet

## Change Log
- 2025-02-