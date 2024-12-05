import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
  ) {
    console.log('StorageService constructor');
    this.init();
  }

  async init() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    console.log('StorageService init', this._storage);
  }

  async setItem(key: string, value: string): Promise<void> {
    console.log(`Guardando ${key}: ${value}`);
    await this._storage?.set(key, value);
  }

  async getItem(key: string): Promise<string | null | undefined> {
    if (!this._storage) {
      console.log('Esperando inicialización del storage');
      await this.init();
    }

    return await this._storage?.get(key);
  }

  async removeItem(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}
