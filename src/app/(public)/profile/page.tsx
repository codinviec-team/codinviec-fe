import { Metadata } from "next";
import ProfileClients from "./components/ProfileClients";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân | Codinviec",
  description:
    "Xem và cập nhật thông tin hồ sơ cá nhân, kỹ năng và kinh nghiệm làm việc của bạn.",

  keywords: [
    "profile",
    "hồ sơ cá nhân",
    "Codinviec",
    "thông tin cá nhân",
    "tài khoản người dùng",
  ],

  authors: [{ name: "Codinviec Team" }],
  creator: "Codinviec",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProfilePage() {
  return <ProfileClients />;
}
