npm init -y
npm i -D typescript @types/node
npx tsc -v
npx tsc --init
npm install express @types/express
npm install cors dotenv
npm install bcrypt @types/bcrypt
npm install prisma @prisma/client
npm install --save-dev tsc-alias ts-node-dev tsconfig-paths
npx prisma init --datasource-provider mongodb
npx prisma db push