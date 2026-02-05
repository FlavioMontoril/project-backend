import { DomainEvent } from "./domain-event.js";

export class TaskCreatedEvent extends DomainEvent {
    constructor(
        public readonly taskId: string,
        public readonly summary: string,
        public readonly userId: string,
    ) {
        super();
    }
}
