import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysNotice } from '@entity/framework/system/SysNotice';
import { ListNoticeDTO, CreateNoticeDTO, UpdateNoticeDTO } from '@dto/system/notice.dto';
import { resBuild } from '@utils/resBuild';
import { checkIfExsit, checkUpdateKeyRepeat } from '@utils/serviceHelp';
import { getOperator } from '@utils';

@Provide()
export class NoticeDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(SysNotice)
  noticeRepo: Repository<SysNotice>;

  // 列表
  async list(queryParams: ListNoticeDTO) {
    const queryBuilder = this.noticeRepo.createQueryBuilder('entity');

    if (queryParams.noticeTitle) {
      queryBuilder.andWhere('entity.noticeTitle LIKE :noticeTitle', { noticeTitle: `%${queryParams.noticeTitle}%` });
    }
    if (queryParams.createBy) {
      queryBuilder.andWhere('entity.createBy LIKE :createBy', { createBy: `%${queryParams.createBy}%` });
    }
    if (queryParams.noticeType) {
      queryBuilder.andWhere('entity.noticeType = :noticeType', { noticeType: queryParams.noticeType });
    }

    // 默认按创建时间降序
    queryBuilder.addOrderBy('entity.createTime', 'DESC');

    if (queryParams.pageNum && queryParams.pageSize) {
      queryBuilder.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    const [rows, total] = await queryBuilder.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 添加
  async create(notice: CreateNoticeDTO) {
    await checkIfExsit(this.noticeRepo, 'noticeTitle', notice.noticeTitle);
    const myEntity = this.noticeRepo.create(notice);
    myEntity.setCreateBy(getOperator(this.ctx));
    await this.noticeRepo.save(myEntity);
    return resBuild.success();
  }

  // 删除
  async delete(noticeId: string) {
    const ids = noticeId.split(',').map(id => Number(id));
    await this.noticeRepo.delete(ids);
    return resBuild.success();
  }

  // 修改
  async update(notice: UpdateNoticeDTO) {
    await checkUpdateKeyRepeat(this.noticeRepo, 'noticeTitle', notice.noticeTitle);
    const myEntity = this.noticeRepo.create(notice);
    myEntity.setUpdateBy(getOperator(this.ctx));
    await this.noticeRepo.save(myEntity);
    return resBuild.success();
  }

  // 详情
  async detail(noticeId: number) {
    const detailInfo = await this.noticeRepo.findOneBy({ noticeId });
    return resBuild.data(detailInfo);
  }
}