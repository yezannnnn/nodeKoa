const path = require('path')
const fse = require('fs-extra')
const fs = require('fs')
const {Template} = require('../model/index');
const copyFilePath = '/Users/yuhao/Desktop/yezannnn/h5editor-vue/src/components/BaseComponents/';
const {
    configMixin,
    config,
    componentRenderToStr,
    cssRenderToObj,
    objToCss,
    generateMixed
} = require('../middleware/jsTemplate.js')

class TemplateService {
    // 查询
    async getAccountById(id) {
        return await Template.findOne({
            where: {
                id: id,
            },
        });
    };

    // 新增数据库
    async createTemplate(params) {
        return Template.create(params);
    }

    // 更新数据库
    async updateTemplate(id, params) {
        const item = await this.getAccountById(id)
        if (item) {
            return Template.findByPk(id).then((data) => {
                data.update(params)
            })
        } else {
            throw new Error('the data with id is not exist!');
        }
    }


    // 创建目录
    async mkdirFiles(name, path = './') {
        let fileName = name
        // 检查文件是否已存在
        while (fs.existsSync(`${path}${fileName}`)) {
            fileName += " 副本"
        }
        fse.mkdirsSync(`${path}${fileName}`);
        return `${path}${fileName}/`;
    }

    // 创建组件
    async copyLoadComponents(nameList, path) {
        nameList.forEach((i) => {
            fse.copySync(`${copyFilePath}/${i}/${i}.vue`, `${path}/components/BaseComponents/${i}/${i}.vue`);
        })
    }

    // 创建 config和minix
    async mkdirConfig(path) {
        const configMixin_tmp = configMixin;
        const config_tmp = config;

        fs.writeFileSync(`${path}/mixin/configMixin.js`, configMixin_tmp);
        fs.writeFileSync(`${path}/config.js`, config_tmp);
    }

    // 初始化 index文件
    async mkdirIndex(params, path) {
        let components = []
        params.pageData.sourceData.forEach((i) => {
            components.includes(i.name) ? false : components.push(i.name);
        })

        let pageData = params.pageData.page;
        const pageSource = params.pageData.sourceData;

        const pageCss = cssRenderToObj(pageData)
        console.log('pageCss', pageCss)
        const {components_tmp, components_style} = componentRenderToStr(pageSource)
        const pageCssStr = objToCss(params.pageData.page)
        console.log('pageCssStr', pageCssStr)

        const pageCssId = generateMixed(7);
        const vue_temp = `
            <template>
                <div class='page-${pageCssId}'>
                    ${components_tmp}
                </div>  
            </template>
        `
        // 需要加载的component
        let needLoadComponents = ''
        components.forEach((i) => {
            needLoadComponents += `import ${i} from './components/BaseComponents/${i}/${i}.vue'\n`;
        })

        const js_temp = `
            <script>
            import configMixin from './mixin/configMixin'
            ${needLoadComponents}
               
            const urlType = {
              NATIVE: 'native',
              LOCAL: 'local',
              HREF: 'href',
              FULLPATH: 'fullpath',
              NULL: 'null',
            }
            
            export default {
                name: "${params.title}Page",
                mixins: [configMixin],
                components: {
                    ${components.join(",")}
                },
                data() {
                    return {
                         act: null,
                         pageSource: ${JSON.stringify(pageSource)},
                    }
                },
                methods: {
                     async getActDetails() {
                        this.$indicator.open();
                        let res = await this.$get(\`api/getActDetails/\$\{this.config.actList.actId\}\`);
                        this.$indicator.close();
                        if (res.status === 200) {
                            this.act = res.payload;
                        } else {
                            this.$toast(res.error);
                        }
                    },
                    goTo({url, type, successCallBack, failCallBack}) {
                      if (type === 'native') {
                        window.c_plugins.merchantBridge.goToNative(
                            function () {
                              successCallBack && successCallBack()
                            },
                            function (err) {
                              failCallBack && failCallBack()
                              alert(err.message || err || '网络错误，请检查网络连接');
                            },
                            {page: url}
                        );
                      } else if (type === 'href') {
                        window.location.href = localtion.origin + url
                      } else if (type === 'fullpath') {
                        window.location.href = url
                      } else if (type === 'local') {
                        let path = '/' + this.$store.state.merchantAppid + '/merchant' + url
                        this.$router.push(path);
                      } else if (type === 'null') {
                        this.$toast(url)
                      }
                    },
                },
                created() {
                    document.title = '${pageData.title}'
                },
                mounted() {
                    this.getActDetails()
                }
            }
            </script>
        `
        let index_style = `
            <style lang='scss' scoped>
                .page-${pageCssId}{
                    ${pageCssStr}
                }
        `
        for (let key in components_style) {
            index_style += `
                .shape-${key}{
                    ${components_style[key]}
                }\n
            `
        }
        index_style += '</style>'
        const index_vue = vue_temp + '\n\n' + js_temp + '\n\n' + index_style
        fs.writeFileSync(`${path}index.vue`, index_vue);
    }

}

module.exports = new TemplateService();
