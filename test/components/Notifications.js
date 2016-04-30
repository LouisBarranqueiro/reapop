import {expect} from 'chai';
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {defaultValues, className, transition, Notifications} from '../../src/components/Notifications/Notifications';
import {className as notificationClassName} from '../../src/components/Notification/Notification';
/**
 * Return a rendered Notifications component
 * @param props
 * @returns {*}
 */
function setup(props) {
  const defaultProps = {
    notifications: []
  };
  props = Object.assign({}, defaultProps, props);

  let node = window.document.createElement('div');
  return TestUtils.renderIntoDocument(
    <Notifications {...props}/>, node
  );
}
describe('Notification', () => {
  it('should render component', () => {
    const component = setup();
    expect(component).to.exist;
  });

  it('should render component with its default props', () => {
    const component = setup();
    expect(component.props.defaultValues).to.equal(defaultValues);
    expect(component.props.className).to.equal(className);
    expect(component.props.transition).to.equal(transition);
    expect(component.props.notificationClassName).to.equal(notificationClassName);
  });
});