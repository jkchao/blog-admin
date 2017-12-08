declare namespace StoreState {

  // 公用
  interface Common {
    readonly _id: string; // 唯一标志
    readonly create_at: Date; // 发布日期
    readonly update_at?: Date; // 修改日期
    deleing: boolean // 删除中...
  }

  // 登录
  export interface Login {
    username: string;
    password: string;
  }

  // 用户数据
  export interface User {
    readonly _id: string;
    name: string;
    username: string;
    password?: string;
    oldPassword: string;
    newPassword: string;
    slogan: string;
    gravatar: string;
  }

  // 网站信息
  export interface Option {
    readonly _id: string;
    title: string;
    sub_title: string;
    keyword: string;
    descript: string;
    url: string;
    email: string;
    icp: string
  }

  // 标签
  export interface Tag extends Common {
    name: string;
    descript: string;
    sort: number;
  }


  // 文章


  // 英雄版（留言墙）

  // 评论
}