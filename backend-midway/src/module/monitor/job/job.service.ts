import { Provide, Inject } from '@midwayjs/core';
import { JobDao } from '@dao/monitor/job.dao';
import { ListJobDTO, CreateJobDTO, UpdateJobDTO, ChangeStatusDto, RunJobDto } from '@dto/monitor/job.dto';

@Provide()
export class JobService {
  @Inject()
  jobDao: JobDao;

  // 列表
  async list(queryParams: ListJobDTO) {
    return await this.jobDao.list(queryParams);
  }

  // 添加
  async create(job: CreateJobDTO) {
    return await this.jobDao.create(job);
  }

  // 删除
  async delete(jobId: string) {
    return await this.jobDao.delete(jobId);
  }

  // 修改
  async update(job: UpdateJobDTO) {
    return await this.jobDao.update(job);
  }

  // 详情
  async detail(jobId: number) {
    return await this.jobDao.detail(jobId);
  }

  // 导出
  async export(queryParams: ListJobDTO) {
    return await this.jobDao.export(queryParams);
  }

  // 修改状态
  async changeStatus(body: ChangeStatusDto) {
    return await this.jobDao.changeStatus(body);
  }

  // 执行一次
  async run(body: RunJobDto) {
    return await this.jobDao.run(body);
  }
}