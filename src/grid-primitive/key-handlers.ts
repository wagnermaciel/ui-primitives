import {
  getCell,
  getCellDown,
  getCellLeft,
  getCellRight,
  getCellUp,
  getNextColFirstCell,
  getNextRowFirstCell,
  getPrevColLastCell,
  getPrevRowLastCell,
  getWidgetLeft,
  getWidgetRight,
} from './getters';
import { Grid, State } from './interfaces';

export function onKeyDown(event: KeyboardEvent, grid: Grid): State {
  switch (event.key) {
    case 'Enter':
      return onEnter(grid.state());
    case 'Escape':
      return onEscape(grid.state());
    case 'ArrowUp':
      return onArrowUp(grid, grid.state());
    case 'ArrowDown':
      return onArrowDown(grid, grid.state());
    case 'ArrowLeft':
      return onArrowLeft(grid, grid.state());
    case 'ArrowRight':
      return onArrowRight(grid, grid.state());
    default:
      return onAlphanumeric(event, grid.state());
  }
}

export function onAlphanumeric(event: KeyboardEvent, state: State): State {
  if (state.inWidgetMode) {
    return state;
  }

  const isLetter = (event.key >= 'a' && event.key <= 'z');
  const isNumber = (event.key >= '0' && event.key <= '9');

  if (isLetter || isNumber) {
    const widgets = state.cell?.widgets() || [];
    const widget = widgets[0];
    if (widgets.length === 1 && widget?.editable()) {
      return {
        ...state,
        widget,
        widgetIndex: 0,
        inWidgetMode: true,
      };
    }
  }

  return state;
}

export function onEnter(state: State): State {
  const cell = state.cell!;

  if (state.inWidgetMode || cell.disabled()) {
    return state;
  }

  const widgets = cell.widgets();

  // Disable grid navigation for cases where the user may need keys that
  // are used for grid navigation to operate or navigate elements inside a cell.
  if (
    widgets.length > 1 ||
    widgets[0]?.editable() ||
    widgets[0]?.usesArrowKeys()
  ) {
    return {
      ...state,
      widgetIndex: 0,
      inWidgetMode: true,
      widget: widgets[0],
    };
  }

  return state;
}

export function onEscape(state: State): State {
  if (!state.inWidgetMode) {
    return state;
  }

  return {
    ...state,
    inWidgetMode: false,
    widget: undefined,
  };
}

export function onArrowRight(grid: Grid, state: State): State {
  if (state.inWidgetMode) {
    return getWidgetRight(grid, state);
  }

  let next = getCellRight(grid, state);
  const hasChanged = next.cell !== state.cell;
  const isLastRow = next.cellIndex.row + 1 > grid.rowcount() - 1;

  if (grid.wrap() && !hasChanged && !isLastRow) {
    next = getNextRowFirstCell(grid, state);
  }

  return next;
}

export function onArrowLeft(grid: Grid, state: State): State {
  if (state.inWidgetMode) {
    return getWidgetLeft(grid, state);
  }

  let next = getCellLeft(grid, state);
  const hasChanged = next.cell !== state.cell;
  const isFirstRow = next.cellIndex.row === 0;

  if (grid.wrap() && !hasChanged && !isFirstRow) {
    next = getPrevRowLastCell(grid, state)
  }

  return next;
}

export function onArrowDown(grid: Grid, state: State): State {
  if (state.inWidgetMode) {
    return getWidgetRight(grid, state);
  }

  let next = getCellDown(grid, state);
  const hasChanged = next.cell !== state.cell;
  const isLastCell = next.cell === getCell(grid, { row: grid.rowcount() - 1, col: grid.colcount() - 1 });

  if (grid.wrap() && !hasChanged && !isLastCell) {
    next = getNextColFirstCell(grid, state)
  }

  return next;
}

export function onArrowUp(grid: Grid, state: State): State {
  if (state.inWidgetMode) {
    return getWidgetLeft(grid, state);
  }

  let next = getCellUp(grid, state);
  const hasChanged = next.cell !== state.cell;
  const isFirstCell = next.cell === getCell(grid, { row: 0, col: 0 });

  if (grid.wrap() && !hasChanged && !isFirstCell) {
    next = getPrevColLastCell(grid, state)
  }

  return next;
}
