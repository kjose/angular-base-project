import { Component } from '@angular/core';

/**
 * Class Hero
 */
export class Hero {
    id : number;
    name : string;
}

/**
 * Component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// Export component
export class AppComponent {
  title = 'Tour of heroes';
  hero : Hero = {
      id: 1,
      name: 'Windstorm'
  }
}
