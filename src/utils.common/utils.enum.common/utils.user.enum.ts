export enum USER_STATUS {
  NOT_ACTIVE = 0, // Tạm ngưng (không dùng)
  BLOCK = 1, // Đã bị Admin khoá
  ACTIVE = 2, // Đang hoạt động
  REMOVE = 3, // User xoá tài khoản
  REQUEST_REMOVE = 4, // User yêu cầu xoá tài khoản
  USER_BLOCK = 5, // User khoá tài khoản
}

export enum Role {
  BUYER = 1,
  SENDER = 2,
  ADMIN = 3,
}
