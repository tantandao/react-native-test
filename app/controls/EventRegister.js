export default class EventRegister {

    static listeners = {
        count: 0,
        refs: {}
    };

    static addEventListener(eventName, callback) {
        if (eventName && typeof eventName === 'string' && callback && typeof callback === 'function') {
            this.listeners.count++;
            const id = 'listener_' + this.listeners.count;
            this.listeners.refs[id] = {
                name: eventName,
                callback: callback
            };
            return id;
        }
        return false;
    }

    static removeEventListener(id) {
        if (id && typeof id === 'string') {
            return delete this.listeners.refs[id];
        }
        return false;
    }

    static removeAllListeners() {
        let removeError = false;
        Object.keys(this.listeners.refs).forEach(id => {
            const removed = delete this.listeners.refs[id];
            removeError = (!removeError) ? !removed : removeError
        });
        return !removeError;
    }

    static emitEvent(eventName, data) {
        Object.keys(this.listeners.refs).forEach(id => {
            if (this.listeners.refs[id] && eventName === this.listeners.refs[id].name) {
                this.listeners.refs[id].callback(data);
            }
        });
    }
}
