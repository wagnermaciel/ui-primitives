import { computed, contentChildren, Directive, ElementRef, inject, input, model } from '@angular/core';
import { GridWidget } from './grid-widget';
import { Grid } from './grid';
import * as GridPrimitive from '../../grid-primitive';

@Directive({
  selector: '[uiGridCell]',
  standalone: true,
  host: {
    role: 'gridcell',
    '[attr.rowspan]': 'props.rowspan()' /** Not necessary but used for demo purposes. */,
    '[attr.colspan]': 'props.colspan()' /** Not necessary but used for demo purposes. */,
    '[tabindex]': 'props.tabindex()',
    '[attr.aria-rowspan]': 'props.rowspan()',
    '[attr.aria-colspan]': 'props.colspan()',
    '[attr.aria-rowindex]': 'props.rowindex',
    '[attr.aria-colindex]': 'props.colindex',
    '[attr.aria-disabled]': 'props.disabled()',
  },
})
export class GridCell {
  rowspan = input<number>(1);
  colspan = input<number>(1);
  active = model<boolean>(false);
  disabled = input<boolean>(false);
  focus = () => this.hostEl.focus();
  hostEl = inject(ElementRef).nativeElement;
  widgetDirectives = contentChildren(GridWidget, {
    descendants: true,
  });
  grid = inject(Grid);
  widgets = computed(() => this.widgetDirectives().map((w) => w.props));
  props = GridPrimitive.createCell(this.grid.props, this);
}
