const Vue = require('vue');

module.exports = function createApp (context) {
    return new Vue({
        data: {
            url: context.url
        },
        template: `<div>当前访问的地址是：{{ url }}</div>`
    });
}
