import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../storage.service';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Redirigiendo...</p>`
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.clear(); // ✅ Limpiar todo lo guardado
    this.router.navigate(['/login']); // ✅ Redirigir
  }
}
