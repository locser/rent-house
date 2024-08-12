export enum UPLOAD_FILE_STATUS_ENUM {
  NEW = 0,
  DELETED = 1,
  RECEIVED = 2,
  CANCEL = 3,
  COMPLETED = 4,
}

export const UPLOAD_FILE_TYPE_STRING: { [key: number]: string } = {
  0: "NEW",
  1: "DELETED",
  2: "RECEIVED",
  3: "CANCEL",
  4: "COMPLETED",
};
