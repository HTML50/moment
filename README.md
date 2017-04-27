# 此刻

**记录此刻的感受，享受写作的乐趣**



## 示例页面

测试站点，里面有书写格式https://k2pt.github.io/moment

[此刻](https://html50.github.io/moment)为我的个人中文非技术博客，写点感性的东西。



## 工作原理

基于github issues的静态博客，专注于内容。

（无需数据库，文章内容发布在仓库的issue中，前端页面存在仓库中，依托于github pages和github issues)

欢迎fork，简单配置，即可使用。



## 使用方法

fork到自己的仓库，修改config.js中的参数`仓库名、背景音乐地址、博客名字`，保存即可。

注意打开设置中的issues，方可进行写作。



**写作注意的格式：**

第一行是自己上传的图片，第二行要`# 标题`，余下的是写作内容。具体可见这个测试站https://k2pt.github.io/moment



**其他注意：**

由于为了节省加载时间，我仅加载了“此刻”两字的字体CSS，等待动画的字体我使用的是https://www.youziku.com/的[金梅毛笔张楷书](https://www.youziku.com/fontdetail/index/46017)，如果你需要修改博客名，需要修改index.html中title下方的CSS内容。

`<link href='https://cdn.webfont.youziku.com/webfonts/nomal/23529/46017/5901a2fcf629d81470a2fcb2.css' rel='stylesheet' type='text/css' />`

这里要自己去youziku.com注册一个账号，选择需要定制的文字，将上面的内容改为自己的CSS。



## 进度


- [x] 前端框架
- [x] 整站逻辑
- [x] 基于github api对issues内容的读取
- [x] 首次访问loading动画
- [ ] 细节优化（第二次访问页面加载、更多文章加载、自然滚动）
- [ ] 数据使用localStorage存储
- [ ] 自定义主题




## contribution

欢迎大家提供指导性意见。



