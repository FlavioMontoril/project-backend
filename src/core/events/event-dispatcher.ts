import { DomainEvent } from "./domain-event.js";

export interface EventDispatcher {
    publish(event: DomainEvent): void;
}