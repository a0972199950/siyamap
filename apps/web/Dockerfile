FROM node:20-alpine
# 1. 依然需要的 Lambda Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.3 /lambda-adapter /opt/extensions/lambda-adapter

# 這裡改成你喜歡的名字
WORKDIR /workdir

# 2. 複製 standalone 內容到 /workdir
COPY .next/standalone ./

# 3. 複製靜態檔案到嵌套的路徑中
# 讓路徑變成 /workdir/apps/web/public
COPY public ./apps/web/public
COPY .next/static ./apps/web/.next/static

# 環境變數設定
ENV NODE_ENV=production
ENV PORT=3000
ENV AWS_LWA_PORT=3000

# 4. 啟動腳本的路徑也會跟著 WORKDIR 變動
# 最終執行的完整路徑是 /workdir/apps/web/server.js
CMD ["node", "apps/web/server.js"]
