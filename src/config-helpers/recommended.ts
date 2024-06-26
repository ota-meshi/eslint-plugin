import type { ESLint, Linter } from "eslint";

export const recommendedRules = {
  // warns
  "no-warning-comments": "warn",
  "no-console": "warn",
  "no-alert": "warn",
  //
  "no-extra-parens": "error",
  "accessor-pairs": "error",
  "consistent-return": "error",
  eqeqeq: ["error", "always", { null: "ignore" }],
  "no-eval": "error",
  "no-extend-native": "error",
  "no-extra-bind": "error",
  "no-extra-label": "error",
  "no-multi-str": "error",
  "no-new-wrappers": "error",
  "no-octal-escape": "error",
  "no-sequences": "error",
  "no-useless-call": "error",
  "no-useless-concat": "error",
  "no-new-object": "error",
  "no-tabs": "error",
  "prefer-template": "error",
  "object-shorthand": "error",

  "array-callback-return": "error",
  camelcase: "error",
  curly: "error",
  "default-case": "error",
  "default-param-last": "error",
  "dot-notation": "error",
  "for-direction": "error",
  "func-style": ["error", "declaration"],
  "getter-return": "error",
  // "init-declarations": "error",
  "linebreak-style": ["error", "unix"],
  "lines-between-class-members": "error",
  "max-statements-per-line": ["error", { max: 1 }],
  "multiline-comment-style": ["error", "separate-lines"],
  "new-cap": "error",
  "no-array-constructor": "error",
  "no-async-promise-executor": "error",
  "no-caller": "error",
  "no-case-declarations": "error",
  "no-compare-neg-zero": "error",
  "no-cond-assign": "error",
  "no-constant-condition": "error",
  "no-control-regex": "error",
  "no-debugger": "error",
  "no-delete-var": "error",
  "no-div-regex": "error",
  "no-dupe-args": "error",
  "no-dupe-keys": "error",
  "no-duplicate-case": "error",
  "no-else-return": "error",
  "no-empty": "error",
  "no-empty-character-class": "error",
  "no-empty-function": "error",
  "no-empty-pattern": "error",
  "no-ex-assign": "error",
  "no-extra-boolean-cast": "error",
  "no-fallthrough": "error",
  "no-func-assign": "error",
  "no-global-assign": "error",
  "no-implicit-coercion": "error",
  "no-implicit-globals": "error",
  "no-implied-eval": "error",
  "no-import-assign": "error",
  "no-inner-declarations": ["error", "functions"],
  "no-invalid-regexp": "error",
  "no-invalid-this": "error",
  "no-irregular-whitespace": [
    "error",
    {
      skipComments: false,
      skipRegExps: false,
      skipStrings: false,
      skipTemplates: false,
    },
  ],
  "no-iterator": "error",
  "no-label-var": "error",
  "no-lone-blocks": "error",
  "no-lonely-if": "error",
  "no-loop-func": "error",
  "no-misleading-character-class": "error",
  "no-mixed-operators": [
    "error",
    {
      groups: [
        ["&", "|", "^", "~", "<<", ">>", ">>>"],
        ["&&", "||"],
      ],
    },
  ],
  "no-new": "error",
  "no-new-require": "error",
  "no-obj-calls": "error",
  "no-octal": "error",
  "no-param-reassign": ["error", { props: false }],
  "no-process-env": "error",
  "no-process-exit": "error",
  "no-prototype-builtins": "error",
  "no-redeclare": ["error", { builtinGlobals: true }],
  "no-regex-spaces": "error",
  "no-restricted-properties": [
    "error",
    { property: "__count__" },
    { property: "__noSuchMethod__" },
    { property: "__parent__" },
    { property: "__defineGetter__" },
    { property: "__defineSetter__" },
    { property: "__lookupGetter__" },
    { property: "__lookupSetter__" },
  ],
  "no-return-assign": "error",
  "no-return-await": "error",
  "no-script-url": "error",
  "no-self-assign": ["error", { props: true }],
  "no-self-compare": "error",
  "no-shadow": ["error", { builtinGlobals: true }],
  "no-shadow-restricted-names": "error",
  "no-sparse-arrays": "error",
  "no-throw-literal": "error",
  "no-undef": ["error", { typeof: true }],
  "no-unexpected-multiline": "error",
  "no-unmodified-loop-condition": "error",
  "no-unneeded-ternary": "error",
  "no-unreachable": "error",
  "no-unsafe-finally": "error",
  "no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],
  "no-unused-expressions": "error",
  "no-unused-labels": "error",
  "no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_(?:[^_].*)?$",
      caughtErrors: "all",
      vars: "all",
      varsIgnorePattern: "^_(?:[^_].*)?$",
    },
  ],
  "no-use-before-define": ["error", "nofunc"],
  "no-useless-catch": "error",
  "no-useless-escape": "error",
  "no-useless-return": "error",
  "no-void": ["error", { allowAsStatement: true }],
  "no-with": "error",
  "no-var": "error",
  "one-var": [
    "error",
    {
      initialized: "never",
      uninitialized: "always",
    },
  ],
  "padding-line-between-statements": [
    "error",
    { blankLine: "always", next: "*", prev: "directive" },
    { blankLine: "always", next: "function", prev: "*" },
    { blankLine: "always", next: "*", prev: "function" },
  ],
  "prefer-promise-reject-errors": "error",
  "prefer-regex-literals": "error",
  quotes: ["error", "double", { avoidEscape: true }],
  radix: "error",
  "require-atomic-updates": "error",
  "require-await": "error",
  "spaced-comment": [
    "error",
    "always",
    {
      block: {
        balanced: true,
        markers: [
          "eslint",
          "eslint-env",
          "eslint-disable",
          "eslint-enable",
          "exported",
          "globals",
          "istanbul",
        ],
      },
      line: {
        exceptions: ["-", "="],
        markers: [
          "eslint-disable-line",
          "eslint-disable-next-line",
          "istanbul",
          "TODO:",
          "FIXME:",
        ],
      },
    },
  ],
  strict: ["error", "global"],
  "use-isnan": [
    "error",
    { enforceForIndexOf: true, enforceForSwitchCase: true },
  ],
  "valid-typeof": ["error", { requireStringLiterals: true }],
  yoda: ["error", "never", { exceptRange: true }],

  // Enabled rules as warnings.
  complexity: ["warn", { max: 16 }],
  "max-nested-callbacks": ["warn", { max: 4 }],
  "max-params": ["warn", { max: 8 }],
} as Linter.RulesRecord;
export const recommendedTestFiles = [
  "test/**/*.js",
  "tests/**/*.js",
  "test/**/*.cjs",
  "tests/**/*.cjs",
  "test/**/*.mjs",
  "tests/**/*.mjs",
  "test/**/*.ts",
  "tests/**/*.ts",
  "test/**/*.mts",
  "tests/**/*.mts",
  "test/**/*.cts",
  "tests/**/*.cts",
];
export const recommendedTestRules = {
  "jsdoc/require-jsdoc": "off",
  "no-console": "off",
} as Linter.RulesRecord;

export const recommendedTestGlobals = {
  after: "readonly",
  afterEach: "readonly",
  before: "readonly",
  beforeEach: "readonly",
  describe: "readonly",
  it: "readonly",
  mocha: "readonly",
  xdescribe: "readonly",
  xit: "readonly",
} as ESLint.Environment["globals"];
