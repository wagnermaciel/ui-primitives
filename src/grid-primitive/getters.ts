import { Grid, GridCell, RowCol, State } from './interfaces';

export function getCellRight(grid: Grid, state: State): State {
  const cellIndex = {
    row: state.cellIndex.row,
    col: Math.min(grid.colcount() - 1, state.cell!.colindex + state.cell!.colspan()),
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, cellIndex);
}

export function getCellLeft(grid: Grid, state: State): State {
  const cellIndex = {
    row: state.cellIndex.row,
    col: Math.max(0, state.cell!.colindex - 1),
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, {
    row: cellIndex.row,
    col: cell.colindex,
  });
}

export function getCellDown(grid: Grid, state: State): State {
  const cellIndex = {
    row: Math.min(grid.rowcount() - 1, state.cell!.rowindex + state.cell!.rowspan()),
    col: state.cellIndex.col,
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, cellIndex);
}

export function getCellUp(grid: Grid, state: State): State {
  const cellIndex = {
    row: Math.max(0, state.cell!.rowindex - 1),
    col: state.cellIndex.col,
  };

  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, {
    row: cell.rowindex,
    col: cellIndex.col,
  });
}

export function getPrevRowLastCell(grid: Grid, state: State): State {
  const cellIndex = {
    col: grid.colcount() - 1,
    row: Math.max(0, state.cellIndex.row - 1),
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, cellIndex);
}

export function getNextRowFirstCell(grid: Grid, state: State): State {
  const cellIndex = {
    col: 0,
    row: Math.min(grid.rowcount() - 1, state.cellIndex.row + 1),
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, cellIndex);
}

export function getNextColFirstCell(grid: Grid, state: State): State {
  const cellIndex = {
    row: 0,
    col: Math.min(grid.colcount() - 1, state.cellIndex.col + 1),
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, cellIndex);
}

export function getPrevColLastCell(grid: Grid, state: State): State {
  const cellIndex = {
    row: grid.rowcount() - 1,
    col: Math.max(0, state.cellIndex.col - 1),
  };
  const cell = getCell(grid, cellIndex)!;
  return getDefaultState(cell, cellIndex);
}

export function getWidgetRight(grid: Grid, state: State): State {
  const widgets = state.cell!.widgets();

  const widgetIndex = state.widgetIndex === widgets.length - 1
    ? (grid.wrap() ? 0 : state.widgetIndex)
    : state.widgetIndex + 1;

  const widget = widgets[widgetIndex];

  return {
    ...state,
    widget,
    widgetIndex,
    inWidgetMode: true,
  };
}

export function getWidgetLeft(grid: Grid, state: State): State {
  const widgets = state.cell!.widgets();

  const widgetIndex = state.widgetIndex === 0
    ? (grid.wrap() ? widgets.length - 1 : state.widgetIndex)
    : state.widgetIndex! - 1;

  const widget = widgets[widgetIndex];

  return {
    ...state,
    widget,
    widgetIndex,
    inWidgetMode: true,
  };
}

export function getCell(grid: Grid, index: RowCol): GridCell | void {
  for (const row of grid.cells()) {
    for (const cell of row) {
      if (
        index.row >= cell.rowindex &&
        index.row <= cell.rowindex + cell.rowspan() - 1 &&
        index.col >= cell.colindex &&
        index.col <= cell.colindex + cell.colspan() - 1
      ) {
        return cell;
      }
    }
  }
}

export function getDefaultState(cell: GridCell, cellIndex?: RowCol): State {
  const widgets = cell.widgets();
  const widget = widgets[0];

  if (!cellIndex) {
    cellIndex = {
      row: cell.rowindex,
      col: cell.colindex
    };
  }

  // When a cell contains one widget whose operation does not require
  // arrow keys and grid navigation keys, focus should be set on that widget.
  if (widgets.length === 1 && !widget?.editable() && !widget?.usesArrowKeys()) {
    return {
      cell,
      cellIndex,
      widget,
      widgetIndex: 0,
      inWidgetMode: false,
    };
  }

  return {
    cell,
    cellIndex,
    widgetIndex: 0,
    widget: undefined,
    inWidgetMode: false,
  };
}
