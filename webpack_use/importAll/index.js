// import 一个文件夹下的所有 svg
let importAll = (requireContext) =>
  requireContext.keys().forEach(requireContext);

try {
  importAll(require.context("./Icons/", true, /\.svg$/));
} catch (error) {
  console.log("error", error);
}

// import 某个文件夹下的 所有图片
const modules = {};
function importAll(r) {
  r.keys().forEach((key) => {
    const filename = key.replace(/\.\/|\.png|\.svg/g, "");
    modules[filename] = r(key);
  });
}
importAll(
  require.context("../../assets/image/materialManage", true, /\.png|\.svg/)
);
