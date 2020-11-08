import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-h-events',
  templateUrl: './h-events.component.html',
  styleUrls: ['./h-events.component.scss']
})
export class HEventsComponent implements OnInit {
  events: IEvent[];

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventsService.getFSEvents().subscribe(events => {
      this.events = events;
    })
  }



}
