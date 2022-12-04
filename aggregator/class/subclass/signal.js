class Signal {

    constructor (id, name, system, signal, ioType, channel, relay, relayType, key, onState, offState, state, eventTimestamp) {
        this.id = id;
        this.name = name,
        this.system = system;
        this.signal = signal;
        this.ioType = ioType;
        this.channel = channel;
        this.relay = relay;
        this.relayType = relayType;
        this.key = key;
        this.onState = onState;
        this.offState = offState;
        this.state = state;
        this.eventTimestamp = eventTimestamp;
    }

    signalState = () => {
        return {
            id: this.id,
            name: this.name,
            system: this.system,
            signal: this.signal,
            ioType: this.ioType,
            channel: this.channel,
            relay: this.relay,
            relayType: this.relayType,
            key: this.key,
            onState: this.onState,
            offState: this.offState,
            state: this.state,
            eventTimestamp: this.eventTimestamp
        }
    }

    system = () => {
        return this.system;
    }

    signal = () => {
        return this.signal;
    }

    ioType = () => {
        return this.ioType;
    }

    key = () => {
        return this.key;
    }

    state = () => {
        return this.state;
    }

    setState = (state) => {
        this.state = state;
    }

    setEventTimestamp = (timespamp) => {
        this.eventTimestamp = timespamp;
    }
}

module.exports = Signal;