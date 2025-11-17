import * as Lodash from 'lodash';
import { GenConstants } from '@/utils/gen.constant';

export const daoTem = (options) => {
  const { BusinessName, primaryKey, businessName } = options;
  return `
import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { In, Repository } from 'typeorm';
import { Create${Lodash.upperFirst(BusinessName)}Dto, Update${Lodash.upperFirst(BusinessName)}Dto, Query${Lodash.upperFirst(BusinessName)}Dto} from '@dto/${businessName}.dto';
import { ${Lodash.upperFirst(BusinessName)}Entity } from '@entity/${businessName}.entity';
import { resBuild } from '../utils/resBuild';
import { getOperator, isEmpty } from '../utils';

@Provide()
export class ${Lodash.upperFirst(BusinessName)}Dao {
  @Inject()
  ctx: Context;
  @InjectEntityModel(${Lodash.upperFirst(BusinessName)}Entity)
  ${businessName}EntityRep: Repository<${Lodash.upperFirst(BusinessName)}Entity>;

  async create(create${Lodash.upperFirst(BusinessName)}Dto: Create${Lodash.upperFirst(BusinessName)}Dto) {
    const entity = this.${businessName}EntityRep.create(create${Lodash.upperFirst(BusinessName)}Dto);
    entity.setCreateBy(getOperator(this.ctx));
    entity.setUpdateBy(getOperator(this.ctx));
    await this.${businessName}EntityRep.save(entity);
    return resBuild.success();
  }

  async list(query: Query${Lodash.upperFirst(BusinessName)}Dto) {
    const entity = this.${businessName}EntityRep.createQueryBuilder('entity') 
      .where('entity.delFlag = :delFlag', { delFlag: '0' });

    ${getListQueryStr(options)}
    entity.select([${getListFiledSelectStr(options)}]);
    if (query.pageNum && query.pageSize) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    }
    entity.addOrderBy('entity.createTime', 'DESC');
    const [list, total] = await entity.getManyAndCount();
    return resBuild.list(list, total);
  }

  async detail(${primaryKey}: number) {
    const detailInfo = await this.${businessName}EntityRep.findOneBy({ ${primaryKey} });
    return resBuild.data(detailInfo);
  }

  async update(update${Lodash.upperFirst(BusinessName)}Dto: Update${Lodash.upperFirst(BusinessName)}Dto) {
     const entity = this.${businessName}EntityRep.create(update${Lodash.upperFirst(BusinessName)}Dto);
     entity.setUpdateBy(getOperator(this.ctx));
     await this.${businessName}EntityRep.save(entity);
     return resBuild.success();
  }

  async remove(${primaryKey}s: Array<number>) {
     await this.${businessName}EntityRep.update(
      { ${primaryKey}: In(${primaryKey}s) },
      {
        delFlag: '1',
        updateBy: getOperator(this.ctx),
        updateTime: new Date(),
      }
    );
    return resBuild.success();
  }
}`;
};

/**
 * 列表返回字段
 * @param options
 * @returns
 */
const getListFiledSelectStr = (options) => {
  const { columns } = options;
  return columns
    .filter((column) => column.isList == '1')
    .map((column) => {
      return `"entity.${column.javaField}"`;
    })
    .join(',');
};

/**
 * 列表查询条件
 * @param options
 * @returns
 */
const getListQueryStr = (options) => {
  const { columns } = options;
  return columns
    .filter((column) => column.isQuery == '1' && column.isPk == '0')
    .map((column) => {
      switch (column.queryType) {
        case GenConstants.QUERY_EQ:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} = :${column.javaField}", { ${column.javaField}: query.${column.javaField} });
    }`;
        case GenConstants.QUERY_NE:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} <> :${column.javaField}", { ${column.javaField}: query.${column.javaField} });
    }`;
        case GenConstants.QUERY_GT:
          return `if (query.${column.javaField}) {
      entity.andWhere("entity.${column.javaField} > :${column.javaField}", { ${column.javaField}: query.${column.javaField} });
    }`;
        case GenConstants.QUERY_GTE:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} >= :${column.javaField}", { ${column.javaField}: query.${column.javaField} });
    }`;
        case GenConstants.QUERY_LT:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} < :${column.javaField}", { ${column.javaField}: query.${column.javaField} });
    }`;
        case GenConstants.QUERY_LTE:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} <= :${column.javaField}", { ${column.javaField}: query.${column.javaField} });
    }`;
        case GenConstants.QUERY_LIKE:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} ILIKE :${column.javaField}", { ${column.javaField}: \`%\${query.${column.javaField}}%\` });
    }`;
        case GenConstants.QUERY_BETWEEN:
          return `if (!isEmpty(query.${column.javaField})) {
      entity.andWhere("entity.${column.javaField} BETWEEN :start AND :end", { start: query.${column.javaField}[0], end: query.${column.javaField}[1] });
    }`;
        default:
          return ``;
      }
    })
    .join('\n    ');
};

// const getPrimaryKeyType = (options) => {
//   const { primaryKey } = options;

//   if (!primaryKey) {
//     return 'string';
//   }
//   const primaryKeyColumn = options.columns.find((item) => item.javaField === primaryKey);
//   return lowercaseFirstLetter(primaryKeyColumn?.javaType);
// };

// function lowercaseFirstLetter(str) {
//   if (str === 'Date') {
//     return 'string';
//   }
//   return str.charAt(0).toLowerCase() + str.slice(1);
// }
