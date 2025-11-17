/**基础提示类，封装成功、失败的提示 */
export class resBuild {

  /**
   * 构建 成功/失败 返回data对象
   */
  static data(data: any = {}, message = '操作成功', code: number = 200) {
    return {
      code,
      message,
      data: data,
    };
  }

  static list(rows: any[], total: number, message: string = '操作成功', code: number = 200) {
    return {
      code,
      message,
      data: {
        rows: rows || [],
        total: total || 0
      }
    }
  }


  /**
   * 构建 成功/失败 返回msg对象
   */
  static success(message = '操作成功', code: number = 200) {
    return {
      code,
      message,
    };
  }

  static error(message = '操作失败', code: number = 500) {
    return {
      code,
      message,
    };
  }

}
