import { Provide, Inject } from '@midwayjs/core';
import { PostDao } from '@dao/system/post.dao';
import { ListPostDTO, CreatePostDTO, UpdatePostDTO } from '@dto/system/post.dto';
import { DownloadExcelService } from '@service/common/downloadExcel';

@Provide()
export class PostService {
  @Inject()
  postDao: PostDao;

  @Inject()
  downloadExcelService: DownloadExcelService;

  // 列表
  async list(queryParams: ListPostDTO) {
    return await this.postDao.list(queryParams);
  }

  // 添加
  async create(post: CreatePostDTO) {
    return await this.postDao.create(post);
  }

  // 删除
  async delete(postId: string) {
    return await this.postDao.delete(postId);
  }

  // 修改
  async update(post: UpdatePostDTO) {
    return await this.postDao.update(post);
  }

  // 详情
  async detail(postId: number) {
    return await this.postDao.detail(postId);
  }

  // 导出
  async export(queryParams: ListPostDTO) {
    const headers = [
      { label: '岗位编号', prop: 'postId' },
      { label: '岗位编码', prop: 'postCode' },
      { label: '岗位名称', prop: 'postName' },
      { label: '岗位排序', prop: 'postSort' },
      { label: '状态', prop: 'status' },
      { label: '创建时间', prop: 'createTime', width: 25 },
    ];
    const { rows } = (await this.postDao.list(queryParams)).data;
    return this.downloadExcelService.downloadExcel({
      headers,
      data: rows,
      sheetName: '岗位信息',
    });
  }
}