import { DomainEvent } from "./domain-event.js";
import { EventDispatcher } from "./event-dispatcher.js";
import { EventEmitterSingletonInstance } from "./event-emitter-singleton.js";


export class EventEmitterDispatcher implements EventDispatcher {
    publish(event: DomainEvent): void {
        const topic = event.constructor.name;
        EventEmitterSingletonInstance.emit(topic, event);
    }
}