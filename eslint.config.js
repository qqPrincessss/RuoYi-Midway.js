import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginVue from "eslint-plugin-vue";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const ignores = ["**/dist/**", "**/node_modules/**", ".*", "scripts/**", "**/*.d.ts"];

export default defineConfig(
  // 通用配置
  {
    ignores, // 忽略项
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier], // 继承规则
    plugins: {
      prettier: eslintPluginPrettier
    },
    languageOptions: {
      ecmaVersion: "latest", // ecma语法支持版本
      sourceType: "module", // 模块化类型
      parser: tseslint.parser // 解析器
    },
    rules: {
      // 自定义
      "no-var": "error" // 不允许使用var
    }
  },
  // 前端配置
  {
    ignores,
    files: ["apps/frontend/**/*.{ts,js,tsx,jsx,vue}", "packages/components/**/*.{ts,js,tsx,jsx,vue}"],
    extends: [...eslintPluginVue.configs["flat/recommended"], eslintConfigPrettier],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  // 后端配置
  {
    ignores,
    files: ["apps/backend/**/*.{ts,js}"],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
);
