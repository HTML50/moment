# 此刻

**记录此刻的感受，享受写作的乐趣**


## 示例页面

测试站点，里面有书写格式https://k2pt.github.io/moment


## 工作原理

基于github issues的博客，简单配置，即可使用，只专注于内容。


## 使用方法

fork到自己的仓库，修改config.js中的参数`仓库名、背景音乐地址、博客名字`，保存即可。

注意打开设置中的issues，方可进行写作。



**写作格式：**

第一行是图片 和 背景音乐地址`<!-- //地址 >`，第二行要`# 标题`，余下的是写作内容。具体可见这个测试站https://k2pt.github.io/moment


**其他注意：**

由于为了节省加载时间，等待动画我仅加载了“此刻”两字的字体CSS，并且生成为img文件。字体我使用的是https://www.youziku.com/ 的[金梅毛笔张楷书](https://www.youziku.com/fontdetail/index/46017)，如果你需要修改，需要自行生成img文件，修改css文件首行的引用。

或者在`index.html`加入类似字体css的引用
`<link href='https://cdn.webfont.youziku.com/webfonts/nomal/23529/46017/5901a2fcf629d81470a2fcb2.css' rel='stylesheet' type='text/css' />`

这里要自己去youziku.com注册一个账号，选择需要定制的文字，将上面的内容改为自己的CSS。

## 进度

- [x] 前端框架
- [x] 整站逻辑
- [x] 基于github api对issues内容的读取
- [x] 首次访问loading动画
- [ ] 细节优化（第二次访问页面加载、更多文章加载、自然滚动）
- [ ] 数据使用localStorage存储
- [ ] ~~自定义主题（自定义主题只能重写html与js，需求不同，结构不同，重用性太低）~~




## contribution

欢迎大家提供改进意见。



