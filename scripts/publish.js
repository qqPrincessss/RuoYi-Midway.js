import { execSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function main() {
  const pkgName = "@xierfloat-monorepo/utils";
  const pkgPath = join(process.cwd(), "packages", "utils", "package.json");
  const rl = createInterface({ input, output });

  try {
    const pkgJson = JSON.parse(await readFile(pkgPath, "utf-8"));
    const currentVersion = pkgJson.version || "0.0.0";

    console.log(`当前包: ${pkgName}`);
    console.log(`当前版本: ${currentVersion}`);

    const bumpTypeInput = await rl.question(
      "选择版本类型 (patch(主要)/minor(次要)/major(主要)/custom(自定义)) [patch]: "
    );
    const type = (bumpTypeInput || "patch").trim().toLowerCase();

    let newVersion = currentVersion;
    if (type === "custom") {
      const custom = await rl.question("输入自定义版本 (例如 1.2.3): ");
      const candidate = custom.trim();
      if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(candidate)) {
        console.error("版本格式不合法，需形如 1.2.3 或包含预发布后缀。");
        rl.close();
        process.exit(1);
      }
      newVersion = candidate;
    } else {
      newVersion = bumpSemver(currentVersion, type);
      if (!newVersion) {
        console.error("未知版本类型，请使用 patch/minor/major/custom。");
        rl.close();
        process.exit(1);
      }
    }

    const tagInput = await rl.question("选择发布 tag (latest(最新)/next(未来)/beta(测试)) [latest]: ");
    const finalTag = (tagInput || "latest").trim();

    console.log(`将版本从 ${currentVersion} 更新为 ${newVersion}，tag=${finalTag}`);
    const confirm = await rl.question("确认发布？(y/N): ");
    if (!/^y(es)?$/i.test(confirm.trim())) {
      console.log("已取消发布。");
      rl.close();
      return;
    }

    // 更新版本号
    pkgJson.version = newVersion;
    await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2) + "\n", "utf-8");
    console.log("开始发布...");
    execSync(`pnpm -r --filter ${pkgName} publish --no-git-checks --tag ${finalTag}`, { stdio: "inherit" });
    console.log("发布完成。");
  } catch (err) {
    console.error("发布失败:", err?.message || err);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

function bumpSemver(v, type) {
  const m = v.match(/^(\d+)\.(\d+)\.(\d+)(.*)?$/);
  if (!m) return null;
  let major = parseInt(m[1], 10);
  let minor = parseInt(m[2], 10);
  let patch = parseInt(m[3], 10);
  // 忽略现有的预发布后缀，直接按 semver 规则递增
  switch (type) {
    case "patch":
      patch += 1;
      break;
    case "minor":
      minor += 1;
      patch = 0;
      break;
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;
    default:
      return null;
  }
  return `${major}.${minor}.${patch}`;
}

main();
