import { Context, Inject, Provide } from "@midwayjs/core";
import { Repository } from 'typeorm';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { SysDictType } from './entites/SysDictType';
import { SysDictData } from '../dictData/entites/SysDictData';
import { ListDictTypeDTO, CreateDictTypeDTO, UpdateDictTypeDTO } from './dto/dictType.dto';
import { resBuild } from '@utils/resBuild';
import { checkIfExsit } from "@utils/serviceHelp";
import { getOperator } from "@utils";
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from "@utils/enum";
import { DownloadExcelService } from "../../common/excel/downloadExcel";
@Provide()
export class DictTypeDao {
  @Inject()
  ctx: Context;
  @Inject()
  redisService: RedisService;
  @Inject()
  downloadExcelService: DownloadExcelService;

  @InjectEntityModel(SysDictType)
  dictTypeModel: Repository<SysDictType>;
  @InjectEntityModel(SysDictData)
  dictDataModel: Repository<SysDictData>;

  //获取字典类型列表
  async list(queryParams: ListDictTypeDTO) {
    const queryBuilder = this.dictTypeModel.createQueryBuilder('entity');
    if (queryParams.dictName) {
      queryBuilder.andWhere('entity.dictName LIKE :dictName', { dictName: `%${queryParams.dictName}%` });
    }
    if (queryParams.dictType) {
      queryBuilder.andWhere('entity.dictType LIKE :dictType', { dictType: `%${queryParams.dictType}%` });
    }
    if (queryParams.status) {
      queryBuilder.andWhere('entity.status = :status', { status: queryParams.status });
    }
    // 时间范围，包含全天
    if (queryParams['params[beginTime]'] && queryParams['params[endTime]']) {
      queryBuilder.andWhere('entity.createTime BETWEEN :beginTime AND :endTime', {
        beginTime: queryParams['params[beginTime]'] + ' 00:00:00',
        endTime: queryParams['params[endTime]'] + ' 23:59:59',
      });
    }
    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize)
    }
    const [rows, total] = await queryBuilder.getManyAndCount()
    return resBuild.list(rows, total)
  }

  //创建字典类型
  async createDictTYpe(dictType: CreateDictTypeDTO) {
    await checkIfExsit(this.dictTypeModel, 'dictType', dictType.dictType);
    const entity = this.dictTypeModel.create(dictType);
    entity.setCreateBy(getOperator(this.ctx));
    await this.dictTypeModel.save(entity);
    return resBuild.success()
  }

  //删除
  async delete(dictId: string) {
    const ids = dictId.split(',').map(id => Number(id));
    await this.dictTypeModel.delete(ids);
    return resBuild.success();
  }

  //修改字典类型
  async updateDictType(dictType: UpdateDictTypeDTO) {
    const entity = this.dictTypeModel.create(dictType);
    entity.setUpdateBy(getOperator(this.ctx));
    await this.dictTypeModel.save(entity);
    return resBuild.success();
  }
  async detail(dictId: number) {
    const detailInfo = await this.dictTypeModel.findOneBy({
      dictId,
    });
    return resBuild.data(detailInfo)
  }
  // 导出
  async export(queryParams: ListDictTypeDTO) {
    let headers = [
      { label: "字典编号", prop: "dictId", },
      { label: "字典名称", prop: "dictName", },
      { label: "字典类型", prop: "dictType", },
      { label: "状态", prop: "status", },
      { label: "备注", prop: "remark", },
      { label: "创建时间", prop: "createTime", width: 25 },
    ];
    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers: headers,
      data: rows,
      sheetName: '字典类型',
    });
  }

  // 字典选择框列表
  async optionSelect() {
    const allType = await this.dictTypeModel.find();
    return resBuild.data(allType)
  }

  // 刷新缓存
  async refreshCache() {
    const allDictTypeList = await this.dictTypeModel.find();
    for (const item of allDictTypeList) {
      const dictDataList = await this.dictDataModel.find({
        select: ['cssClass', 'dictValue', 'dictLabel', 'dictSort', "dictType", 'isDefault', 'status', 'listClass'],
        where: {
          dictType: item.dictType,
          status: '0'
        },
        order: {
          dictSort: 'ASC',
          createTime: 'DESC'
        }
      });
      await this.redisService.set(`${RedisEnum.SYS_DICT_KEY}${item.dictType}`, JSON.stringify(dictDataList));
    }
    return resBuild.success()
  }
}

