import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// My Imports
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Note } from '../../note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  @Input() note!: Note;
  @Output() onSubmitNote: EventEmitter<Note> = new EventEmitter();
  idNote: any;
  title: string = '';
  desc: string = '';
  showAddNote!: boolean;
  subscription: Subscription;
  isUpdate: boolean = false;

  constructor(private uiService: UiService, private noteService: NoteService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddNote = value));
    this.subscription = this.uiService
      .onToggleUpdate()
      .subscribe((value) => (this.isUpdate = value));
  }

  ngOnInit(): void {
    this.subscription = this.noteService
      .onLoadNote()
      .subscribe((value) => this.loadNote(value));
  }

  onSubmit() {
    if (!this.title) {
      alert('Please add Note title!');
      return;
    }

    const newNote = {
      title: this.title,
      desc: this.desc,
    };

    const updateNote = {
      id: this.idNote,
      title: this.title,
      desc: this.desc,
    };

    if (!this.isUpdate) {
      this.onSubmitNote.emit(newNote);
    } else {
      this.onSubmitNote.emit(updateNote);
    }

    this.title = '';
    this.desc = '';
  }

  loadNote(note: any) {
    this.idNote = note.id;
    this.title = note.title;
    this.desc = note.desc;

    if (!this.isUpdate) {
      this.uiService.toggleUpdateNote();
    }
    
  }
}
