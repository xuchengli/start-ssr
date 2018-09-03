const Koa = require('koa');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = err.message;
    }
});
app.use(async ctx => {
    const vueApp = new Vue({
        data: {
            url: ctx.path
        },
        template: `<div>当前访问的地址是：{{ url }}</div>`
    });
    const html = await renderer.renderToString(vueApp);
    ctx.body = html;
});
app.listen(8080, () => {
    console.log('Server started, listening on port 8080!');
});
