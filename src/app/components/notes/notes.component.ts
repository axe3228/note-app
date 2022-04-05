import { Component, OnInit } from '@angular/core';

// My Imports
import { NoteService } from '../../services/note.service';
import { Note } from '../../note';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  key: string = 'id';
  showAddNote!: boolean;
  subscription: Subscription;
  isUpdate: boolean = false;

  constructor(private noteService: NoteService, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddNote = value));
    this.subscription = this.uiService
      .onToggleUpdate()
      .subscribe((value) => (this.isUpdate = value));
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe((notes) => (this.notes = notes));
  }

  deleteNote(note: Note) {
    this.noteService
      .deleteNote(note)
      .subscribe(
        () => (this.notes = this.notes.filter((n) => n.id !== note.id))
      );
  }

  onSubmitNote(note: Note) {   
    if(!this.isUpdate) {
      this.noteService.addNote(note).subscribe((note) => this.notes.push(note));
    } else {
      this.noteService.updateNote(note).subscribe(() => {
        // Update Notes array after update using arrow function and loadNotes
        this.loadNotes();
      });
      this.uiService.toggleUpdateNote();
    }
  }

  // Input Selected Note to add-note component
  loadNote(note: Note) {
    if (!this.showAddNote) {
      this.uiService.toggleAddNote();
    }

    this.noteService.loadNote(note);
  }
}
