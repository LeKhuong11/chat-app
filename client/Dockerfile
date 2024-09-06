# Sử dụng node:20 làm hình ảnh cơ sở
FROM node:20

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt tất cả các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Biên dịch ứng dụng React (nếu cần)
RUN npm run build

# Expose cổng 3000
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]