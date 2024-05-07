import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  isLoading = signal(true);
  // showLoading = computed(() => this.isLoading());

  toggleLoading = () => this.isLoading.set(!this.isLoading());
}
