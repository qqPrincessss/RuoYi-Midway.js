import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { OriginCodeDTO } from "@dto/common/originCode.dto";
import * as fs from 'fs';
import { resBuild } from "@utils/resBuild";

@Provide()
export class GetCodeService {
  @Inject()
  ctx: Context;

  // 获取各个模块的代码
  async getCode(body: OriginCodeDTO) {
    const { className, moduleName } = body
    const controllerCode = await this.readFile(`src/controller/${moduleName}/${className}.controller.ts`);
    const serviceCode = await this.readFile(`src/service/${moduleName}/${className}.service.ts`);
    const dtoCode = await this.readFile(`src/dto/${moduleName}/${className}.dto.ts`);
    const entityCode = await this.readFile(`src/entity/${moduleName}/${className}.entity.ts`);
    return resBuild.data({
      controller: controllerCode,
      service: serviceCode,
      dto: dtoCode,
      entity: entityCode
    })
  }

  // 读取代码
  async readFile(url: string) {
    return await fs.promises.readFile(url, 'utf8');
  }
}
