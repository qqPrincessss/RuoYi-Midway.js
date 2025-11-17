import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { SysDictData } from "@entity/framework/system/SysDictData";
import { ListDictDataDTO, CreateDictDataDTO, UpdateDictDataDTO } from "@dto/system/dictDataDto";
import { DownloadExcelService } from "@service/common/downloadExcel";
import { resBuild } from "@utils/resBuild";
// import { checkIfExsit } from "@utils/serviceHelp";
import { getOperator } from "@utils";
import { RedisService } from '@midwayjs/redis';
import { RedisEnum } from "@utils/enum";

@Provide()
export class DictDataDao {
  @Inject()
  ctx: Context;

  @Inject()
  redisService: RedisService;

  @Inject()
  downloadExcelService: DownloadExcelService;

  @InjectEntityModel(SysDictData)
  dictDataEntity: Repository<SysDictData>;

  // 列表
  async list(queryParams: ListDictDataDTO) {
    const queryBuilder = this.dictDataEntity.createQueryBuilder('entity');
    if (queryParams.dictType) {
      queryBuilder.andWhere('entity.dictType = :dictType', { dictType: queryParams.dictType });
    }
    if (queryParams.dictLabel) {
      queryBuilder.andWhere('entity.dictLabel LIKE :dictLabel', { dictLabel: `%${queryParams.dictLabel}%` });
    }
    if (queryParams.status) {
      queryBuilder.andWhere('entity.status = :status', { status: queryParams.status });
    }
    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize)
    }
    const [rows, total] = await queryBuilder.getManyAndCount()
    return resBuild.list(rows, total)
  }

  // 添加
  async create(dictData: CreateDictDataDTO) {
    // 新增之前先判断是否已存在
    const myEntity = this.dictDataEntity.create(dictData);
    myEntity.setCreateBy(getOperator(this.ctx))
    await this.dictDataEntity.save(myEntity);
    return resBuild.success()
  }

  // 删除
  async delete(dictCode: string) {
    const ids = dictCode.split(',').map(id => Number(id));
    await this.dictDataEntity.delete(ids);
    return resBuild.success()
  }

  // 修改
  async update(dictData: UpdateDictDataDTO) {
    const myEntity = this.dictDataEntity.create(dictData);
    myEntity.setUpdateBy(getOperator(this.ctx))
    await this.dictDataEntity.save(myEntity);
    return resBuild.success()
  }

  // 详情
  async detail(dictCode: number) {
    const detailInfo = await this.dictDataEntity.findOneBy({
      dictCode,
    });
    return resBuild.data(detailInfo)
  }

  // 导出
  async export(queryParams: ListDictDataDTO) {
    const headers = [
      { label: "字典编码", prop: "dictCode", },
      { label: "字典标签", prop: "dictLabel", },
      { label: "字典键值", prop: "dictValue", },
      { label: "字典排序", prop: "dictSort", },
      { label: "状态", prop: "status", },
      { label: "备注", prop: "remark", },
      { label: "创建时间", prop: "createTime", width: 25 },
    ];
    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers,
      data: rows,
      sheetName: '字典数据'
    })
  }

  // 获取dictType类型的字典数据，排除status等于1的数据（0正常 1停用）
  async getDictDataByType(dictType: string) {
    const allDictDataList = await this.redisService.get(`${RedisEnum.SYS_DICT_KEY}${dictType}`)
    if (allDictDataList) {
      return resBuild.data(JSON.parse(allDictDataList))
    } else {
      const rows = await this.dictDataEntity.find({
        select: ['cssClass', 'dictValue', 'dictLabel', 'dictSort', "dictType", 'isDefault', 'status', 'listClass'],
        where: {
          dictType,
          status: '0'
        },
        order: {
          dictSort: 'ASC',
          createTime: 'DESC'
        }
      });
      await this.redisService.set(`${RedisEnum.SYS_DICT_KEY}${dictType}`, JSON.stringify(rows))
      return resBuild.data(rows)
    }
  }
}
