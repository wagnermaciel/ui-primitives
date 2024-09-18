import { Component } from '@angular/core';
import { uiListbox, uiListboxOption } from '../primitives/listbox/listbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [uiListbox, uiListboxOption],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ui-primitives-no-signals-no-di';
}
