// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //空行最多不能超过100行
    "no-multiple-empty-lines": [0, {"max": 100}],
    "no-trailing-spaces": 1,//一行结束后面不要有空格
    "comma-dangle": [0, "never"],//对象字面量项尾不能有逗号
    "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    "space-in-parens": [0, "never"],//小括号里面要不要有空格
    "space-infix-ops": 0,//中缀操作符周围要不要有空格
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "arrow-spacing": 0,//=>的前/后括号
    "comma-spacing": 0,//逗号前后的空格
    "indent": ["error", 2]
  }
}
