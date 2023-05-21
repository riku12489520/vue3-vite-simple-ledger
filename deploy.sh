# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f origin master:gh-pages

cd -