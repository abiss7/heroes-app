import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  isLoading = signal(true);

  toggleLoading = () => this.isLoading.set(!this.isLoading());
}
