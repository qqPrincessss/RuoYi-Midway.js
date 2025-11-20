// .lintstagedrc.js
export default {
  "*.{js,ts,mjs,cjs,json,tsx,css,less,scss,vue,html,md}": ["cspell --no-must-find-files"],
  "*.{js,ts,vue,md}": ["prettier --write", "eslint"]
};
