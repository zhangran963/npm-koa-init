const fs = require('fs');
const ejs = require('ejs');
const prettier = require('prettier');

module.exports = function (config) {
	/* 模板 */
	const templateCode = fs.readFileSync(`${__dirname}/template/package.ejs`);
	/* 填充逻辑 */
	const code = ejs.render(templateCode.toString(), {
		...config,
	});
  /* 格式化 */
  return prettier.format(code, { parser: 'json-stringify' });
};
