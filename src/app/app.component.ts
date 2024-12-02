import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicStorageModule } from '@ionic/storage-angular';
// confirmar si ReactiveFormsModule se deja global o no
// import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    IonicStorageModule,
  ],
  providers: [    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'backoffice-org';
}
