import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DashboardServieService {
  private visibilitySubject = new BehaviorSubject<boolean>(false);
  visibility$ = this.visibilitySubject.asObservable();

  toggleVisibility() {
    this.visibilitySubject.next(!this.visibilitySubject.value);
  }

  setVisibility(value: boolean) {
    this.visibilitySubject.next(value);
  }
}
