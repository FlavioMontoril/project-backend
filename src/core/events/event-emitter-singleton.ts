import { EventEmitter } from "node:events";

class EventEmitterSingleton extends EventEmitter {
    private static instance: EventEmitterSingleton;

    private constructor() {
        super();
    }

    public static getInstance(): EventEmitterSingleton {
        if (!this.instance) {
            this.instance = new EventEmitterSingleton();
        }
        return this.instance;
    }
}

export const EventEmitterSingletonInstance =
    EventEmitterSingleton.getInstance();