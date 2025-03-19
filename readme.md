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
docker --version
docker build -t ims-api .
docker build --no-cache -t ims-api .
docker run -p 3000:3000 ims-api
docker login
docker tag ims-api:latest username/ims-api:latest
docker push username/ims-api:latest
docker search username/ims-api
docker pull username/ims-api:latest
docker ps
docker run -d -p <host_port>:<container_port> --name <container_name> <image_name>:<tag>
docker logs <container_name>
docker start <container_name>
docker stop <container_name>
docker rm <container_name>
