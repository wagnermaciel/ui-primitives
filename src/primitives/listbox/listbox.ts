import { computed, contentChildren, Directive, ElementRef, inject, signal } from '@angular/core';
import { createListbox, createListboxOption } from './builders';
import { handleKeyDown } from './setters';

@Directive({
  selector: '[uiListbox]',
  standalone: true,
  exportAs: 'Listbox',
  host: {
    role: 'listbox',
    '(keydown)': 'onKeyDown($event)',
    '[attr.tabindex]': 'uiState.tabindex()',
    '[attr.aria-activedescendant]': 'uiState.activeId()',
  },
})
export class uiListbox {
  uiListboxOptions = contentChildren(uiListboxOption);
  options = computed(() => this.uiListboxOptions().map((option) => option.uiState));
  rovingFocus = signal(false);
  uiState = createListbox(this.options, this);

  onKeyDown(event: KeyboardEvent) {
    handleKeyDown(event, this.uiState);
  }
}

@Directive({
  selector: '[uiListboxOption]',
  standalone: true,
  exportAs: 'ListboxOption',
  host: {
    role: 'option',
    '[attr.id]': 'uiState.id()',
    '[attr.disabled]': 'uiState.disabled()',
    '[attr.tabindex]': 'uiState.tabindex()',
    '[attr.aria-selected]': 'uiState.selected()',
  },
})
export class uiListboxOption {
  listbox = inject(uiListbox);
  host = inject(ElementRef).nativeElement;
  focus = () => this.host.focus();
  uiState = createListboxOption(this.listbox.uiState, this);
}
