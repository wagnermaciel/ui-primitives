import { Signal, WritableSignal } from '@angular/core';

export interface Grid {
  cells: Signal<GridCell[][]>;
  rowcount: Signal<number>;
  colcount: Signal<number>;
  state: WritableSignal<State>;
  wrap: Signal<boolean>;
}

export interface GridCell {
  active: WritableSignal<boolean>;
  disabled: Signal<boolean>;
  rowspan: Signal<number>;
  colspan: Signal<number>;
  rowindex: number;
  colindex: number;
  widgets: Signal<GridCellWidget[]>;
  focus: () => void;
  tabindex: Signal<-1 | 0>;
}

export interface GridCellWidget {
  index: number;
  active: WritableSignal<boolean>;
  disabled: Signal<boolean>;
  editable: Signal<boolean>;
  usesArrowKeys: Signal<boolean>;
  focus: () => void;
  tabindex: Signal<-1 | 0>;
}

export interface State {
  cell?: GridCell;
  widget?: GridCellWidget;

  cellIndex: RowCol;
  widgetIndex: number;

  inWidgetMode: boolean;
}

export interface RowCol {
  row: number;
  col: number;
}
