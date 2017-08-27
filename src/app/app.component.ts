import { Component } from '@angular/core';

/**
 * Class Author
 */
export class Author {
    firstname : string;
    lastname : string;
    github : string;
}

/**
 * Component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to a base Angular project';
  subtitle = 'This project comes with JQuery and Semantic UI.';
  author : Author  = {
    firstname: 'Kévin',
    lastname: 'José',
    github: 'https://github.com/kjose/'
  };
}
