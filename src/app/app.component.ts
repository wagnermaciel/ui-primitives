import { Component } from '@angular/core';
import { ListboxDemo } from './listbox-demo/listbox-demo';

let nextId = 0;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListboxDemo],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ui-primitives-no-signals-no-di';
}
