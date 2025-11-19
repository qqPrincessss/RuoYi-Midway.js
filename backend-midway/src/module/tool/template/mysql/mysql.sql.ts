export const mysqlSql = (options) => {
  const { tableName, tableComment } = options;
  const contentTem = content(options);
  return `
-- Drop table if exists
DROP TABLE IF EXISTS \`${tableName}\`;

-- Create table
CREATE TABLE \`${tableName}\` (
${contentTem}
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='${tableComment || ''}';
`;
};

function content(options) {
  const { columns } = options;
  columns.sort((a, b) => b.isPk - a.isPk); // 保证主键始终在第一个

  const defs: string[] = [];
  columns.forEach((column) => {
    const { javaField, isPk, columnType, columnComment, isIncrement } = column;
    const field = convertToSnakeCase(javaField);

    if (isPk == '1') {
      let line = `  \`${field}\` ${mapColumnType(columnType)}`;
      line += ` NOT NULL`;
      if (isIncrement == '1') {
        line += ` AUTO_INCREMENT`;
      }
      if (columnComment) {
        line += ` COMMENT '${escapeComment(columnComment)}'`;
      }
      line += `,\n  PRIMARY KEY (\`${field}\`)`;
      defs.push(line);
    } else {
      let line = `  \`${field}\` ${mapColumnType(columnType)}`;
      const defaultVal = getColumnDefault(column);
      if (defaultVal !== undefined && defaultVal !== null && defaultVal !== '') {
        line += ` DEFAULT ${defaultVal}`;
      }
      if (columnComment) {
        line += ` COMMENT '${escapeComment(columnComment)}'`;
      }
      defs.push(line);
    }
  });

  return defs.join(',\n');
}

function convertToSnakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

function escapeComment(comment) {
  if (!comment) return '';
  return String(comment).replace(/'/g, "\\'");
}

// 映射 PostgreSQL 类型到 MySQL 类型
function mapColumnType(columnType) {
  if (!columnType) return 'VARCHAR(255)';

  const type = columnType.toLowerCase();

  // 处理常见类型映射
  if (type === 'int4' || type === 'integer') return 'INT';
  if (type === 'int8' || type === 'bigint') return 'BIGINT';
  if (type === 'int2' || type === 'smallint') return 'SMALLINT';
  if (type === 'float4') return 'FLOAT';
  if (type === 'float8' || type === 'double precision') return 'DOUBLE';
  if (type === 'numeric' || type === 'decimal') return 'DECIMAL(10,2)';
  if (type === 'bool' || type === 'boolean') return 'TINYINT(1)';
  if (type === 'text') return 'TEXT';
  if (type === 'timestamp' || type === 'timestamptz') return 'DATETIME';
  if (type === 'date') return 'DATE';
  if (type === 'time' || type === 'timetz') return 'TIME';
  if (type === 'json' || type === 'jsonb') return 'JSON';
  if (type === 'uuid') return 'VARCHAR(36)';
  if (type === 'bytea') return 'BLOB';

  // varchar 和 char 类型保持不变，但需要大写
  if (type.startsWith('varchar')) return type.toUpperCase();
  if (type.startsWith('char')) return type.toUpperCase();

  // 默认返回原类型（大写）
  return columnType.toUpperCase();
}

// 字段默认值
function getColumnDefault(column) {
  let defaultValue = column.columnDefault;

  if (defaultValue === undefined || defaultValue === null) {
    return null;
  }

  // 转换为字符串处理
  defaultValue = String(defaultValue);

  // 移除 PostgreSQL 特有的类型转换后缀
  defaultValue = defaultValue.replace(/::\w+/g, '');

  const columnType = (column.columnType || '').toLowerCase();

  if (columnType === 'char' || columnType.startsWith('char(')) {
    return `'${defaultValue}'`;
  } else if (columnType === 'varchar' || columnType.startsWith('varchar(')) {
    return `'${defaultValue}'`;
  } else if (columnType === 'text') {
    return `'${defaultValue}'`;
  } else if (columnType === 'bool' || columnType === 'boolean') {
    return defaultValue === 'true' || defaultValue === '1' ? '1' : '0';
  } else {
    return defaultValue;
  }
}
