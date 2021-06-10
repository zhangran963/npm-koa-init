const inquirer = require('inquirer');

function init() {
	const middleware = [
		{
			key: 'router',
			name: 'koaRouter',
		},
		{
			key: 'static',
			name: 'koaStatic',
		},
		{
			key: 'views',
			name: 'koaViews',
		},
		{
			key: 'body',
			name: 'koaBody',
		},
	];

	return inquirer
		.prompt([
			{
				type: 'input',
				name: 'packageName',
				message: '项目名称: ',
				validate(input) {
					const done = this.async();
					let regexp = /^[a-zA-Z\-]+$/g;
					if (regexp.test(input)) {
						done(null, true);
					} else {
						done(`请输入 '大小写字母'或'-' 组成的字符串`);
					}
				},
			},

			{
				type: 'input',
				name: 'port',
				message: '端口号: ',
				default: 8000,
				validate(input) {
					const done = this.async();
					input = +input;
					const min = 3000,
						max = 65535;
					if (Number.isInteger(input)) {
						if (input >= min && input <= max) {
							done(null, true);
						}
					}
					done(`请输入 ${min}~${max} 区间的数字`);
				},
			},

			{
				type: 'checkbox',
				name: 'middleware',
				message: '请选择中间件: ',
				choices: middleware.map(({ name }) => ({ name })),
			},
		])
		.then((answer) => {
			/* 整理 middleware 数据 */
			let middlewareConfig = answer.middleware;
			answer.middleware = middleware.reduce((total, item) => {
				total[item.key] = middlewareConfig.includes(item.name);
				return total;
			}, {});
			return answer;
		})
		.catch((error) => {
			if (error.isTtyError) {
				// Prompt couldn't be rendered in the current environment
			} else {
				// Something else went wrong
			}
		});
}

module.exports = {
	init,
};
