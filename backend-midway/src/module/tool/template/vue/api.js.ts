export function apiTempalte(options) {
  const { BusinessName, moduleName, functionName, businessName, primaryKey } = options;
  return `
    import request from '@/utils/request'
    // 查询${functionName}列表
    export const list${BusinessName} = (query) => {
    return request({
        url: '/${moduleName}/${businessName}/list',
        method: 'get',
        params: query
    })
    }
    // 查询${functionName}详细
    export const get${BusinessName} = (${primaryKey}) => {
    return request({
        url: '/${moduleName}/${businessName}/' + ${primaryKey},
        method: 'get'
    })
    }
    
    // 新增${functionName}
    export const add${BusinessName} = (data) => {
    return request({
        url: '/${moduleName}/${businessName}',
        method: 'post',
        data: data
    })
    }

    // 修改${functionName}
    export const update${BusinessName} = (data) => {    
    return request({
        url: '/${moduleName}/${businessName}',
        method: 'put',
        data: data
    })
    }

    // 删除${functionName}
    export const del${BusinessName} = (${primaryKey}) => {  
    return request({
        url: '/${moduleName}/${businessName}/' + ${primaryKey},
        method: 'delete'
    })
    }
    
    // 导出${functionName}
    export const export${BusinessName} = (data) => {
    return request({
        url: '/${moduleName}/${businessName}/export',
        method: 'post',
        data: data
    })
    }
    `;
}
