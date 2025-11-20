import path from "node:path";
import URL from "node:url";
import fs from "node:fs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import vue from "@vitejs/plugin-vue";
import postcss from "rollup-plugin-postcss";

const __filename = URL.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packages = ["utils", "components"];

function getPackageRoots() {
  return packages.map(pkg => path.resolve(__dirname, "../packages", pkg));
}

async function packageJson(root) {
  const jsonPath = path.resolve(root, "package.json");
  const content = await fs.promises.readFile(jsonPath, "utf-8");
  return JSON.parse(content);
}

async function getRollupConfig(root) {
  const config = await packageJson(root);
  const tsconfig = path.resolve(root, "tsconfig.json");
  const { name, formats } = config.buildOptions || {};
  const dist = path.resolve(root, "./dist");
  const entry = path.resolve(root, "./src/index.ts");
  const rollupOptions = {
    input: entry,
    sourcemap: true,
    external: ["vue"],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig,
        compilerOptions: {
          outDir: dist
        }
      }),
      vue({
        template: {
          compilerOptions: {
            // 自定义转换函数，在生成 AST 时移除特定属性
            nodeTransforms: [
              node => {
                if (node.type === 1 /* NodeTypes.ELEMENT */) {
                  // 过滤掉所有 data-testid 属性
                  node.props = node.props.filter(prop => {
                    if (prop.type === 6 /* NodeTypes.ATTRIBUTE */) {
                      return prop.name !== "data-testid";
                    }
                    return true;
                  });
                }
              }
            ]
          }
        }
      }),
      postcss()
    ],
    dir: dist
  };
  const output = [];
  for (const format of formats) {
    const outputItem = {
      format,
      file: path.resolve(dist, `index.${format}.js`),
      sourcemap: true,
      globals: {
        vue: "Vue"
      }
    };
    if (format === "iife") {
      outputItem.name = name;
    }
    output.push(outputItem);
  }
  rollupOptions.output = output;
  // watch options
  rollupOptions.watch = {
    include: path.resolve(root, "src/**"),
    exclude: path.resolve(root, "node_modules/**"),
    clearScreen: false
  };
  return rollupOptions;
}

export async function getRollupConfigs() {
  const roots = getPackageRoots();
  const configs = await Promise.all(roots.map(getRollupConfig));
  const result = {};
  for (let i = 0; i < packages.length; i++) {
    result[packages[i]] = configs[i];
  }
  return result;
}

export function clearDist(name) {
  const dist = path.resolve(__dirname, "../packages", name, "dist");
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true, force: true });
  }
}
