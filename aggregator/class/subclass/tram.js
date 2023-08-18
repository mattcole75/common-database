class Tram {

    constructor (id) {
        this.id = id;
        this.area = null;
        this.line = null;
        this.route = null;
        this.loop = null;
        this.event = null;
        this.eventTimestamp = null;
    }

    tramState = () => {
        return {
            id: this.id,
            area: this.area,
            line: this.line,
            route: this.route,
            loop: this.loop,
            event: this.event,
            eventTimestamp: this.eventTimestamp
        };
    }



}

module.exports = Tram;