import { getDefaultState } from './getters';
import { Grid, State } from './interfaces';
import { onKeyDown } from './key-handlers';

export function updateState(grid: Grid, newState: State, focus = true) {
  const oldState = grid.state();

  if (oldState.cell !== newState.cell) {
    oldState.cell?.active.set(false);
    newState.cell?.active.set(true);
  }

  if (oldState.widget !== newState.widget) {
    oldState.widget?.active.set(false);
    newState.widget?.active.set(true);
  }

  grid.state.set(newState);

  if (focus) {
    newState.widget ? newState.widget.focus() : newState.cell?.focus();
  }
}

export function syncState(grid: Grid) {
  const cells = grid.cells().flat();

  if (!cells.length) {
    return;
  }

  const activeCell = cells.find((i) => i.active()) || cells[0];
  const state = getDefaultState(activeCell);
  state.cell?.active.set(true);
  state.widget?.active.set(true);
  grid.state.set(state);
}

export function handleKeyDown(event: KeyboardEvent, grid: Grid): void {
  updateState(grid, onKeyDown(event, grid));
}
