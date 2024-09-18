import { Listbox, ListboxState } from "./interfaces";
import { onKeyDown } from "./key-handlers";

export function updateState(listbox: Listbox, newState: ListboxState) {
  const oldState = listbox.state();

  if (oldState.activeOption !== newState.activeOption) {
    newState.activeOption?.focus();
  }

  listbox.state.set(newState);
}

export function handleKeyDown(event: KeyboardEvent, listbox: Listbox) {
  updateState(listbox, onKeyDown(event, listbox));
}