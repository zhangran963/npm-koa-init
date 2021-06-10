#!/usr/bin/env node

const fs = require('fs');
const execa = require('execa');

const { getRootPath } = require('./utils/index');
const createIndexTemplate = require('./createIndexTemplate');
const createPackageTemplate = require('./createPackageTemplate');

/* 1. 获取用户的输入 */
const input = require('./input/index');

input.init().then((config) => {
	let packagePath = getRootPath(config.packageName);
	/* 如存在同名文件夹, 清除 */
	if (fs.existsSync(packagePath)) {
		fs.rmdirSync(packagePath, { recursive: true });
	}

	/* 创建项目文件夹 */
	fs.mkdirSync(packagePath);
	/* 创建index.js */
	fs.writeFileSync(`${packagePath}/index.js`, createIndexTemplate(config));
	/* 创建package.json */
	fs.writeFileSync(`${packagePath}/package.json`, createPackageTemplate(config));

	/* 安装依赖 并 启动 */
	const execaConfig = {
		cwd: packagePath,
		stdio: [2, 2, 2] /* 直接显示"子进程"的输出;  */,
		/* 文档: https://nodejs.org/api/child_process.html#child_process_options_stdio */
	};
	execa('yarn', execaConfig).then((a) => {
		return execa('npm', ['run', 'dev'], execaConfig);
	});
});
