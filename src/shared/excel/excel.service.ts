import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import {
  IExcelOption,
  IColumn,
  IHeader,
  IExport
} from './excel-option.interface';
import * as moment from 'moment';

@Injectable()
export class ExcelService {
  constructor(private readonly configService: ConfigService) {}
  async create(
    excelOption: IExcelOption,
    callback?: (sheet) => void
  ): Promise<IExport> {
    const { rowHeight, data, columns, filename } = excelOption;
    const workbook = new Workbook();
    // 设置默认格式 高度20 宽度20
    const sheet = workbook.addWorksheet('sheet', {
      properties: {
        defaultRowHeight: 30,
        defaultColWidth: 30
      },
      pageSetup: {
        verticalCentered: true,
        horizontalCentered: true
      }
    });

    const defaultHeaderStyle = {
      height: rowHeight || 35,
      alignment: { vertical: 'middle', horizontal: 'center' },
      font: { size: 20, color: { argb: 'fffafa' } },
      fill: {
        type: 'pattern',
        pattern: 'lightGray',
        bgColor: { argb: 'FF0000FF' }
      }
    };

    const { headers, widths } = this.handleColumn(columns);
    sheet.columns = widths;
    const header = sheet.addRow(headers);
    Object.assign(header, defaultHeaderStyle);

    const defaultRowStyle = {
      height: rowHeight || 30,
      alignment: { vertical: 'middle', horizontal: 'center' },
      font: { size: 18 }
    };

    for (const item of data) {
      const row = sheet.addRow(item);
      Object.assign(row, defaultRowStyle);
    }

    if (callback) {
      await callback.call(this, sheet);
    }

    const _file = `${moment().format('YYYYMMDDhhmmss')}${filename ?? ''}.xlsx`;
    const filePath = join(this.configService.get<string>('FILE_PATH'), _file);
    await workbook.xlsx.writeFile(filePath);
    return { url: filePath };
  }

  private handleColumn(columns: IColumn[]): IHeader {
    const headers = [],
      widths = [];
    for (const column of columns) {
      headers.push(column.header);
      widths.push({ width: column.width || 25 });
    }
    return { headers, widths };
  }
}
