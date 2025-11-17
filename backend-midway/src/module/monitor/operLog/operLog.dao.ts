import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysOperLog } from '@entity/framework/monitor/SysOperLog';
import { ListOperLogDTO } from '@dto/monitor/operLog.dto';
import { resBuild } from '@utils/resBuild';
import { DownloadExcelService } from '../../common/excel/downloadExcel';
import { BusinessType } from '@utils/enum';

@Provide()
export class OperLogDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(SysOperLog)
  operLogRepo: Repository<SysOperLog>;

  @Inject()
  downloadExcelService: DownloadExcelService;

  // 列表
  async list(queryParams: ListOperLogDTO) {
    const queryBuilder = this.operLogRepo.createQueryBuilder('entity');
    if (queryParams.operIp) {
      queryBuilder.andWhere('entity.operIp LIKE :operIp', { operIp: `%${queryParams.operIp}%` });
    }
    if (queryParams.title) {
      queryBuilder.andWhere('entity.title LIKE :title', { title: `%${queryParams.title}%` });
    }
    if (queryParams.operName) {
      queryBuilder.andWhere('entity.operName LIKE :operName', { operName: `%${queryParams.operName}%` });
    }
    if (typeof queryParams.businessType !== 'undefined') {
      queryBuilder.andWhere('entity.businessType = :businessType', { businessType: queryParams.businessType });
    }
    if (queryParams.status) {
      const status = Number(queryParams.status);
      if (!Number.isNaN(status)) {
        queryBuilder.andWhere('entity.status = :status', { status });
      }
    }

    if (queryParams.orderByColumn && queryParams.isAsc) {
      const orderWay = queryParams.isAsc === 'ascending' ? 'ASC' : 'DESC';
      queryBuilder.addOrderBy(`entity.${queryParams.orderByColumn}`, orderWay as 'ASC' | 'DESC');
    } else {
      // 默认按操作时间降序
      queryBuilder.addOrderBy('entity.operTime', 'DESC');
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 删除
  async delete(operId: string) {
    const ids = operId.split(',').map(id => Number(id));
    await this.operLogRepo.delete(ids);
    return resBuild.success();
  }

  // 详情
  async detail(operId: number) {
    const detailInfo = await this.operLogRepo.findOneBy({ operId });
    return resBuild.data(detailInfo);
  }

  // 导出
  async export(queryParams: ListOperLogDTO) {
    // 默认导出全部，去掉分页参数
    delete queryParams.pageNum;
    delete queryParams.pageSize;
    const headers = [
      { label: '日志主键', prop: 'operId' },
      { label: '模块标题', prop: 'title' },
      { label: '操作类型', prop: 'businessType' },
      { label: '操作人员', prop: 'operName' },
      { label: '操作地址', prop: 'operIp' },
      { label: '操作状态', prop: 'status' },
      { label: '操作时间', prop: 'operTime', width: 25 },
      { label: '消耗时间', prop: 'costTime' },
    ];
    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers,
      data: rows,
      sheetName: '操作日志',
      dictMap: {
        businessType: {
          [BusinessType.OTHER]: '其他',
          [BusinessType.ADD]: '新增',
          [BusinessType.EDIT]: '修改',
          [BusinessType.REMOVE]: '删除',
          [BusinessType.Auth]: '授权',
          [BusinessType.EXPORT]: '导出',
          [BusinessType.IMPORT]: '导入',
          [BusinessType.LOGOUT]: '强退',
          [BusinessType.GENCODE]: '生成代码',
          [BusinessType.CLEAR]: '清空数据',
        },
      },
    });
  }

  // 清空日志记录数据
  async clean() {
    await this.operLogRepo.clear();
    return resBuild.success();
  }
}