import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-token',
  standalone: true,
  imports: [ RouterOutlet, RouterLink ],
  templateUrl: './home-token.component.html',
  // styleUrl: './home-token.component.css'
})
export default class HomeTokenComponent {

}
