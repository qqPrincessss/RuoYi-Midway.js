import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { SysPost } from './entites/SysPost';
import { ListPostDTO, CreatePostDTO, UpdatePostDTO } from './dto/post.dto';
import { resBuild } from '@utils/resBuild';
import { checkIfExsit, checkUpdateKeyRepeat } from '@utils/serviceHelp';
import { getOperator } from '@utils';
@Provide()
export class PostDao {
  @Inject()
  ctx: Context;

  @InjectEntityModel(SysPost)
  postRepo: Repository<SysPost>;

  // 列表
  async list(queryParams: ListPostDTO) {
    const qb = this.postRepo.createQueryBuilder('entity');

    if (queryParams.postName) {
      qb.andWhere('entity.postName LIKE :postName', { postName: `%${queryParams.postName}%` });
    }
    if (queryParams.postCode) {
      qb.andWhere('entity.postCode LIKE :postCode', { postCode: `%${queryParams.postCode}%` });
    }
    if (queryParams.status) {
      qb.andWhere('entity.status = :status', { status: queryParams.status });
    }

    if (queryParams.pageNum && queryParams.pageSize) {
      qb.skip((queryParams.pageNum - 1) * queryParams.pageSize).take(queryParams.pageSize);
    }

    qb.addOrderBy('entity.postSort', 'ASC');
    qb.addOrderBy('entity.createTime', 'DESC');

    const [rows, total] = await qb.getManyAndCount();
    return resBuild.list(rows, total);
  }

  // 添加
  async create(post: CreatePostDTO) {
    await checkIfExsit(this.postRepo, 'postName', post.postName);
    const entity = this.postRepo.create(post);
    entity.setCreateBy(getOperator(this.ctx));
    await this.postRepo.save(entity);
    return resBuild.success();
  }

  // 删除（支持逗号分隔ID）
  async delete(postId: string) {
    const ids = postId.split(',').map(id => Number(id));
    await this.postRepo.delete(ids);
    return resBuild.success();
  }

  // 修改
  async update(post: UpdatePostDTO) {
    await checkUpdateKeyRepeat(this.postRepo, 'postName', post.postName);
    const entity = this.postRepo.create(post);
    entity.setUpdateBy(getOperator(this.ctx));
    await this.postRepo.save(entity);
    return resBuild.success();
  }

  // 详情
  async detail(postId: number) {
    const detailInfo = await this.postRepo.findOneBy({ postId });
    return resBuild.data(detailInfo);
  }
}