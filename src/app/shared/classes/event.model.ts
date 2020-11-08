import { IEvent } from '../interfaces/event.interface';

export class Event implements IEvent {
    constructor(
        public name: string,
        public description: string,
        public date: string,
        public image: string,
    ) { }


}