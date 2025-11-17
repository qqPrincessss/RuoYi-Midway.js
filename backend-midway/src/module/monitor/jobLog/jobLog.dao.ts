import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import { MonitorJob } from "@entity/framework/monitor/SysJob";
import { ListJobDTO, CreateJobDTO, UpdateJobDTO, ChangeStatusDto, RunJobDto } from "@dto/monitor/job.dto";
import { resBuild } from "@utils/resBuild";
import { checkIfExsit } from "@utils/serviceHelp";
import { getOperator } from "@utils";
import { DownloadExcelService } from "@service/common/downloadExcel";

@Provide()
export class JobLogDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(MonitorJob)
  MonitorJob: Repository<MonitorJob>;

  @Inject()
  protected downloadExcelService: DownloadExcelService;

  // 列表
  async list(queryParams: ListJobDTO) {
    const queryBuilder = this.MonitorJob.createQueryBuilder('entity');
    if (queryParams.jobName) {
      queryBuilder.andWhere('entity.jobName LIKE :jobName', { jobName: `%${queryParams.jobName}%` });
    }
    if (queryParams.jobGroup) {
      queryBuilder.andWhere('entity.jobGroup = :jobGroup', { jobGroup: queryParams.jobGroup });
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
  async create(job: CreateJobDTO) {
    // 新增之前先判断是否已存在
    await checkIfExsit(this.MonitorJob, 'jobName', job.jobName)
    const myEntity: MonitorJob = this.MonitorJob.create(job);
    myEntity.setCreateBy(getOperator(this.ctx))
    await this.MonitorJob.save(myEntity);
    return resBuild.success()
  }

  // 删除
  async delete(jobId: string) {
    const ids = jobId.split(',').map(id => Number(id));
    await this.MonitorJob.delete(ids);
    return resBuild.success()
  }

  // 修改
  async update(job: UpdateJobDTO) {
    const myEntity: MonitorJob = this.MonitorJob.create(job);
    myEntity.setUpdateBy(getOperator(this.ctx))
    await this.MonitorJob.save(myEntity);
    return resBuild.success()
  }

  // 详情
  async detail(jobId: number) {
    const detailInfo = await this.MonitorJob.findOneBy({
      jobId,
    });
    return resBuild.data(detailInfo)
  }

  // 导出
  async export(queryParams: ListJobDTO) {
    // 默认导出全部，去掉分页参数
    delete queryParams.pageNum;
    delete queryParams.pageSize;
    let headers = [
      { label: "任务编号", prop: "jobId", },
      { label: "任务名称", prop: "jobName", },
      { label: "任务组名", prop: "jobGroup", },
      { label: "调用目标字符串", prop: "invokeTarget", },
      { label: "cron执行表达式", prop: "cronExpression", },
      { label: "状态", prop: "status", },
    ];
    const { rows } = (await this.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers: headers,
      data: rows,
      sheetName: '定时任务',
      dictMap: {
        status: {
          '0': '正常',
          '1': '暂停',
        },
      },
    });
  }

  // 修改状态
  async changeStatus(body: ChangeStatusDto) {
    await this.MonitorJob.update(body.jobId, {
      status: body.status
    })
    return resBuild.success()
  }

  // 执行一次
  async run(body: RunJobDto) {
    return resBuild.success('开发中')
  }
}
