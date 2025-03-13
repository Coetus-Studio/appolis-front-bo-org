import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-event',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home-event.component.html',
  styleUrl: './home-event.component.css'
})
export default class HomeEventComponent {

}
