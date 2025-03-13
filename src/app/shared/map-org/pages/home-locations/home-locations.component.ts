import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-locations',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home-locations.component.html',
  styleUrl: './home-locations.component.css'
})
export default class HomeLocationsComponent {

}
