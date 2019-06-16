export type Theme = {
  smallScreenMin: number,
  smallScreenPosition: 't' | 'b',
  notificationsSystem: {
    className: string,
  },
  notificationsContainer: {
    className: {
      main: string,
      position: (string) => string
    },
    transition: {
      enterTimeout: number,
      leaveTimeout: number,
      name: {
        enter: string,
        leave: string
      }
    }
  },
  notification: {
    className: {
      main: string,
      wrapper: string,
      meta: string,
      title: string,
      message: string,
      imageContainer: string,
      image: string,
      icon: string,
      status: (string) => string,
      dismissible: string,
      closeButtonContainer: string,
      closeButton: string,
      buttons: (?number) => string,
      button: string,
      buttonText: string
    }
  }
}
