installed_react_version=$(node -p "require('./package.json').devDependencies.react")
installed_react_dom_version=$(node -p "require('./package.json').devDependencies.react")
installed_react_redux_version=$(node -p "require('./package.json').devDependencies['react-redux']")

npm i react@$installed_react_version react-dom@$installed_react_dom_version redux@4 react-redux@$installed_react_redux_version && npm t &&
npm i react@15 react-dom@15 react-addons-test-utils@15 redux@4 react-redux@5.0.6 && npm t &&
npm i react@0.14 react-dom@0.14 react-addons-test-utils@0.14 redux@3 react-redux@4 && npm t &&
npm i react@0.14 react-dom@0.14 react-addons-test-utils@0.14 redux@2 react-redux@3.1 && npm t
