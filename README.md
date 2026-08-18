# 🎭 OrangeHRM Playwright Test Automation Framework

Dự án kiểm thử tự động (Automation Testing) dành cho ứng dụng **OrangeHRM** sử dụng **Playwright**, **TypeScript** và thiết kế theo mô hình **Page Object Model (POM)** kết hợp các thành phần giao diện tái sử dụng (Custom UI Components).

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Framework**: [Playwright](https://playwright.dev/) (`^1.62.0`)
- **Ngôn ngữ**: TypeScript (`^7.0.2`)
- **Mô hình kiến trúc**: Page Object Model (POM) & Component-based Architecture
- **Quản lý Fixtures**: **Playwright Custom Fixtures** (`test.extend`) giúp tự động khởi tạo các Page Objects (`loginFixture`, `employeeFixture`) và quản lý dependency injection cho test cases.
- **Quản lý cấu hình & môi trường**: `dotenv`, Path Aliases (`@framework/...`)
- **Báo cáo (Reporter)**: Playwright HTML Reporter

---

## 📁 Cấu Trúc Thư Mục (Project Structure)

```text
Learning-auto/
├── .env                       # Biến môi trường (URL, Credentials, ...)
├── global-setup.ts            # Cấu hình khởi tạo toàn cục (nếu có)
├── playwright.config.ts       # File cấu hình chính của Playwright (Projects, Browsers, Reporter)
├── tsconfig.json              # Cấu hình TypeScript & Path Aliases (@framework/*)
├── package.json               # Khai báo dependencies & scripts
├── tests/
│   ├── features/              # Nơi chứa các kịch bản kiểm thử (Test Specs)
│   │   ├── auth/              # Test cases Đăng nhập (positive, validation)
│   │   └── employee/          # Test cases quản lý nhân viên (PIM)
│   │       ├── create/        # Kịch bản tạo mới nhân viên (Add Employee)
│   │       └── update/        # Kịch bản cập nhật nhân viên (Edit/Update Employee)
│   ├── framework/             # Thư viện core framework tái sử dụng
│   │   ├── components/        # Các Custom Component tái sử dụng (TextField, Dropdown, Radio, Switch, Checkbox, Table)
│   │   ├── constants/         # Các hằng số dùng chung
│   │   ├── fixtures/          # Custom Test Fixtures
│   │   └── pages/             # Các lớp Page Objects (LoginPage, EmployeeListPage, CreateEmployeePage, UpdateEmployeePage, ...)
│   └── test-data/             # Dữ liệu phục vụ kiểm thử (JSON, mock data)
└── utils/                     # Các hàm tiện ích bổ trợ (Helpers, Data Generators)
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Test (Getting Started)

### 1. Cài đặt Dependencies

Yêu cầu Node.js (phiên bản 18 trở lên). Chạy lệnh sau để cài đặt các thư viện phụ thuộc:

```bash
npm install
```

Cài đặt trình duyệt cho Playwright:

```bash
npx playwright install
```

### 2. Cấu hình biến môi trường (`.env`)

Tạo hoặc chỉnh sửa file `.env` tại thư mục gốc với các thông tin cấu hình:

```env
URL=<your_url>
ADMIN_USERNAME=<your_username>
ADMIN_PASSWORD=<your_password>
HEADLESS=true
```

### 3. Thực thi Kiểm Thử (Run Tests)

- **Chạy toàn bộ kịch bản test:**
  ```bash
  npx playwright test
  ```

- **Chạy luồng Auth (Đăng nhập):**
  ```bash
  npx playwright test --project=auth
  ```

- **Chạy luồng E2E:**
  ```bash
  npx playwright test --project=e2e
  ```

- **Chạy trên giao diện trực quan (UI Mode):**
  ```bash
  npx playwright test --ui
  ```

- **Xem báo cáo sau khi chạy xong:**
  ```bash
  npx playwright show-report
  ```

---

## 🎯 Quy Chuẩn Locators Tối Ưu Cho OrangeHRM (PIM Module)

Framework áp dụng các locator chuẩn Playwright dựa trên `getByRole`, `getByPlaceholder` và định vị theo container `.oxd-input-group`:

### 🔑 1. Login Page
- **Username**: `page.getByPlaceholder('Username')`
- **Password**: `page.getByPlaceholder('Password')`
- **Login Button**: `page.getByRole('button', { name: 'Login' })`

### 👤 2. Create Employee (`PIM -> Add Employee`)
- **First Name**: `page.getByPlaceholder('First Name')`
- **Middle Name**: `page.getByPlaceholder('Middle Name')`
- **Last Name**: `page.getByPlaceholder('Last Name')`
- **Employee ID**: `page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' })`
- **Toggle Create Login**: `page.locator('.oxd-switch-input')`
- **Username**: `page.locator('.oxd-input-group').filter({ hasText: 'Username' })`
- **Status Enabled/Disabled**: `page.getByRole('radio', { name: 'Enabled' })` / `page.getByRole('radio', { name: 'Disabled' })`
- **Password**: `page.locator('.oxd-input-group').filter({ hasText: /^Password/ })`
- **Confirm Password**: `page.locator('.oxd-input-group').filter({ hasText: 'Confirm Password' })`
- **Save Button**: `page.getByRole('button', { name: 'Save' })`

### ✏️ 3. Update Employee (`PIM -> Personal Details`)
- **Other ID**: `page.locator('.oxd-input-group').filter({ hasText: 'Other Id' })`
- **Driver's License Number**: `page.locator('.oxd-input-group').filter({ hasText: "Driver's License Number" })`
- **License Expiry Date**: `page.locator('.oxd-input-group').filter({ hasText: 'License Expiry Date' })`
- **Nationality Dropdown**: `page.locator('.oxd-input-group').filter({ hasText: 'Nationality' }).locator('.oxd-select-text')`
- **Marital Status Dropdown**: `page.locator('.oxd-input-group').filter({ hasText: 'Marital Status' }).locator('.oxd-select-text')`
- **Gender Radio (Male/Female)**: `page.getByRole('radio', { name: 'Male' })` / `page.getByRole('radio', { name: 'Female' })`
- **Tabs Navigation**: `page.getByRole('link', { name: '<Tab Name>' })` (ví dụ: `Personal Details`, `Contact Details`, `Job`, `Salary`, ...)

---

## ⚙️ Custom Fixtures Trong Dự Án

Dự án mở rộng `test` của Playwright (`base.extend`) để tự động hóa việc khởi tạo Page Objects và xử lý tiền điều kiện:

1. **`loginFixture.ts`**: Tự động khởi tạo `LoginPage` và truy cập trang đăng nhập trước khi kịch bản chạy (`await login.open()`).
2. **`employeeFixture.ts`**: Cung cấp tập hợp các Page Objects (`createEmployee`, `employeeList`, `updateEmployee`, `login`) thông qua fixture `pages`, giúp viết test clean và cô đọng hơn mà không cần `new Page()` thủ công trong từng file `.spec.ts`.

---

## 🤝 Đóng Góp & Bảo Trì Code

- Tuân thủ nguyên tắc **Page Object Model**: Mọi tương tác UI của trang phải khai báo trong `tests/framework/pages/`.
- Sử dụng **Custom Fixtures** (`tests/framework/fixtures/`) để inject Page Objects vào test cases.
- Tái sử dụng các thành phần UI dùng chung trong `tests/framework/components/`.
- Đảm bảo kịch bản kiểm thử độc lập và có thể chạy song song (Parallel execution).