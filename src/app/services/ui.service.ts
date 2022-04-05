import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddNote: boolean = false;
  private isUpdate: boolean = false;
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();

  constructor() { 
  }

  toggleAddNote(): void {
    this.showAddNote = !this.showAddNote;
    this.subject.next(this.showAddNote);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  // Update Note
  toggleUpdateNote(): void {
    this.isUpdate = !this.isUpdate;
    this.subject2.next(this.isUpdate);
  }

  onToggleUpdate(): Observable<any> {
    return this.subject2.asObservable();
  }
}
