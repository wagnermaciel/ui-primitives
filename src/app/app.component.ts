import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ListboxComposed, OptionComposed} from '../composition/listbox-composed';
import {MenuComposed, MenuItemComposed} from '../composition/menu-composed';
import {ListNavigationKeyScheme, ListSelectionKeyScheme} from '../primities-signals-di/key-schemes';
import {IdFactory, IS_RTL} from '../primities-signals-di/listbox2';
import { Grid, GridCell, GridRow, GridWidget } from '../composition/grid-composed';

let nextId = 0;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListboxComposed, OptionComposed, MenuComposed, MenuItemComposed, Grid, GridCell, GridRow, GridWidget],
  providers: [
    {provide: IdFactory, useValue: () => `id${nextId++}`},
    {provide: IS_RTL, useValue: false},
    ListNavigationKeyScheme,
    ListSelectionKeyScheme,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ui-primitives-no-signals-no-di';
}
