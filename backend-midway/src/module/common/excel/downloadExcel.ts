import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as ExcelJS from 'exceljs';
import { StatusEnum, SexEnum, DelFlagEnum } from "@utils/enum";
import { get } from 'es-toolkit/compat';

interface OptionsType {
  headers: any[],
  data: any[],
  dictMap?: any,
  sheetName?: string,
}

/**
 * 通用枚举映射配置
 */
export const commonExportMap = {
  status: {
    [StatusEnum.NORMAL]: '正常',
    [StatusEnum.STOP]: '停用',
  },
  sex: {
    [SexEnum.MAN]: '男',
    [SexEnum.WOMAN]: '女',
  },
  delFlag: {
    [DelFlagEnum.NORMAL]: '正常',
    [DelFlagEnum.DELETE]: '已删除',
  },
};

@Provide()
export class DownloadExcelService {
  @Inject()
  ctx: Context;

  /**
  * 导出excel文件，多表头的暂不考虑
   * @params options<Object>: {
   *   headers: [{}] // 表头
   *   data: [] // 数据
   *   dictMap?: {} // 字典映射
   *   sheetName?: string // sheet名称
   * }
  * */
  async downloadExcel(options: OptionsType) {
    let data = options.data;
    // const dictMap = { ...commonExportMap, ...options.dictMap };
    const sheetName = options.sheetName || 'Sheet1';
    let workbook = new ExcelJS.Workbook();
    let worksheet = workbook.addWorksheet(sheetName);

    // 添加表头
    worksheet.columns = options.headers.map((column) => {
      const width = column.width;
      return {
        header: column.label,
        key: column.prop,
        width: isNaN(width) ? 16 : width,
      };
    });

    const dictMap = { ...commonExportMap, ...options.dictMap };

    // 数据过滤+排序
    data = data.map((item) => {
      const newItem = {};
      options.headers.forEach((field) => {
        const dataIndex = field.prop;
        const dataValue = get(item, dataIndex);
        if (dictMap && dictMap[dataIndex]) {
          newItem[dataIndex] = dictMap[dataIndex][dataValue] !== undefined ? dictMap[dataIndex][dataValue] : dataValue;
        } else {
          newItem[dataIndex] = dataValue;
        }
      });
      return newItem;
    });

    // 定义表头样式
    const headerStyle: any = {
      font: {
        size: 10,
        bold: true,
        color: { argb: 'ffffff' },
      },
      alignment: { vertical: 'middle', horizontal: 'center' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '808080' },
      },
      border: {
        top: { style: 'thin', color: { argb: '9e9e9e' } },
        left: { style: 'thin', color: { argb: '9e9e9e' } },
        bottom: { style: 'thin', color: { argb: '9e9e9e' } },
        right: { style: 'thin', color: { argb: '9e9e9e' } },
      },
    };

    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.style = headerStyle;
    });

    // 添加数据
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    worksheet.columns.forEach((column) => {
      column.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // 这个地方的空格不要更改
    this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(sheetName) + '.xlsx');
    // this.ctx.set('Access-Control-Expose-Headers', 'Content-Disposition');
    return await workbook.xlsx.writeBuffer()
  }
}
