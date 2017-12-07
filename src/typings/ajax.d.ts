declare namespace Ajax {

  // axios 返回数据
  export interface AxiosResponse {
    data: AjaxResponse
  }

  // 请求返回数据接口
  export interface AjaxResponse {
    /**
     * 状态码
     * @type { number }
     */
    code: number;

    /**
     * 数据
     * @type { any }
     */
    result: any;

    /**
     * 消息
     * @type { string }
     */
    message: string
  }
}