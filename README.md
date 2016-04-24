# react-redux-notification
React &amp; Redux notifications system

## API documentation

### Notifications component

| Properties         | Type   | Description |
| ------------------ | :----: | ----------- |
| notificationConfig | Object | Default value for a notification. check [notificationConfig attributes](#notificationConfig) |

#### Details of properties

##### notificationConfig

| Attribute   | Default value | Description |
| ----------- | :-----------: | ----------- |
| type        | null          | Type of message : info, success, warning, error |
| expireAfter | 5000          | Time before the notification disappear (ms). 0: infinite |
| dismissible | true          | Default value for a notification. Check the list |

### Actions

#### Add a notification 

##### Syntax

``` js
pushNotification(notification);
```

##### Parameters

| Parameter   | Default value | Description |
| ----------- | :-----------: | ----------- |
| message     | null          | Message displayed |
| type        | null          | Type of message : info, success, warning, error |
| expireAfter | 5000          | Time before the notification disappear (ms). 0: infinite |
| dismissible | true          | Default value for a notification. Check the list |

##### Example

``` js
pushNotification({
  message: 'Hey buddy, I\'m a notification and you can't dismiss me!',
  type: 'info',
  expireAfter: 10000,
  dismissible: false
});
```
