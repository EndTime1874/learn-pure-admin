module.exports = {
  // "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "{!(package)*.json}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  // "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{vue,css,scss,postcss,less}": ["stylelint --fix", "prettier --write"],
  "*.md": ["prettier --write"]
};
