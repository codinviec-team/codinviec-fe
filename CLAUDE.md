# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**CodinViec** là nền tảng tuyển dụng IT Việt Nam, kết nối ứng viên với nhà tuyển dụng trong lĩnh vực công nghệ. Frontend được xây dựng bằng Next.js App Router với TypeScript.

Backend chạy tại `localhost:8080` (Spring Boot). Biến môi trường cần thiết:
- `NEXT_PUBLIC_API_BASE_URL` — URL API backend
- `NEXT_PUBLIC_BASE_URL` — URL frontend

## Commands

```bash
npm run dev          # Dev server với Turbopack (khuyên dùng)
npm run dev:webpack  # Dev server với Webpack (fallback)
npm run build        # Production build
npm run start        # Chạy production build
npm run lint         # Kiểm tra linting với ESLint
```

Không có test framework được cấu hình trong dự án này.

## Architecture

### Route Groups (Next.js App Router)

Ba nhóm layout riêng biệt trong `src/app/`:
- `(public)/` — Trang công khai: home, jobs, companies, blog, login/register, profile
- `(hr)/hr/` — Dashboard nhà tuyển dụng: đăng việc, ứng viên, analytics, cài đặt
- `(admin)/admin/` — Quản trị: users, categories, jobs

Mỗi route group có layout riêng với navigation và guards khác nhau.

### Provider Stack (src/app/layout.tsx)

Thứ tự wrap từ ngoài vào trong:
```
ReduxProvider → AuthProvider → MyQueryClientProvider → ConfigProvider (Ant Design)
```

- `AuthProvider` — kiểm tra cookie `access_token` khi mount, dispatch `checkAuth` nếu tồn tại
- `Handler` — lắng nghe CustomEvent `api-error` và `logout` từ axios interceptor
- `LoadingScreen` — hiển thị trong khi `auth.loading === true`

### State Management

**Redux Toolkit** (`src/store/`) — chỉ dùng cho auth state:
- `isAuthenticated`, `user: IUser | null`, `loading: boolean`
- Thunks: `login`, `register`, `checkAuth`, `changeIsFindJob`
- Sau login thành công: lưu `access_token` vào cookie → gọi `checkAuth` → lấy user profile

**React Query** (`@tanstack/react-query`) — dùng cho mọi server state còn lại (jobs, companies, categories...). Xem pattern trong `src/hooks/`.

### API Layer

**`src/interceptor/api.ts`** (client-side):
- Attach Bearer token từ cookie vào mọi request
- Khi nhận 401: tự động refresh token qua `refreshApi` (instance riêng, không qua interceptor)
- Dùng queue (`failedQueue`) để tránh nhiều request refresh đồng thời
- Refresh thất bại → dispatch CustomEvent `logout` → `Handler` xử lý redirect
- Các lỗi HTTP khác → dispatch CustomEvent `api-error` → `Handler` hiển thị thông báo

**`src/interceptor/api-server.ts`** (server-side):
- Instance đơn giản, dùng biến môi trường `API_URL` (không có `NEXT_PUBLIC_`)
- Dùng trong Server Components để fetch dữ liệu phía server

**`src/services/`** — 18 service files, mỗi domain một file. Pattern thống nhất:
```typescript
const res = await api.get<IBaseResponse<T>>("/endpoint");
if (!res.data.data) throw new Error("...");
return res.data.data;
```

### Types

`IBaseResponse<T>` là wrapper cho mọi API response:
```typescript
{ code?: number; message?: string; data?: T }
```

Pagination dùng `BasePageResponse<T>` trong `src/types/BasePageResponse.ts`.

### Notifications & Alerts

Hai utility trong `src/utils/notification.ts`:
- `toast.*` — react-toastify (non-blocking): `toast.success`, `toast.error`, `toast.warning`, `toast.info`
- `alert.*` — SweetAlert2 (blocking/confirm): `alert.error`, `alert.warning`

### Styling

- **Tailwind CSS v4** với custom `max-*` breakpoints: `max-sm`, `max-md`, `max-lg`, `max-xl`, `max-2xl`
- **Ant Design v5** với primary color `#5a3fa6`, font Lexend, borderRadius 12
- Hai hệ thống song song — dùng Tailwind cho layout/spacing, Ant Design cho các component phức tạp (Table, Form, Modal)
- Không có dark mode (`darkMode: false`)

### Images

Ảnh từ backend phục vụ tại `http://localhost:8080/file/**`. Khi dùng `next/image`, hostname này đã được whitelist trong `next.config.ts`. Cũng cho phép Google avatars và `placehold.co`.
