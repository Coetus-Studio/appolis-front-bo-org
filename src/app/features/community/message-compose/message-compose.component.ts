import { Component, OnInit } from '@angular/core'; // Import OnInit
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from '../services/message.service';
import { AuthService } from '../../../auth/auth.service'; // Import AuthService
import { Observable } from 'rxjs'; // Import Observable

interface Message {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

@Component({
  selector: 'app-message-compose',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './message-compose.component.html',
  styleUrls: ['./message-compose.component.css']
})
export class MessageComposeComponent implements OnInit { // Implement OnInit
  messageForm: FormGroup;
  messages: Message[] = []; // Property to store messages
  isLoadingMessages = false; // Loading indicator for messages

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private authService: AuthService // Inject AuthService
  ) {
    console.log('MessageComposeComponent');
    this.messageForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void { // Implement ngOnInit
    this.fetchMessages();
  }

  async sendMessage(): Promise<void> {
    if (this.messageForm.invalid) {
      this.snackBar.open('Por favor completa todos los campos requeridos', 'Cerrar', { duration: 3000 });
      return;
    }

    try {
      // Assuming sendMessage in MessageService handles getting the token internally
      const request$ = await this.messageService.sendMessage(this.messageForm.value);

      request$.subscribe({
        next: () => {
          this.snackBar.open('Mensaje enviado con éxito ✅', 'Cerrar', { duration: 3000 });
          this.messageForm.reset();
          this.fetchMessages(); // Refresh message list after sending
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

  async fetchMessages(): Promise<void> {
    this.isLoadingMessages = true;
    try {
      const orgId = await this.authService.getOrgId(); // Get orgId from AuthService
      if (!orgId) {
        console.error('Organization ID not available.');
        this.isLoadingMessages = false;
        return;
      }
      // Assuming getMessages in MessageService handles getting the token internally
      this.messageService.getMessages(orgId).subscribe({
        next: (messages: Message[]) => { // Explicitly type messages
          this.messages = messages;
          this.isLoadingMessages = false;
        },
        error: (err: any) => { // Explicitly type err
          console.error('Error fetching messages:', err);
          this.isLoadingMessages = false;
        }
      });
    } catch (err) {
      console.error('Error getting organization ID:', err);
      this.isLoadingMessages = false;
    }
  }
}
