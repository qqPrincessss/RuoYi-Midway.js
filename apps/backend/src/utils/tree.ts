import { capitalize } from "es-toolkit";

interface treeNode {
  id: number;
  label: string;
  children: any[]
}
// 数组转树结构，返回纯净的树结构
export const listToTree = (arr: any[], idName: string = 'id', labelName: string = 'label'): treeNode[] => {
  const map = new Map();
  const tree = [];

  // 将数组中的每个元素映射到一个 Map 中
  arr.forEach(item => {
    map.set(item[idName], item);
  });

  // 遍历数组，构建树状结构
  arr.forEach(item => {
    const parentId = item.parentId;

    // 如果当前项的 parentId 不存在，则将其作为根节点
    if (!map.has(parentId)) {
      tree.push(item);
    } else {
      // 否则，将其添加到其父节点的 children 数组中
      const parent = map.get(parentId);
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    }
  });

  // 处理根节点
  tree.forEach(root => {
    processChildren(root);
  });

  // 处理label、id字段，删除多余的字段
  tree.forEach(root => {
    addLabelAndId(root, labelName, idName);
  });

  return tree;
}
// 递归处理 children 字段
const processChildren = (node: any) => {
  if (node.children) {
    node.children.forEach((child: any) => {
      processChildren(child);
    });
  }
}
// 处理 id 和 label
const addLabelAndId = (node: any, labelName: string, idName: string) => {
  if (node[labelName]) {
    node.label = node[labelName];
    delete node[labelName];
  }

  if (node[idName]) {
    node.id = node[idName];
    delete node[idName];
  }

  if(node.parentId === 0 || !node.parentId) {
    delete node.parentId;
  }

  if (node.children) {
    node.children.forEach((child: any) => {
      addLabelAndId(child, labelName, idName);
    });
  }
}
/**
 * 构造树型结构数据 映射字段树状结构 <常规树处理>
 * @param {*} data 数据源
 * @param {*} id id映射字段 默认 'id'
 * @param {*} parentId 父节点映射字段 默认 'parentId'
 * @param {*} children 孩子节点映射字段 默认 'children'
 */
export const handleTree = (data: any, id: string = 'id', parentId: string = 'parentId', children: string = 'children') => {
  let config = {
    id: id,
    parentId: parentId,
    childrenList: children
  };

  let childrenListMap = {};
  let nodeIds = {};
  let tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }
 const adaptToChildrenList = (o: any) => {
    if (childrenListMap[o[config.id]]) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  for (let t of tree) {
    adaptToChildrenList(t);
  }

 
  return tree;
}

// 处理菜单树（此处为定制化处理，因为要转化某些字段）
export const handleMenuTree = (data: any, id: string = 'menuId', parentId: string = 'parentId', children: string = 'children') => {
  let config = {
    id: id,
    parentId: parentId,
    childrenList: children
  };

  let childrenListMap = {};
  let nodeIds = {};
  let tree = [];
  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push({
      menuId: d.menuId,
      name: capitalize(d.path), // name首字母转为大写
      path: d.path,
      hidden: d.visible === '1',
      component: d.component || 'ParentView',
      meta: {
        title: d.menuName,
        icon: d.icon,
        noCache: d.isCache === 1,
        link: d.isFrame === 0 ? d.path : null
      },
    });
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null&& d.menuType === 'M') {
      tree.push({
        menuId: d.menuId,
        name: d.isFrame === 0 ? d.path : capitalize(d.path),
        path: d.isFrame === 0 ? d.path : '/' + d.path,
        hidden: d.visible === '1',
        redirect: 'noRedirect',
        component: 'Layout', // 根路由默认为Layout
        meta: {
          title: d.menuName,
          icon: d.icon,
          noCache: d.isCache === 1,
          link: d.isFrame === 0 ? d.path : null
        },
        children: d.children
      });
    } else if (nodeIds[parentId] == null&&d.menuType === 'C') {
      tree.push({
        menuId: d.menuId,
        path: "/",
        hidden: d.visible === '1',
        component: 'Layout', // 根路由默认为Layout
        children: [
          {
            name: d.isFrame === 0 ? d.path : capitalize(d.path),
            path:  d.path,
            hidden: d.visible === '1',
            component: d.component || 'ParentView', // 根路由默认为Layout
            meta: {
              title: d.menuName,
              icon: d.icon,
              noCache: d.isCache === 1,
            link: d.isFrame === 0 ? d.path : null
          },
        }]
      });
    }
  }
const adaptToChildrenList = (o: any) => {
    if (childrenListMap[o[config.id]]) {
      o.alwaysShow = true
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  for (let t of tree) {
    adaptToChildrenList(t);
  }

  

  return tree;
}

