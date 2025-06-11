# Node.js REST API Server

Đây là một REST API server được xây dựng bằng Node.js với các tính năng chính sau:

## Tính năng

- Hỗ trợ cả HTTP và HTTPS
- Hệ thống routing linh hoạt với middleware
- Xử lý các HTTP methods: GET, POST, PUT, DELETE
- Hỗ trợ URL parameters
- Xác thực người dùng (Authentication)
- API versioning (v1)
- Xử lý response chuẩn hóa
- Hỗ trợ redirect 301

## Cấu trúc dự án

```
.
├── app.js              # File khởi tạo server
├── router.js           # Router handler
├── auth.js            # Xử lý authentication
├── body-parser.js     # Parse request body
├── response-handler.js # Xử lý response
├── redirect-node.js   # Xử lý redirect
├── routes/            # Chứa các route handlers
│   ├── users.js      # API endpoints cho users
│   └── products.js   # API endpoints cho products
├── cert/             # Chứa SSL certificates
└── data/             # Thư mục chứa dữ liệu
```

## API Endpoints

### Users API (/api/v1/users)
- GET /api/v1/users - Lấy danh sách users
- GET /api/v1/users/:id - Lấy thông tin user theo ID
- POST /api/v1/users - Tạo user mới
- PUT /api/v1/users/:id - Cập nhật thông tin user
- DELETE /api/v1/users/:id - Xóa user

### Products API (/api/v1/products)
- GET /api/v1/products - Lấy danh sách products
- GET /api/v1/products/:id - Lấy thông tin product theo ID
- POST /api/v1/products - Tạo product mới
- PUT /api/v1/products/:id - Cập nhật thông tin product
- DELETE /api/v1/products/:id - Xóa product

## Cài đặt và Chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy server:
```bash
node app.js
```

Server sẽ chạy trên:
- HTTP: http://localhost:3000
- HTTPS: https://localhost:3443

## Công nghệ sử dụng

- Node.js
- Native HTTP/HTTPS modules
- File System (fs) module
- Path module

## Lưu ý

- Server sử dụng SSL certificates trong thư mục `cert/`
- Cần cấu hình đúng SSL certificates để chạy HTTPS server
- API yêu cầu authentication cho tất cả các endpoints 