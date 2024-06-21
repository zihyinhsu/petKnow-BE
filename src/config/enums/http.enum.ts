enum HttpStatusCode {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

enum HttpMessage {
  RetrieveSuccess = '查詢成功',
  RetrieveFailure = '查詢失敗',
  CreateSuccess = '新增成功',
  CreateFailure = '新增失敗',
  ModifySuccess = '更新成功',
  ModifyFailure = '更新失敗',
  DeleteSuccess = '刪除成功',
  DeleteFailure = '刪除失敗',
  NotFound = '查詢不到資料',
  BadRequest = '錯誤的請求',
  Success = '成功',
  Failure = '失敗',
  SystemError = '系統發生錯誤，請聯繫系統管理員',
  NoPage = '無此路由頁面',
  InvalidCredentials = '無效的憑證',
}

export { HttpStatusCode, HttpMessage };
