import { computed, Signal, signal } from '@angular/core';
import { Grid, GridCell, GridCellWidget, RowCol, State } from './interfaces';

export function createGrid({
  cells,
  wrap = signal<boolean>(false),
}: Partial<Omit<Grid, 'rowcount' | 'colcount' | 'state'>> & {
  cells: Signal<GridCell[][]>;
}): Grid {
  return {
    wrap,
    cells: computed(() => setGridIndices(cells())),
    rowcount: computed(() => getRowCount(cells())),
    colcount: computed(() => getColCount(cells())),
    state: createState(),
  };
}

export function createCell(
  grid: Grid,
  {
    focus = () => { },
    rowspan = signal<number>(1),
    colspan = signal<number>(1),
    active = signal<boolean>(false),
    disabled = signal<boolean>(false),
    widgets = signal<GridCellWidget[]>([]),
  }: Partial<Omit<GridCell, 'tabindex' | 'rowindex' | 'colindex'>>
): GridCell {
  return {
    focus,
    active,
    rowspan,
    colspan,
    widgets,
    disabled,
    rowindex: 0,
    colindex: 0,
    tabindex: computed(() => (active() && !grid.state().widget ? 0 : -1)),
  };
}

export function createWidget({
  focus = () => { },
  active = signal<boolean>(false),
  disabled = signal<boolean>(false),
  editable = signal<boolean>(false),
  usesArrowKeys = signal<boolean>(false),
}: Partial<Omit<GridCellWidget, 'tabindex' | 'index'>>): GridCellWidget {
  return {
    index: 0,
    tabindex: computed(() => (active() ? 0 : -1)),
    focus,
    active,
    disabled,
    editable,
    usesArrowKeys,
  };
}

function createState() {
  return signal<State>(
    {
      inWidgetMode: false,
      cellIndex: { row: 0, col: 0 },
      widgetIndex: 0,
    },
    {
      equal: (a, b) => {
        return (
          a.widget === b.widget &&
          a.inWidgetMode === b.inWidgetMode &&
          a.widgetIndex === b.widgetIndex &&
          a.cellIndex.row === b.cellIndex.row &&
          a.cellIndex.col === b.cellIndex.col &&
          a.cell === b.cell
        );
      },
    }
  );
}

function getRowCount(cells: GridCell[][]) {
  return cells.length;
}

function getColCount(cells: GridCell[][]) {
  if (!cells.length) {
    return 0;
  }

  let colcount = 0;
  for (const cell of cells[0]) {
    colcount += cell.colspan();
  }

  return colcount;
}

function setGridIndices(grid: GridCell[][]) {
  const takenCells: RowCol[] = [];

  const getNextCol = (row: number, col: number) => {
    for (let i = 0; i < takenCells.length; i++) {
      if (takenCells[i].row === row && takenCells[i].col === col) {
        col++;
        takenCells.slice(i--, 1);
      }
    }
    return col;
  };

  const markCellsAsTaken = (cell: GridCell) => {
    for (let i = cell.rowindex + 1; i < cell.rowindex + cell.rowspan(); i++) {
      for (let j = cell.colindex; j < cell.colindex + cell.colspan(); j++) {
        takenCells.push({ row: i, col: j });
      }
    }
  };

  let rowindex = 0;
  let colindex = 0;

  for (; rowindex < grid.length; rowindex++) {
    colindex = 0;
    const row = grid[rowindex];

    for (const cell of row) {
      colindex = getNextCol(rowindex, colindex);
      cell.rowindex = rowindex;
      cell.colindex = colindex;
      colindex += cell.colspan();

      if (cell.rowspan() > 1) {
        markCellsAsTaken(cell);
      }
    }
  }

  return grid;
}
