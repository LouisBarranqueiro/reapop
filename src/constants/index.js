export const DEFAULT_STATUS = 'default';
export const INFO_STATUS = 'info';
export const SUCCESS_STATUS = 'success';
export const WARNING_STATUS = 'warning';
export const ERROR_STATUS = 'error';

export const STATUS = {
  default: DEFAULT_STATUS,
  info: INFO_STATUS,
  success: SUCCESS_STATUS,
  warning: WARNING_STATUS,
  error: ERROR_STATUS
};

export const TOP = 't';
export const TOP_CENTER = 'tc';
export const TOP_LEFT_POSITION = 'tl';
export const TOP_RIGHT_POSITION = 'tr';
export const BOTTOM = 'b';
export const BOTTOM_CENTER = 'bc';
export const BOTTOM_LEFT_POSITION = 'bl';
export const BOTTOM_RIGHT_POSITION = 'br';

export const POSITIONS = {
  top: TOP,
  topCenter: TOP_CENTER,
  topLeft: TOP_LEFT_POSITION,
  topRight: TOP_RIGHT_POSITION,
  bottom: BOTTOM,
  bottomCenter: BOTTOM_CENTER,
  bottomLeft: BOTTOM_LEFT_POSITION,
  bottomRight: BOTTOM_RIGHT_POSITION
};

// default value for notifications
export const DEFAULT_NOTIFICATION = {
  status: DEFAULT_STATUS,
  position: TOP_RIGHT_POSITION,
  dismissible: true,
  dismissAfter: 5000,
  allowHTML: false,
  closeButton: false
};
