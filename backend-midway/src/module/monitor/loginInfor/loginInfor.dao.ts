import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorLogininfor } from './entites/MonitorLogininfor';
import { ListLoginInforDTO } from './dto/loginInfor.dto';
import { resBuild } from '@utils/resBuild';
import { DownloadExcelService } from '../../common/excel/downloadExcel';

@Provide()
export class LoginInforDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(MonitorLogininfor)
  loginInforRepo: Repository<MonitorLogininfor>;

  @Inject()
  downloadExcelService: DownloadExcelService;

  // 列表
  async list(queryParams: ListLoginInforDTO) {
    console.log('queryParams', queryParams);
    const queryBuilder = this.loginInforRepo.createQueryBuilder('entity');
    if (queryParams.ipaddr) {
      queryBuilder.andWhere('entity.ipaddr LIKE :ipaddr', { ipaddr: `%${queryParams.ipaddr}%` });
    }
    if (queryParams.userName) {
      queryBuilder.andWhere('entity.userName LIKE :userName', { userName: `%${queryParams.userName}%` });
    }
    if (queryParams.status) {
      queryBuilder.andWhere('entity.status = :status', { status: queryParams.status });
    }
    
    if (queryParams['params[beginTime]'] && queryParams['params[endTime]']) {
      queryBuilder.andWhere('entity.loginTime BETWEEN :start AND :end', {
        start: queryParams['params[beginTime]'],
        end: queryParams['params[endTime]'],
      });
    }
    if (queryParams.orderByColumn && queryParams.isAsc) {
      const orderWay = queryParams.isAsc === 'ascending' ? 'ASC' : 'DESC';
      queryBuilder.addOrderBy(`entity.${queryParams.orderByColumn}`, orderWay as 'ASC' | 'DESC');
    } else {
      // 默认按登录时间降序
      queryBuilder.addOrderBy('entity.loginTime', 'DESC');
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 删除
  async delete(infoId: string) {
    const ids = infoId.split(',').map(id => Number(id));
    await this.loginInforRepo.delete(ids);
    return resBuild.success();
  }

  // 导出
  async export(queryParams: ListLoginInforDTO) {
    // 默认导出全部，去掉分页参数
    delete queryParams.pageNum;
    delete queryParams.pageSize;
    const headers = [
      { label: '序号', prop: 'infoId' },
      { label: '用户名称', prop: 'userName' },
      { label: '登录地址', prop: 'ipaddr' },
      { label: '操作系统', prop: 'os' },
      { label: '浏览器', prop: 'browser' },
      { label: '登录状态', prop: 'status' },
      { label: '描述', prop: 'message' },
      { label: '访问时间', prop: 'loginTime', width: 25 },
    ];
    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers,
      data: rows,
      sheetName: '登录日志',
      dictMap: {
        status: {
          '0': '成功',
          '1': '失败',
        },
      },
    });
  }

  // 清空
  async clean() {
    await this.loginInforRepo.clear();
    return resBuild.success();
  }

  // 解锁
  async unlock(userName: string) {
    return resBuild.success('开发中');
  }
}