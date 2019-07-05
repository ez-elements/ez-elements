module.exports = Object.assign(require('../jest.config'), {
    "testEnvironment": "jest-environment-jsdom-fifteen",
    "setupFiles": [
        "<rootDir>/node_modules/document-register-element/build/document-register-element.node.js"
    ]
});