const {defineConfig} = require('eslint/config')
const neostandard = require('neostandard')
const typescriptEslint = require('typescript-eslint')
const eslintPluginReact = require('eslint-plugin-react')
const eslintPluginReactHooks = require('eslint-plugin-react-hooks')
const eslintPluginPrettierConfig = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
    ...neostandard(),
    eslintPluginPrettierConfig,
    typescriptEslint.configs.recommended,
    eslintPluginReact.configs.flat.recommended,
    eslintPluginReactHooks.configs['recommended-latest'],
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            ecmaVersion: 6,
            sourceType: 'module',
            parser: typescriptEslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                    legacyDecorators: true,
                },
            },
        },
    },
    {
        ignores: [
            'eslint.config.js',
            'jest.config.js',
            'node_modules/',
            '.idea',
            '.travis',
            'build/',
            'coverage/',
            'demo/dist/',
            'docs',
            'dist',
        ],
    },
])
