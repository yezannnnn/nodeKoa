const cssNeed = ['fontSize', 'height', 'width', 'top', 'left', 'right', 'bottom', 'borderWidth', 'borderRadius', 'padding', 'margin'];
// rem 根节点的大小
const ROOTSIZE = 50;

const configMixin =
    `import { getConfig } from '../config'

const configMixin = {
    data() {
        return {
            config: {}
        }
    },
    created() {
        this.config = getConfig(this.$env)
    }
}
export default configMixin;`

const config =
    `export function getConfig(env) {
    const actList = {  
		actId: env === 'prod' ? '1' : '1',          
    }
    const config = {
        actList: actList,
    }
    return config
}`

// 判断css属性是否加单位 转字符串
const cssRenderToStr = function(object, isRem = true) {
    let str = ''
    const obj = JSON.parse(JSON.stringify(object))
    for (key in obj) {
        if (cssNeed.includes(key)) {
        	obj[key] = isRem ? toRem(obj[key]) : obj[key];
            obj[key] += isRem ? 'rem' : 'px';
        }
        if(key === 'background') {
            obj[key] =  obj[key].indexOf('url(') == 0 ? obj[key] : `url(${obj[key]})`
        }
        str += `${key}:${obj[key]};`
    }
    console.log(str)
    return str;
}

// 判断css属性是否加单位 转对象
const cssRenderToObj = function(object,isRem = true) {
    let obj_r = {}
    const obj = JSON.parse(JSON.stringify(object))
    for (key in obj) {
        if (cssNeed.includes(key)) {
        	obj[key] = isRem ? toRem(obj[key]) : obj[key];
            obj[key] += isRem ? 'rem' : 'px';
        }
        if(key === 'background') {
            obj[key] =  obj[key].indexOf('url(') == 0 ? obj[key] : `url(${obj[key]})`
        }
    }
    obj_r = {...obj}
    return obj_r;
}

// 根据数组渲染组件字符串
const componentRenderToStr = function(arr) {
    let components_tmp = '';
    let allOnj = {}
    arr.forEach((i, ind) => {
        let block = ''
        // 外层shape渲染
        let shapeStyle = {
            height: i.height,
            width: i.width,
            top: i.top,
            left: i.left,
            transform: `rotate(${i.rotate}deg)`,
            position: i.position,
        }

        let id = generateMixed(6)
        let text_style = objToCss(cssRenderToObj(shapeStyle))
        allOnj[id] = text_style

        let event = '';
        if(i.event.click.link != ''){
            event = `@click='goTo({ "${i.event.click.link}" , "${i.event.click.linkType}" })'`
        }

        block += `<div class='shape-${id}' ${event}>\n`;
        switch (i.name) {
            case 'TextView':
                block += `\t<TextView :isEdit='true' :text='pageSource[${ind}].props.text' :font='pageSource[${ind}].props.font' />\n`;
                break;
            case 'ImageView':
                block += `\t<ImageView :isEdit='true' :src='pageSource[${ind}].props.src' />\n`;
                break;
            case 'Rectangle':
                block += `\t<Rectangle :text='pageSource[${ind}].props.text' :looks='pageSource[${ind}].props.looks' :font='pageSource[${ind}].props.font' />\n`;
                break;
        }
        block += '</div>\n';
        components_tmp += block;
    })
    let data = { components_tmp :components_tmp, components_style: allOnj }
    return data;
}

// css 单位转化 rem
function toRem(value){
	return Math.floor(parseFloat(value) / ROOTSIZE * 100) / 100;
}

function objToCss(obj,isRem = true){
    // 判断css属性是否加单位 转字符串
    var returnStr = ''
    var newObj = {}
    for (key in obj) {
        if (cssNeed.includes(key)) {
            obj[key] = isRem ? toRem(obj[key]) : obj[key];
            obj[key] += isRem ? 'rem' : 'px';
        }
        if(key === 'background') {
            obj[key] =  obj[key].indexOf('url(') == 0 ? obj[key] : `url(${obj[key]})`
        }
        let stringArray = key.split('') // 将字符串分割成相应的字符串数组
        let newField = key
        stringArray.forEach(t => {
            if (/[A-Z]/.test(t)) {
                // 遍历分割之后的字符串组，将找到的大写字母替换成其他字符串，将替换后的字符串赋值给另外一个新的string 变量
                newField = newField.replace(t, `-${t.toLowerCase()}`)
            }
        })
        console.log('obj[key]',obj[key])
        returnStr += `${newField}: ${obj[key]};\n`
    }
    return returnStr
}

function generateMixed(n) {
    var chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var res = "";
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 36);
        res += chars[id];
    }
    return res;
}

module.exports = {
    configMixin,
    config,
    cssRenderToStr,
    componentRenderToStr,
    cssRenderToObj,
    toRem,
    objToCss,
    generateMixed
}
