#!/usr/bin/env node

//命令行工具
const { Command } = require('commander');
// 导入包数据
const packdata = require("./../package.json")
const program = new Command();
const init = require('./happain-init.js')
const desc = require('./happain-desc.js')


/* 
  查看版本信息
  happain -v
*/
program.version(packdata.version, '-v --version')


/* 
  初始化项目
  happain init *
*/
program.command('init [projectName]')
  .description("初始化项目模板")
  // 添加一个选项
  .option('-f --force', '如果存在输入的项目目录，强制删除项目目录')
  .action((projectName, cmd) => {
    init(projectName, cmd.force)
  })

/* 
  打印工具说明
*/
program.command('desc')
  .description("工具说明")
  // 添加一个选项
  .action(() => {
    desc()
  })


// 加载命令
program.parse(process.argv)