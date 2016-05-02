import STATUS from '../src/constants';
import faker from 'faker';

export function genNotification() {
  const numb = faker.random.number();
  return {
    id: new Date().getTime(),
    title: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
    status: faker.random.objectElement(STATUS),
    dismissible: faker.random.boolean(),
    dismissAfter: faker.random.number(),
    onAdd: function() {
      return numb;
    },
    onRemove: function() {
      return numb * 2;
    }
  };
}
