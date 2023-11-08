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
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    // 指定ESlint的解析器
    parser: '@typescript-eslint/parser',
    // 允许使用ES语法
    ecmaVersion: 2020,
    // 允许使用import
    sourceType: 'module'
  },
  plugins: ['vue', 'unused-imports', '@typescript-eslint', 'prettier'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    // 允许大写字母开头的函数不作为构造函数，vite.config.ts 中使用的 Components AntDesignVueResolver 都属于大写字母开头不作为构造函数
    'new-cap': ['error', { capIsNew: false }],
    'vue/valid-v-for': 'off', // 关闭v-for需要绑定key
    'vue/require-v-for-key': 'off', // 关闭v-for需要绑定key
    'vue/attributes-order': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/prop-name-casing': 'off',
    'vue/component-definition-name-casing': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-parsing-error': 'off',
    'vue/valid-template-root': 'off',
    'unused-imports/no-unused-imports': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used' }] // 不能有声明后未被使用的变量或参数
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
