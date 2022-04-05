import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// My Import
import {Note} from '../../note'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note!: Note;
  faTimes = faTimes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
