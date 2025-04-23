import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-compose',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './message-compose.component.html',
  styleUrls: ['./message-compose.component.css']
})
export class MessageComposeComponent {
  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {
    console.log('MessageComposeComponent');
    this.messageForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  async sendMessage(): Promise<void> {
    if (this.messageForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    try {
      const request$ = await this.messageService.sendMessage(this.messageForm.value);

      request$.subscribe({
        next: () => {
          this.snackBar.open('Mensaje enviado con éxito ✅', 'Cerrar', { duration: 3000 });
          this.messageForm.reset();
        },
        error: (err) => {
          console.error('Error al enviar mensaje:', err);
          this.snackBar.open('Error al enviar el mensaje ❌', 'Cerrar', { duration: 3000 });
        }
      });
    } catch (err) {
      console.error('Error preparando el envío:', err);
      this.snackBar.open('Error interno al preparar el mensaje', 'Cerrar', { duration: 3000 });
    }
  }

}
