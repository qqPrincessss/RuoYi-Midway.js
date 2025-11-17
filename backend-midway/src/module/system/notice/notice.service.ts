import { Provide, Inject } from '@midwayjs/core';
import { NoticeDao } from '@dao/system/notice.dao';
import { ListNoticeDTO, CreateNoticeDTO, UpdateNoticeDTO } from '@dto/system/notice.dto';

@Provide()
export class NoticeService {
  @Inject()
  noticeDao: NoticeDao;

  // 列表
  async list(queryParams: ListNoticeDTO) {
    return await this.noticeDao.list(queryParams);
  }

  // 添加
  async create(notice: CreateNoticeDTO) {
    return await this.noticeDao.create(notice);
  }

  // 删除
  async delete(noticeId: string) {
    return await this.noticeDao.delete(noticeId);
  }

  // 修改
  async update(notice: UpdateNoticeDTO) {
    return await this.noticeDao.update(notice);
  }

  // 详情
  async detail(noticeId: number) {
    return await this.noticeDao.detail(noticeId);
  }
}