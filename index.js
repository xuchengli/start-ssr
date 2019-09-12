const Koa = require('koa');
const serve = require('koa-static');
const mount = require('koa-mount');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = require('fs').readFileSync('./index.template.html', 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
});
const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.body = err.message;
    }
});
app.use(mount('/dist', serve('dist')));
app.use(async ctx => {
    const context = {
      title: 'Vue SSR测试',
      url: ctx.path,
    };
    const html = await renderer.renderToString(context);
    ctx.body = html;
});
app.listen(8080, () => {
    console.log('Server started, listening on port 8080!');
});
