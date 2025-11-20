import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Repository } from 'typeorm';
import { SysConfig } from './entites/SysConfig';
import { ListConfigDTO, CreateConfigDTO, UpdateConfigDTO } from './dto/config.dto';
import { resBuild } from '@utils/resBuild';
import { checkIfExsit } from '@utils/serviceHelp';
import { getOperator } from '@utils';
import { DownloadExcelService } from '../../common/excel/downloadExcel';

@Provide()
export class ConfigDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(SysConfig)
  configRepo: Repository<SysConfig>;

  @Inject()
  protected downloadExcelService: DownloadExcelService;

  // 列表
  async list(queryParams: ListConfigDTO) {
    const qb = this.configRepo.createQueryBuilder('entity');

    if (queryParams.configName) {
      qb.andWhere('entity.configName like :configName', { configName: `%${queryParams.configName}%` });
    }
    if (queryParams.configKey) {
      qb.andWhere('entity.configKey like :configKey', { configKey: `%${queryParams.configKey}%` });
    }
    if (queryParams.configType) {
      qb.andWhere('entity.configType = :configType', { configType: queryParams.configType });
    }

    // 时间范围，包含全天
    if (queryParams['params[beginTime]'] && queryParams['params[endTime]']) {
      qb.andWhere('entity.createTime BETWEEN :beginTime AND :endTime', {
        beginTime: queryParams['params[beginTime]'] + ' 00:00:00',
        endTime: queryParams['params[endTime]'] + ' 23:59:59',
      });
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      qb.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    const [rows, total] = await qb.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 添加
  async create(config: CreateConfigDTO) {
    await checkIfExsit(this.configRepo, 'configName', config.configName);

    const entity = this.configRepo.create(config);
    entity.setCreateBy(getOperator(this.ctx));
    await this.configRepo.save(entity);
    return resBuild.success();
  }

  // 删除（根据ID数组）
  async deleteByIds(ids: number[]) {
    await this.configRepo.delete(ids);
    return resBuild.success();
  }

  // 修改
  async update(config: UpdateConfigDTO) {
    const entity = this.configRepo.create(config);
    entity.setUpdateBy(getOperator(this.ctx));
    await this.configRepo.save(entity);
    return resBuild.success();
  }

  // 详情
  async detail(configId: number) {
    const detailInfo = await this.configRepo.findOneBy({ configId });
    return resBuild.data(detailInfo);
  }

  // 导出
  async export(queryParams: ListConfigDTO) {
    // 默认导出全部，去掉分页参数
    delete queryParams.pageNum;
    delete queryParams.pageSize;

    const headers = [
      { label: '参数主键', prop: 'configId' },
      { label: '参数名称', prop: 'configName' },
      { label: '参数键名', prop: 'configKey' },
      { label: '参数键值', prop: 'configValue' },
      { label: '系统内置', prop: 'configType' },
      { label: '备注', prop: 'remark' },
      { label: '创建时间', prop: 'createTime', width: 25 },
    ];

    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers,
      data: rows,
      sheetName: '参数配置',
    });
  }

  // 根据ID数组查询详细列表（用于删除前清理缓存）
  async findByIds(ids: number[]) {
    return await this.configRepo.findBy({ configId: In(ids) });
  }

  // 根据键名查询
  async findByKey(configKey: string) {
    return await this.configRepo.findOneBy({ configKey });
  }

  // 查询全部（用于刷新缓存）
  async findAll() {
    return await this.configRepo.find();
  }
}