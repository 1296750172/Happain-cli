## 请用全局命令安装

## 发布流程

- 先查看仓库源是什么 一般是淘宝源 npm config get registry
- https://registry.npm.taobao.org/
- 切换淘宝源 npm config set registry http://registry.npmjs.org/
- 先修改 package.json 里面的 version 版本号
- 执行**npm publish --registry http://registry.npmjs.org/**命令

## **npm i -g happain-cli**

### 自用的生成基础模板项目的脚手架

- happain-electron-base
  - electron 简单的项目模板 还未完善
- happain-scrapy-base
  - scrapy 框架的脚手架，集成了 setting 信息和目录结构
