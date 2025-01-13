import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import ListEventsComponent from './pages/list-event/list-events.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [ ListEventsComponent, RouterModule ],
  templateUrl: './event.component.html',
})
export default class EventComponent {


  constructor() { }





}
