import { GridColDef } from "@mui/x-data-grid";
import ExcelJS from "exceljs";
import { saveAs } from 'file-saver';

interface IOptionExport {
  re_columns: Partial<ExcelJS.Column>[];
  rows: any[], filename: string;
  fix_header?: string | number;
  fix_cells_numeric?: string[];
}

export const ExceljsService = new class ExceljsService {
  typeElsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  
  constructor() { }

  setTextToKey(text: string) {
    return String(text).replace(" ", "");
  }

  setRowByColumn(columns: any[], item: any[], key: number) {
    let newObj: {[key: string]: any} = {};
    columns.forEach((column, index) => {
      newObj['id'] = `${key}`;
      newObj[this.setTextToKey(column)] = item[index]
    });
    
    return newObj
  }

  async exportExcel(option: IOptionExport) {
    // const {userInfo} = AuthService.getAuthData();

    const workbook = new ExcelJS.Workbook();
    // workbook.creator = `${userInfo?.firstname} ${userInfo?.lastname}`;
    // workbook.lastModifiedBy = `${userInfo?.firstname} ${userInfo?.lastname}`;
    workbook.created = new Date();
    workbook.modified = new Date();
    // write to a file
    var sheet1 = workbook.addWorksheet('Sheet1');

    const {re_columns, rows, filename, fix_header, fix_cells_numeric} = option;
    sheet1.columns = re_columns;
    sheet1.addRows(rows);

    const headerStart = String(fix_header || 1);
    this.setColumnSheet(parseInt(headerStart) > 1 ? Object.keys(rows[0]) : re_columns.map(column => column.header)).forEach((cell, cellIndex) => {
      this.setStyleExportExcel(sheet1, `${cell.column_sheet}${headerStart}`);
      (new Array(rows.length + 1)).fill(null).forEach((row, rowIndex) => {
        if(fix_cells_numeric?.length && fix_cells_numeric.includes(cell.column_sheet)) this.setFixDisplayFormatNumber(sheet1, `${cell.column_sheet}${rowIndex + parseInt(headerStart)}`);
        this.setBorderExportExcel(sheet1, `${cell.column_sheet}${rowIndex + parseInt(headerStart)}`)
      });
    });
    
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `${filename}.xlsx`);
  }

  async readExcelByPath(pathFile: string) {
    const workbook = new ExcelJS.Workbook();
    console.log("pathFile", pathFile)
    const data = await workbook.xlsx.readFile(pathFile);
    console.log("data", data)
  }

  async readExcelByFile(file: FileList) {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file[0].arrayBuffer()
    const data = await workbook.xlsx.load(buffer);
    
    return data.worksheets.map(sheet => sheet.getSheetValues())
  }

  setStyleExportExcel(ws: ExcelJS.Worksheet, cell: string) {
    ws.getCell(cell).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'ED2425'},
    };
    ws.getCell(cell).font = {
      color: { argb: 'FFFFFF' },
    }
  }

  setBorderExportExcel(ws: ExcelJS.Worksheet, cell: string) {
    ws.getCell(cell).border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };
  }

  setFixDisplayFormatNumber(ws: ExcelJS.Worksheet, cell: string) {
    ws.getCell(cell).numFmt = "#,###0.00";
  }

  setColumnSheet(columns: any[]): {[key: string]: any, column_sheet: string}[] {
    const sheetColumns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let roundLimit: number = 0;
    let countSheetColumn: number = 0;
    return columns.map((column, indexKey) => {
      if(countSheetColumn >= sheetColumns.length) {
        countSheetColumn = 0;
        roundLimit++;
      }

      const columnSheet = `${roundLimit > 0 ? sheetColumns[roundLimit - 1] : ""}${sheetColumns[countSheetColumn]}`;
      countSheetColumn++;

      return {...column, column_sheet: columnSheet};
    })
  }
}
