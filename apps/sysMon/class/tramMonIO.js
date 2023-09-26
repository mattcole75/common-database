const Tram = require('./subclass/loop');
const Tail = require('tail').Tail;
const logEntry = require('../../shared/logEntry');
const moment = require('moment');

class TramMonIO {

    constructor (id) {
        this.id = id;
        this.tail = new Tail('../../simulation/data/tms/app-2/replicated-logs/IRK.log');
        this.msg = null
    }

    start = () => {

        // declare the tram
        let tram = new Tram(this.id);

        // start monitor
        this.tail.on('line', (line) => {
            this.msg = logEntry(line);
            

            // console.log(this.msg);
            
            // if(this.msg.system === 'tram') {
            //     if(this.msg.tram === this.id) {
            //         //inbound
            //         if( this.msg.loop === 6) // BRY inbound Entry
            //             console.log(this.msg.eventTimestamp + ' - ' + this.id + ' inbound from BRY IRK01 - entered Irk Signalling Area');

            //         if(this.msg.loop === 4) // ORL inbound Entry
            //             console.log(this.msg.eventTimestamp + ' - ' + this.id + ' inbound from ORL IRK14 - entered Irk Signalling Area');
                    
            //         if(this.msg.loop === 11) // inbount Exit
            //             console.log(this.msg.eventTimestamp + ' - ' + this.id + ' inbound IRK18 - exited Irk Signalling Area');

            //         // outbound
            //         if( this.msg.loop === 8) // outbound Entry
            //             console.log(this.msg.eventTimestamp + ' - ' + this.id + ' outbound IRK07 - entered Irk Signalling Area');
                    
            //         if(this.msg.loop === 3) // BRY outbound Exit
            //             console.log(this.msg.eventTimestamp + ' - ' + this.id + ' outbound to BRY IRK10 - exited Irk Signalling Area');

            //         if(this.msg.loop === 5) // ORL outbound Entry
            //             console.log(this.msg.eventTimestamp + ' - ' + this.id + ' outbound to ORL IRK15 - exited Irk Signalling Area');
                    
            //     }
            // }
                    
        })


    }
}

module.exports = TramMonIO;