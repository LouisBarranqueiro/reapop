import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

export function mockStore(reducers) {
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  return mockStore(reducers);
}
