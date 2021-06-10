const path = require('path');

/* 创建的目录 */
const cwdPath = process.cwd();

/**
 * 相对根目录, 获取绝对路径
 * @param {string[]} realPath 
 * @returns 
 */
// function getRootPath(...realPathArr){
//   console.debug('* realPathArr', realPathArr)
//   if(realPathArr.length){
//     return path.resolve(cwdPath, ...realPathArr);
//   }
// }
const getRootPath = path.resolve.bind(null, cwdPath)


module.exports = {
  getRootPath
}