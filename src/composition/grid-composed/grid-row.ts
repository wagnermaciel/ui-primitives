import { contentChildren, Directive } from '@angular/core';
import { GridCell } from './grid-cell';

@Directive({
  selector: '[uiGridRow]',
  standalone: true,
  host: { role: 'row' },
})
export class GridRow {
  cells = contentChildren(GridCell, {
    descendants: true,
  });
}
