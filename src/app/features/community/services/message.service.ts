import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { StorageService } from '../../../storage.service';
import { AuthService } from '../../../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private baseUrl = 'http://localhost:3000/v1/organizations';

  constructor(private http: HttpClient, private storageService: StorageService, private authService: AuthService) { }

  async sendMessage(data: { title: string; content: string }): Promise<Observable<any>> {
    const orgId = await this.storageService.getItem('orgId');
    const token = await firstValueFrom(this.authService.getToken());

    if (!orgId || !token) {
      throw new Error('Faltan datos necesarios para enviar el mensaje');
    }

    return this.http.post(`${this.baseUrl}/${orgId}/messages`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

}
