為了讓 cloudfront 正確分辨 /_static, /public 應該導去 S3，其餘全部路徑都導去 lambda，
請把所有公開文件都放在第二層 public 資料夾中，並且使用 <img src="/public/xxx.jpg" />
