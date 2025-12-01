"use client";
import { useAppSelector } from "@/hooks/hooks";

export default function AdminPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Trang quản trị {user != null ? user.lastName : ""}</h1>
    </div>
  );
}
