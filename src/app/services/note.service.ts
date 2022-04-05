import { Injectable } from '@angular/core';

// My Imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Note } from '../note';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'http://localhost:5000/notes';
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  deleteNote(note: Note): Observable<Note> {
    const url = `${this.apiUrl}/${note.id}`;
    return this.http.delete<Note>(url);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note, httpOptions);
  }

  // Put the data into subject so that it can be passed to subscribed components
  loadNote(selectedNote: Note): void {
    this.subject.next(selectedNote);
  }

  // Pass the selected note from note-item to subscribe components
  onLoadNote(): Observable<any> {
    return this.subject.asObservable();
  }

  // Update note in database
  updateNote(note: Note): Observable<Note> {
    const url = `${this.apiUrl}/${note.id}`;
    return this.http.put<Note>(url, note, httpOptions);
  }
}
