const TemplateService = require("../service/template");
const md5 = require("md5-node");
const jwt = require("jsonwebtoken");
const { verToken } = require("../middleware/jwt");
const fs = require("fs");
const fse = require("fs-extra");
// parameter
const templateParam = require("./parameter/template");

class TemplateController {
  async makeTemplate(ctx) {
    // 校验器
    ctx.verifyParams(templateParam.makeTemplate);
    const jwtInfo = await verToken(ctx.request.header.authorization);
    const params = ctx.request.body;

    // 入库
    params.userId = jwtInfo._id;
    // 判断id 新增还是更新
    params.id
      ? await TemplateService.updateTemplate(params.id, params)
      : await TemplateService.createTemplate(params);

    // 创建模板文件方法
    let components = [];
    params.pageData.sourceData.forEach((i) => {
      components.includes(i.name) ? false : components.push(i.name);
    });
    // 创建文件
    let newStamp = new Date().valueOf();
    const path = await TemplateService.mkdirFiles(
      params.title + `${newStamp}` || "newFils" + `${newStamp}`
    );
    await TemplateService.copyLoadComponents(components, path);
    // 创建config and mixin
    await TemplateService.mkdirFiles("mixin", path);
    await TemplateService.mkdirConfig(path);
    await TemplateService.mkdirIndex(params, path);

    // 压缩
    const archiver = require("archiver");
    let archive = archiver("zip", {
      zlib: { level: 8 }, // 设置压缩级别
    });

    console.log("archive", archive);
    const output = fs.createWriteStream(`${newStamp}template.zip`);
    output.on("close", function () {
      fse.remove(`${newStamp}template.zip`);
      let nPath = path.slice(0, path.length - 1);
      fse.remove(nPath);
    });

    await archive.pipe(output);
    await archive.directory(path);
    archive.finalize();

    ctx.file(archive, "template.zip");
  }

  async getPageInfo(ctx) {
    // 校验器
    ctx.verifyParams(templateParam.getPageInfo);
    const id = ctx.request.query.id;

    // 查询
    const row = await TemplateService.getAccountById(id);
    row ? ctx.success(row.pageData) : ctx.fail(201, "未查询到数据！");
  }
}

module.exports = new TemplateController();
