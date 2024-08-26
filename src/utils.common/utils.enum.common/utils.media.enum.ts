export enum MEDIA_TYPE {
  IMAGE = 0,
  VIDEO = 1,
  AUDIO = 2,
  FILE = 3,
  LINK = 4,
}
export enum MEDIA_FORMAT {
  ORIGINAL = 0,
  MEDIUM = 1,
  THUMBNAIL = 2,
}
export enum DETECT_MEDIA_TYPE {
  POST = 0,
  COMMENT = 1,
}
export enum DETECT_MEDIA_STATUS {
  UNSENT = 0,
  SENT = 1,
  RECEIVED = 2,
}
export enum MEDIA_PATH {
  IMAGE_PATH = '/images',
  VIDEO_PATH = '/videos',
  AUDIO_PATH = '/audios',
  FILE_PATH = '/files',
}
export enum MEDIA_URL_TYPE {
  KEEP = '/keep',
  TEMPORARY = '/temporary',
}
export enum MEDIA_STORE_TYPE {
  CHAT_ALOLINE = 0,
  GROUP = 1,
  FAN_PAGE = 2,
  USER = 3,
  CHAT_TECHRES = 4,
}
export enum MEDIA_STORE_CONVERSATION_TYPE {
  ALOLINE = 0,
  TECHRES = 1,
}
