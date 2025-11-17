import { apiTempalte } from './vue/api.js.js';
import { indexVue } from './vue/index.vue.js';
import { dialogVue } from './vue/dialogVue.vue.js';
import { entityTem } from './midwayjs/entity.js';
import { dtoTem } from './midwayjs/dto.js';
import { controllerTem } from './midwayjs/controller.js';
import { serviceTem } from './midwayjs/service.js';
import { daoTem } from './midwayjs/dao.js';
import { pgSql } from './pg/pg.sql.js';




const templates = {
  'tool/template/midwayjs/entity.ts.vm': entityTem,
  'tool/template/midwayjs/dto.ts.vm': dtoTem,
  'tool/template/midwayjs/controller.ts.vm': controllerTem,
  'tool/template/midwayjs/service.ts.vm': serviceTem,
  'tool/template/midwayjs/dao.ts.vm': daoTem,
  'tool/template/vue/api.js.vm': apiTempalte,
  'tool/template/vue/index.vue.vm': indexVue,
  'tool/template/vue/dialogVue.vue.vm': dialogVue,
  'tool/template/pg/pg.sql.vm': pgSql,
};

export const index = (options) => {
  const result = {};
  for (const [path, templateFunc] of Object.entries(templates)) {
    result[path] = templateFunc(options);
  }
  return result;
};
