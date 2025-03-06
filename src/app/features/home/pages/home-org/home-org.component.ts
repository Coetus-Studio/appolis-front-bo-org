import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-org',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './home-org.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeOrgComponent { }
