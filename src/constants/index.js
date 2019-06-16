export const DEFAULT_STATUS: string = 'default'
export const INFO_STATUS: string = 'info'
export const SUCCESS_STATUS: string = 'success'
export const WARNING_STATUS: string = 'warning'
export const ERROR_STATUS: string = 'error'

type StatusType = {
  [$key: string]: string
}

type PositionsTypes = {
  [$key: string]: string
}

export const STATUS: StatusType = {
  default: DEFAULT_STATUS,
  info: INFO_STATUS,
  success: SUCCESS_STATUS,
  warning: WARNING_STATUS,
  error: ERROR_STATUS
}

export const TOP: string = 't'
export const TOP_CENTER: string = 'tc'
export const TOP_LEFT_POSITION: string = 'tl'
export const TOP_RIGHT_POSITION: string = 'tr'
export const BOTTOM: string = 'b'
export const BOTTOM_CENTER: string = 'bc'
export const BOTTOM_LEFT_POSITION: string = 'bl'
export const BOTTOM_RIGHT_POSITION: string = 'br'

export const POSITIONS: PositionsTypes = {
  top: TOP,
  topCenter: TOP_CENTER,
  topLeft: TOP_LEFT_POSITION,
  topRight: TOP_RIGHT_POSITION,
  bottom: BOTTOM,
  bottomCenter: BOTTOM_CENTER,
  bottomLeft: BOTTOM_LEFT_POSITION,
  bottomRight: BOTTOM_RIGHT_POSITION
}

// default value for notifications
export const DEFAULT_NOTIFICATION: Object = {
  status: DEFAULT_STATUS,
  position: TOP_RIGHT_POSITION,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false,
  closeButton: false
}
