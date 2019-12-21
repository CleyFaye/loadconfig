module.exports = {
  "parser": "@typescript-eslint/parser",
  "env": {
    "es6": true,
    "node": true
  },
  "overrides": [
    {
      "files": ["src/test/**/*.ts"],
      "env": {
        "mocha": true
      }
    },
  ],
  "ignorePatterns": [
    "Gruntfile.js"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
