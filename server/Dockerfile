# Build stage
FROM node:20 as build

WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt tất cả các phụ thuộc, bao gồm cả devDependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc trong container
COPY . .

# Biên dịch mã TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine as production

WORKDIR /app

# Sao chép package.json và package-lock.json từ giai đoạn build
COPY package*.json ./

# Cài đặt các phụ thuộc sản phẩm
RUN npm ci --only=production

# Sao chép thư mục build từ giai đoạn build
COPY --from=build /app/build ./build

EXPOSE 4000

# Chạy ứng dụng Node.js
CMD ["node", "build/index.js"]
