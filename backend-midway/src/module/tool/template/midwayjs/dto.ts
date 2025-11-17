import * as Lodash from 'lodash';
import { GenConstants } from '@/utils/gen.constant';
export const dtoTem = (options) => {
  const { BusinessName } = options;
  const insertExclude = getExcludeClounmByType(options, 'isInsert');
  const editExclude = getExcludeClounmByType(options, 'isEdit');
  const queryExclude = getExcludeClounmByType(options, 'isQuery');
  const listExclude = getExcludeClounmByType(options, 'isList');
  const All = getAllBaseDto(options);

  return `
import { OmitDto, Rule, RuleType } from "@midwayjs/validate";

export class Base${Lodash.upperFirst(BusinessName)}Dto{
${All}
}
export class Create${Lodash.upperFirst(BusinessName)}Dto extends ${getOmitTypeStr(`Base${Lodash.upperFirst(BusinessName)}Dto`, insertExclude)}{}
export class Update${Lodash.upperFirst(BusinessName)}Dto extends ${getOmitTypeStr(`Base${Lodash.upperFirst(BusinessName)}Dto`, editExclude)}{}
export class Query${Lodash.upperFirst(BusinessName)}Dto extends ${getOmitTypeStr(`Create${Lodash.upperFirst(BusinessName)}Dto`, queryExclude)}{
  @Rule(RuleType.number().optional().min(0))
  pageNum?: number;

  @Rule(RuleType.number().optional().min(0))
  pageSize?: number;
}
export class List${Lodash.upperFirst(BusinessName)}Dto extends ${getOmitTypeStr(`Base${Lodash.upperFirst(BusinessName)}Dto`, listExclude)}{}
`;
};
/**
 * 排除对应类型的字段
 * @param options
 * @param type
 * @returns
 */
const getExcludeClounmByType = (options, type) => {
  const { columns } = options;
  return columns
    .filter((column) => {
      return column[type] === '0';
    })
    .map((column) => {
      const { javaField } = column;
      return `'${javaField}'`;
    })
    .join(',');
};

/**
 * 全局的字段
 * @param options
 * @param type
 * @returns
 */
const getAllBaseDto = (options) => {
  const { columns } = options;
  return columns
    .map((column) => {
      const { javaType, javaField, isRequired, queryType } = column;
      const type = lowercaseFirstLetter(javaType, queryType);
      const decorators = [
        `@Rule(RuleType.${type+'()'}${isRequired == 1 ? '.required()' :`.optional().allow(null).allow('')`}${'.'+getValidatorDecorator(type)})`,
      ]
      return `\t${decorators}\n\t${javaField}${isRequired == 1 ? '' : '?'}: ${type};\n`;
    })
    .join('\n');
};
function getValidatorDecorator(type) {
  switch (type) {
    case 'string':
      return `max(500)`;
    case 'number':
      return `min(0)`;
     default:
      return ``;
  }
}

function lowercaseFirstLetter(str, queryType) {
  if (str === 'Date') {
    return queryType === GenConstants.QUERY_BETWEEN ? 'Array<string>' : 'string';
  }
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function getOmitTypeStr(str, excludesStr) {
  if (excludesStr) {
    return `OmitDto(${str}, [${excludesStr}])`;
  } else {
    return str;
  }
}
