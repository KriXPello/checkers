import { ITable, TableType } from '#interfaces';
import { BasicTable } from './basic-table';

export const createTable = (tableType: TableType): ITable => {
  if (tableType === TableType.Basic) {
    return new BasicTable();
  }

  throw new Error(`createTable: Тип стола '${tableType}' не поддерживается`);
}
