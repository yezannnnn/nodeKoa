const template = {
    makeTemplate: {
        pageData: { type: 'object', required: true },
        title: { type: 'string', required: true },
    },
    getPageInfo: {
        id: { type:'string', required: true }
    }
}

module.exports = template
