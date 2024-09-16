import { Directive, ElementRef, inject, input, model } from '@angular/core';
import * as GridPrimitive from '../../grid-primitive';

@Directive({
  selector: '[uiGridWidget]',
  standalone: true,
  host: {
    '[tabindex]': 'props.tabindex()',
    '[attr.aria-disabled]': 'props.disabled()',
  },
})
export class GridWidget {
  active = model<boolean>(false);
  disabled = model<boolean>(false);
  editable = input<boolean>(false);
  usesArrowKeys = input<boolean>(false);
  hostEl = inject(ElementRef).nativeElement;
  focus = () => this.hostEl.focus();
  props = GridPrimitive.createWidget(this);
}
