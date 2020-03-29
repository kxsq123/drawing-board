/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 * 按照“modules_模块名.js”来命名文件；
 * 命名规则不变无需修改此文件；
 */

const files = require.context('.', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === './index.js') return;
  modules[key.replace(/(\.\/|\.js|modules_)/g, '')] = files(key).default;
});

export default modules;
