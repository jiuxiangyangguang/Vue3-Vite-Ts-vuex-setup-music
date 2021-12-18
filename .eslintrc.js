module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    // 'plugin:vue/vue3-recommended',
    'airbnb-base'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier', '@typescript-eslint'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 允许大写字母开头的函数不作为构造函数，vite.config.ts 中使用的 Components AntDesignVueResolver 都属于大写字母开头不作为构造函数
    'new-cap': ['error', { capIsNew: false }]
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
