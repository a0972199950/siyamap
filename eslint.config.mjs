import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import simpleImportSort from "eslint-plugin-simple-import-sort"
import storybook from "eslint-plugin-storybook"
import tseslint from 'typescript-eslint' // 引入這個來獲取插件定義

const eslintConfig = defineConfig([
  {
    // 效能優化：最優先忽略
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "next-env.d.ts",
    ]
  },

  ...nextVitals,
  ...nextTs,

  {
    // 註冊所有需要的插件
    plugins: {
      "simple-import-sort": simpleImportSort,
      "@typescript-eslint": tseslint.plugin, // 顯式註冊插件名稱
    },
    rules: {
      semi: ['warn', 'never'],
      '@/semi': ['warn', 'never'],

      // 允許使用 any 類型
      '@typescript-eslint/no-explicit-any': 'off',

      "simple-import-sort/imports": [
        "warn",
        {
          "groups": [
            ["^\\u0000"],
            ["^@?\\w"],
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"]
          ]
        }
      ],
      "simple-import-sort/exports": "warn",
    },
  },

  ...storybook.configs["flat/recommended"]
])

export default eslintConfig
