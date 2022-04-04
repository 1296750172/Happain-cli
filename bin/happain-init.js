/* 
  初始化项目的命令
*/

const inquirer = require('inquirer')
const logger = require('./logging.js')
const fs = require('fs-extra')
const path = require('path')
const download = require('download-git-repo');


const temDict = [
  { value: 0, name: 'happain-vue3-webpack-base', url: "https://gitee.com/xiaozeguai/happain-vue3-webpack-base.git" },
  { value: 1, name: 'happain-vue3-vite-base', url: "https://gitee.com/xiaozeguai/happain-vue3-vite-base.git" },
  { value: 2, name: 'happain-electron-base', url: "https://gitee.com/xiaozeguai/happain-eletron-base.git" },
  { value: 3, name: 'happain-scrapy-base', url: "https://gitee.com/xiaozeguai/happain-scrapy-cli.git" }
]



// 初始化项目模块
const start = async (projectname, options) => {
  // 初始化信息
  initInfo()

  const questions = {
    type: 'list',
    name: 'template',
    message: '选择脚手架模板:',
    default: 0,
    choices: temDict
  }
  try {
    // 初始化模板
    const { template } = await inquirer.prompt(questions)
    // 判断项目名是否合法
    projectname = await initProjectName(projectname)
    // 判断是否覆盖
    await overDir(projectname, options)
    // 拉取模板
    pullTemplate(projectname, template)

  } catch (err) {
    logger.exit("初始化模板失败")
  }


}


const end = () => {
  logger.warn("--------------------------------------")
  logger.warn("一切都是徒劳无功")
  logger.warn("It doesn't even matter")
}

// 拉取对应的脚手架项目
const pullTemplate = (projectname, templateId) => {
  const url = temDict[templateId].url

  download(`direct:${url}`, projectname, { clone: true }, function (err) {
    if (err) {
      logger.exit(err)
    } else {
      logger.infoGreen("创建项目成功")
      // 结束语
      end()
    }
  })
}


// 覆盖目录
const overDir = async (name, option) => {
  // 获取当前目录
  const cwd = process.cwd()
  // 获取目标文件夹地址
  const targetDir = path.join(cwd, name)
  // 是否已存在文件夹
  if (fs.existsSync(targetDir)) {
    // 是否强制创建(覆盖)
    if (option) {
      await fs.remove(targetDir)
    } else {
      // 异步获取结果
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '目录已存在，请选择一项进行操作：',
          choices: [
            {
              name: '覆盖',
              value: 'overwrite'
            }, {
              name: '取消',
              value: false
            }
          ],
        }
      ])
      // 根据结果做出相应处理
      if (!action) {
        logger.exit("目录已存在，无法创建")
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        logger.info("删除目录中，请稍等")
        await fs.remove(targetDir)
      }
    }
  }
}



// 初始化项目名
const initProjectName = async (projectname) => {

  if (projectname == undefined) {
    const questions = {
      type: 'input',
      name: 'projectname',
      message: '请输入你的项目名:',
      default: 'happain'
    }
    // 获取你输入的项目名
    try {
      const { projectname } = await inquirer.prompt(questions)
      return projectname
    } catch (e) {
      logger.exit("初始化项目名失败")
    }
  }
  return projectname
}



// 初始化信息
const initInfo = () => {
  logger.warn("你知道的， 那些快乐的时光呢， 全浪费了")
  logger.warn("you know that, the happy day, total waste ")
  logger.warn("--------------------------")
}

// 初始化命令
const init = (projectname, options) => {
  // 初始化
  start(projectname, options)
}

module.exports = init