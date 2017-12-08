declare namespace StoreState {

  // 公用
  interface Common {
    /** 唯一标识 */
    readonly _id?: string;

    /** 发布日期 */
    readonly create_at?: Date;

    /** 修改日期 */
    readonly update_at?: Date;

    /** 删除中... */
    deleteing?: boolean;
  }

  // 登录
  export interface Login {
    /** 用户名 */
    username: string;

    /** 密码 */
    password: string;
  }

  // 用户数据
  export interface User {
    /** 唯一标识 */
    readonly _id: string;

    /** 名称 */
    name: string;

    /** 用户名 */
    username: string;

    /** 密码 */
    password?: string;

    /** 老密码 */
    oldPassword: string;

    /** 新密码 */
    newPassword: string;

    /** 用户签名 */
    slogan: string;

    /** 头像 */
    gravatar: string;
  }

  // 网站信息
  export interface Option {
    /** 唯一标识 */
    readonly _id: string;

    /** 网站标题 */
    title: string;

    /** 副标题 */
    sub_title: string;

    /** 关键字 */
    keyword: string;

    /** 描述 */
    descript: string;

    /** 地址 */
    url: string;

    /** email */
    email: string;

    /** 备案号 */
    icp: string
  }

  // 标签
  export interface Tag extends Common {
    /** 名称 */
    name: string;

    /** 描述 */
    descript: string;

    /** 排序 */
    sort?: number;

    /** 文章数量 */
    count?: number
  }


  // 文章


  // 英雄版（留言墙）

  // 评论
}