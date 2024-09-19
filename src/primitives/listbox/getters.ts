import { Listbox, ListboxState } from './interfaces';

export function getState(listbox: Listbox): ListboxState {
  const state = listbox.state();
  const options = listbox.options();
  const rovingFocus = listbox.rovingFocus();
  const followFocus = listbox.followFocus();
  const activeOption = !state.activeOption && rovingFocus ? options[0] : state.activeOption;
  const selectedOption = followFocus ? activeOption : state.selectedOption;
  
  return {
    activeOption,
    selectedOption,
    activeIndex: activeOption?.index(),
    selectedIndex: selectedOption?.index(),
  };
}