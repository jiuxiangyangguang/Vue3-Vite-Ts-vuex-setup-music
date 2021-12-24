module.exports = {
  // 此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: 'module'
    // 允许解析JSX
  },
  plugins: ['vue', 'prettier', '@typescript-eslint'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 允许大写字母开头的函数不作为构造函数，vite.config.ts 中使用的 Components AntDesignVueResolver 都属于大写字母开头不作为构造函数
    'new-cap': ['error', { capIsNew: false }],
    'no-ternary': 'on' // 禁止使用三目运算符
  },
  // defineProps defineEmits defineExpose withDefaults 是全局使用的，不需要从 vue 中引入
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  // 配置别名 @
  settings: {
    'import/resolver': {
      typescript: {
        project: `${__dirname}/tsconfig.json`
      }
    }
  }
}
