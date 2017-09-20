# vue-admin

vue-blog 管理部分，主要功能基本完成。

FRONT [vue-blog](https://github.com/jkchao/vue-blog)

SERVICE [node-koa](https://github.com/jkchao/node-koa)

---

## Vue + Vuex + Vue-router + Axios + element（自定义主题）。

![](https://github.com/jkchao/vue-admin/raw/master/images/1.png)

![](https://github.com/jkchao/vue-admin/raw/master/images/3.png)

![](https://github.com/jkchao/vue-admin/raw/master/images/4.png)

![](https://github.com/jkchao/vue-admin/raw/master/images/2.png)

### 用户验证部分
	
- [axios](https://github.com/jkchao/vue-admin/blob/master/src/api/axios.js) 拦截。

![](https://github.com/jkchao/vue-admin/raw/master/images/5.png)

- [router](https://github.com/jkchao/vue-admin/blob/master/src/router/index.js) 拦截。

![](https://github.com/jkchao/vue-admin/raw/master/images/6.png)


### 上传

使用 element-ui 上传组件配合七牛，https://github.com/jkchao/vue-admin/blob/master/src/pages/set/index.vue#L103 

### markdown

  [vue-simplemde]()

## TODO

- 面板数据统计

- Google 统计服务

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm run dev

# build for production
npm run build

```
