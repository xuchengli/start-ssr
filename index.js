const Koa = require('koa');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});
const createApp = require('./app');
const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = err.message;
    }
});
app.use(async ctx => {
    const vueApp = createApp({ url: ctx.path });
    const context = {
        title: 'Vue SSR测试'
    };
    const html = await renderer.renderToString(vueApp, context);
    ctx.body = html;
});
app.listen(8080, () => {
    console.log('Server started, listening on port 8080!');
});
