零碎项目

### 1. 推箱子小游戏

[点此处](https://yueminhu.github.io/misc-projects/static/index.html)

```javascript
// 关卡懒得设计了...
```

### 2. low-poly 背景动图

[demo](https://yueminhu.github.io/misc-projects/static/canvas-low-poly.html)

### 项目脚手架说明

附带 static server+自动刷新, 将需要 serve 的文件放入`./static`文件夹即可, 然后在 html(或其引用的 js)中加入如下 js 代码:

```javascript
const connection = new WebSocket("ws://localhost:8888");
connection.addEventListener("open", e => {
  console.log("dev ws connected!");
});
connection.addEventListener("message", e => {
  if (event.data === "file changed") {
    setTimeout(location.reload.bind(location), 500);
  }
});
```

或者直接复制`./static/template.html`开始 coding!...

之后`npm run start`, 访问`localhost:8888/`+相应文件即可.
当`./static`文件系统上的文件更改时, 浏览器端会自动刷新页面.

### 生产环境打包

```sh
./node_modules/.bin/webpack --config ./webpack.config.production.js --env.dirname=${dirname}
```

***注意, 此时所有资源(图片, js文件)的路径均指向与`index.html`同文件夹!