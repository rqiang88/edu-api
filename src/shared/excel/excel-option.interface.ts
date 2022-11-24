export interface IExcelOption {
  columns: IColumn[];
  headerHeight?: number;
  rowHeight?: number;
  filename?: string;
  data?: any[];
}

export interface IColumn {
  header: string;
  key?: string;
  width?: number;
}

export interface IHeader {
  headers: string[];
  widths?: any[];
}

export interface IExport {
  url: string;
}
