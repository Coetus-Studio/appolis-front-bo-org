import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [ RouterLink, RouterOutlet ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export default class EventsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }



}
