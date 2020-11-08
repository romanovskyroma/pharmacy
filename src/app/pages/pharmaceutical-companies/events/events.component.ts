import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interfaces/event.interface';
import { EventsService } from 'src/app/shared/services/events.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  addEventB: boolean;
  myEvent: boolean;
  nameEvent: string;
  descriptionEvent: string;
  dateEvent: string;
  imageEventUrl: string;
  file: FileList | null;
  fileName: string;
  events: IEvent[];
  imageSrc: any;

  constructor(public eventsService: EventsService,
    public firestore: AngularFirestore,
    public storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getEvents();
    // this.eventsService.getImgFS();
  }

  choose($event) {
    this.addEventB = false;
    this.myEvent = false;

    if ($event.target.value === 'додати подію') {
      this.addEventB = true;
    } else if ($event.target.value === 'мої події') {
      this.myEvent = true;
    }
  }

  getEvents() {
    this.eventsService.getFSEvents().subscribe(events => {
      // console.log(events);
      this.events = events;
    })
  }

  addEvent(): void {
    const myEvent = this.firestore.collection<IEvent>('events').ref.doc();
    console.log(myEvent.id);
    const file = this.file;
    console.log(file);
    const filePath = `events/${this.fileName}`;
    console.log(filePath);
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);
    const task = this.storage.upload(filePath, file);
    console.log(task);


    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then((url) => {
          this.imageEventUrl = url;

          let eventInsert = {
            name: this.nameEvent,
            description: this.descriptionEvent,
            date: this.dateEvent,
            image: this.imageEventUrl
          }

          console.log(eventInsert);
          console.log(this.imageEventUrl);
          this.eventsService.addFSEvent(eventInsert);
          this.resetForm();

        }).catch(err => {
          console.log(err);
        });
      })
    )
      .subscribe();

    console.log(this.imageEventUrl);
  }

  resetForm(): void {
    this.nameEvent = '';
    this.descriptionEvent = '';
    this.dateEvent = '';
    this.imageEventUrl = ''; 
  }

  onChange($event): void {
    console.log($event);
    this.fileName = $event.target.files[0].name;    
    this.file = $event.target.files[0];
    console.log(this.file);

  }





}
