"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/store";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Danh sách các câu vui nhộn
const funnyMessages = [
  "Đang tải...",
  "Đang chuẩn bị magic ✨",
  "Đang tìm kiếm việc làm cho bạn 🚀",
  "Đang load data siêu tốc ⚡",
  "Đang kết nối với server 🌐",
  "Đang xử lý thông tin... 🧠",
  "Đang tải dữ liệu... 📊",
  "Sắp xong rồi! 💪",
  "Đang làm việc chăm chỉ... 💼",
  "Đang tải trang... 🎯",
];

export default function LoadingScreen() {
  const { loading: authLoading } = useAppSelector(
    (state: RootState) => state.auth
  );
  
  // Theo dõi tất cả queries đang fetch (chỉ những query chưa có data - initial load)
  const isFetchingInitial = useIsFetching({ 
    predicate: (query) => {
      // Chỉ hiển thị loading cho query đang pending và chưa có data
      return query.state.status === 'pending' && !query.state.data;
    }
  });
  
  // Theo dõi tất cả mutations đang chạy
  const isMutating = useIsMutating();
  
  // State để tránh flash loading khi đã có data
  const [showLoading, setShowLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  
  // DEMO MODE: Luôn hiển thị loading (comment dòng này để tắt demo)
  // const DEMO_MODE = true;
  
  // Hiển thị loading nếu có bất kỳ loading nào hoặc đang demo
  const isLoading = authLoading || isFetchingInitial > 0 || isMutating > 0;
  
  // Delay nhỏ để tránh flash loading (< 200ms không hiển thị)
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowLoading(true), 200);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [isLoading]);

  // Thay đổi message mỗi 2 giây
  useEffect(() => {
    if (!showLoading) return;
    
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % funnyMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [showLoading]);

  // Animation cho các dots với delay khác nhau
  const getDotAnimation = (index: number) => ({
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: index * 0.2,
    },
  });

  return (
    <AnimatePresence>
      {showLoading && isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 backdrop-blur-md flex items-center justify-center"
        >
          {/* Background animated circles */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="relative flex flex-col items-center gap-6 z-10"
          >
            {/* Animated logo/icon */}
            <motion.div
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl overflow-hidden"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Image
                    src="/logo-icon.svg"
                    alt="CodinViec Logo"
                    width={50}
                    height={50}
                    className="w-12 h-12"
                    priority
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Loading dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-3 h-3 rounded-full bg-primary-500"
                  animate={getDotAnimation(index)}
                />
              ))}
            </div>

            {/* Animated message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessage}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700 font-semibold text-lg text-center px-4"
              >
                {funnyMessages[currentMessage]}
              </motion.p>
            </AnimatePresence>

            {/* Progress bar animation với hiệu ứng nảy */}
            <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 rounded-full relative"
                initial={{ width: "0%" }}
                animate={{ 
                  width: "100%",
                  scaleY: [1, 1.3, 1],
                }}
                transition={{
                  width: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scaleY: {
                    duration: 0.4,
                    repeat: Infinity,
                    ease: "easeOut",
                    repeatType: "reverse",
                  },
                }}
                style={{
                  boxShadow: "0 0 15px rgba(90, 63, 166, 0.6)",
                  transformOrigin: "center",
                }}
              />
              {/* Hiệu ứng sóng nảy */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
