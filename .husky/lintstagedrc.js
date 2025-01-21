/*
 * @Descripttion:
 * @version:
 * @Author: yyy
 * @Date: 2023-08-29 14:19:32
 * @LastEditors: yyy
 * @LastEditTime: 2024-03-09 15:33:20
 */
module.exports = {
  // "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "{!(package)*.json}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  // "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  // "*.{vue,css,scss,postcss,less}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
};
