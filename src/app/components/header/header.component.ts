import { Component, OnInit } from '@angular/core';

// My Import
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Notes';
  showAddNote!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddNote = value));
  }

  ngOnInit(): void {}

  toggleAddNote() {
    this.uiService.toggleAddNote();
  }

  // Routing
  hasRoute(route: string) {
    return this.router.url === route;
  }
}
