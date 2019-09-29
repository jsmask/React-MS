const { override, fixBabelImports, addLessLoader,addWebpackAlias,addDecoratorsLegacy } = require('customize-cra');
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#753a88' },
  }),
  addWebpackAlias({
    "@":resolve("src"),
    "@assets":resolve("src/assets"),
    "@request":resolve("src/request"),
    "@components":resolve("src/components"),
    "@store":resolve("src/store"),
    "@utils":resolve("src/utils"),
    "@less":resolve("src/assets/less"),
    "@css":resolve("src/assets/css"),
    "@images":resolve("src/assets/images"),
    "@pages":resolve("src/pages")
  }),
  addDecoratorsLegacy()
);