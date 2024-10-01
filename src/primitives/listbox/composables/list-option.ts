import { computed, Signal } from "@angular/core";

export function tabindex(rovingFocus: Signal<boolean>, active: Signal<boolean>) {
  return computed(() => rovingFocus() && active() ? 0 : -1);
}
