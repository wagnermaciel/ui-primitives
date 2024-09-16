import {
  computed,
  contentChildren,
  Directive,
  effect,
  input,
  untracked,
} from '@angular/core';
import { GridRow } from './grid-row';
import * as GridPrimitive from '../../grid-primitive';

@Directive({
  selector: '[uiGrid]',
  standalone: true,
  host: {
    role: 'grid',
    '[attr.aria-rowcount]': 'props.rowcount',
    '[attr.aria-colcount]': 'props.colcount',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class Grid {
  wrap = input(false);
  rows = contentChildren(GridRow, {
    descendants: true,
  });
  cells = computed(() => {
    return this.rows().map((row) => {
      return row.cells().map((cell) => {
        return cell.props;
      });
    });
  });

  props = GridPrimitive.createGrid(this);

  constructor() {
    effect(() => {
      if (this.cells()) {
        untracked(() => GridPrimitive.syncState(this.props));
      }
    });
  }

  onKeyDown(event: KeyboardEvent) {
    GridPrimitive.handleKeyDown(event, this.props);
  }
}
