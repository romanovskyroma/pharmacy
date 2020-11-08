import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from 'src/app/shared/interfaces/event.interface';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  event: IEvent;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getEvent();
    console.log(this.event);
    
  }

  getEvent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.eventsService.getOneEvent(id).subscribe(data => {
      console.log(data);     
      this.event = data;
    })
  }

}
