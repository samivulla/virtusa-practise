import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})
export class BehaviourService {
  private currentNameSubject$ = new BehaviorSubject('Eric');
  data = this.currentNameSubject$.asObservable();
  constructor() { }

  updatedDataSelection(data) {
    this.currentNameSubject$.next(data);
  }
}
