import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { uiListbox, uiListboxOption } from '../primitives/listbox/listbox';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [uiListbox, uiListboxOption, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  rovingFocus = true;
  followFocus = true;
}
