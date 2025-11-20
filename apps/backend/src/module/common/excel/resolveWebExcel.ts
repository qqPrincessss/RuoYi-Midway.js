import { Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as ExcelJS from "exceljs";
import { UploadStreamFileInfo } from '@midwayjs/busboy';

interface OptionsType {
  headerFields: string[]; // 表头字段
  tableData: any[]; // 解析的表格数据
  entityName: any; // 实体类名
  updateSupport: boolean; // 是否更新已经存在的用户数据 true/false
  uniqueKey: string; // 唯一字段的key名，不能重复，只有通过该参数，才能判断是否有重复值
}

@Provide()
export class ResolveExcelService {
  @Inject()
  ctx: Context;

  // 解析前端上传的excel文件，变成可读数据流，默认模板只有一张表
  async resolvedWebExcelStream(files: UploadStreamFileInfo) {
    const { ctx } = this
    const fileStream: any = files[0]
    const mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const readStream = fileStream.data;
    if(fileStream.mimeType === mimeType) {
      try {}
      catch (err) {
        console.log('err', err)
      }
      const workbook = new ExcelJS.Workbook();
      // 获取第一个表格的数据
      // const worksheets = await workbook.xlsx.read(fileStream.data)
      const worksheets = await workbook.xlsx.read(readStream)
      const worksheet = worksheets.getWorksheet(1)

      let sheetValue = worksheet.getSheetValues()
      // 去除空数组
      sheetValue = sheetValue.filter((item: any) => item.length > 0)
      // 去除二维数组里一维数组的第一项
      const handleResultArray = []
      sheetValue.forEach((item: any) => {
        item.shift()
        handleResultArray.push(item)
      })
      let tableHeader = handleResultArray[0] // 表头
      let tableData = handleResultArray.filter((item, index) => index > 0) // 表格数据
      // 清除当前上传的文件，这里只需要解析，不需要上传到临时文件夹中，所以在此删除，后期需从根本优化
      await ctx.cleanupRequestFiles()
      return {
        tableHeader,
        tableData,
        originTable: handleResultArray,
      }
    } else {
      ctx.throw(500, '不是excel文件')
    }
  }

  // 分析导入：提示与写入数据库
  async analysisExcelAndWhite(options: OptionsType) {
    const { headerFields, tableData, entityName, updateSupport, uniqueKey  } = options;
    const failList = []; // 已存在提示列表
    const successList = []; // 成功提示列表
    const createBy = this.ctx.session.userInfo.userName

    // 根据表头字段和表格数据，生成键值对数组
    const tableDataMap = tableData.map((item: any) => {
      const obj: any = {}
      headerFields.forEach((field: any, index: number) => {
        obj[field] = item[index]
      })
      return obj
    })

    // 循环表格数据，判断是否已存在，已存在则提示，否则写入数据库
    for(let i = 0; i < tableData.length; i++) {

      // 数据库是否存在该条数据
      const isExist = await entityName.findOne({
        where: {
          [uniqueKey]: tableDataMap[i][uniqueKey]
        }
      })
      if(isExist) {
        // 存在重复，如果更新已存在的数据，则替换
        if(updateSupport) {
          // 更新原有的数据
          await entityName.update({
            [uniqueKey]: tableDataMap[i][uniqueKey]
          }, {
            ...tableDataMap[i],
            updateBy: createBy
          })
          // 替换的也算入导入成功
          successList.push({
            line: i,
            name: tableDataMap[i][uniqueKey]
          })
        } else {
          failList.push({
            line: i,
            name: tableDataMap[i][uniqueKey]
          })
        }
      } else {
        await entityName.save({
          ...tableDataMap[i],
          createBy
        })
        successList.push({
          line: i,
          name: tableDataMap[i][uniqueKey]
        })
      }
    }

    // 提示语处理
    let errorTip = `导入失败的数据共计：<strong>${failList.length}</strong>条</br>`
    let successTip = `导入成功的数据共计：<strong>${successList.length}</strong>条</br>`
    failList.forEach(item => {
      errorTip += `第${ item.line + 1}行：数据项为 "${item.name}" 的数据已存在；</br>`
    })
    successList.forEach(item => {
      successTip += `第${ item.line + 1}行：数据项为 "${item.name}" 的数据上传成功；</br>`
    })
    return errorTip + successTip
  }
}
