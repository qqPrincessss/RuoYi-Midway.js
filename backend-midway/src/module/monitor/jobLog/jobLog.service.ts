import { Provide, Inject} from '@midwayjs/core';
import { ListJobLogDTO } from "@dto/monitor/jobLog.dto";
import { JobLogDao } from "@dao/monitor/jobLog.dao";
@Provide()
export class JobLogService {
  @Inject()
  JobLogDao: JobLogDao;

  async list(queryParams: ListJobLogDTO): Promise<object> {
     return await this.JobLogDao.list(queryParams);
  }
  async delete(jobLogId: string) {
    return await this.JobLogDao.delete(jobLogId);
  }
  async detail(jobLogId: number) {
    return await this.JobLogDao.detail(jobLogId);
  }

  async export(queryParams: ListJobLogDTO) {
    return await this.JobLogDao.export(queryParams);
  }
}
