import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    // NxWelcomeComponent, 
    RouterModule
  ],
  selector: 'nx-demo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // title = 'client';
}
