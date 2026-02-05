import { TaskCreatedListener } from "./task-created-listener.js";

export class ApplicationListeners {
    public static listen() {
        TaskCreatedListener.init();
    }
}