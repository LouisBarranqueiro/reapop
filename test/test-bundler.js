import {configure} from 'enzyme'

const reactVersion = require('react').version
let Adapter = null

if (reactVersion.startsWith('16')) {
  Adapter = require('enzyme-adapter-react-16')
}
else if (reactVersion.startsWith('15')) {
  Adapter = require('enzyme-adapter-react-15.4')
}
else if (reactVersion.startsWith('0.14')) {
  Adapter = require('enzyme-adapter-react-14')
}

configure({adapter: new Adapter()})
