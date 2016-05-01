import React from 'react';
import TestUtils, {createRenderer} from 'react-addons-test-utils';

/**
 * Shallow render component
 * @param {Object} Component A React component
 * @param {Object} props Properties passed to the Component
 * @returns {*}
 */
export function shallowRender(Component, props = {}) {
  const defaultProps = {
    notifications: []
  };
  props = Object.assign({}, defaultProps, props);
  let renderer = createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}

/**
 * Render component in a detached DOM
 * @param {Object} Component A React component
 * @param {Object} props Properties passed to the Component
 * @returns {*}
 */
export function render(Component, props = {}) {
  const defaultProps = {
    notifications: []
  };
  props = Object.assign({}, defaultProps, props);
  let node = window.document.createElement('div');
  return TestUtils.renderIntoDocument(
    <Component {...props}/>, node
  );
}
