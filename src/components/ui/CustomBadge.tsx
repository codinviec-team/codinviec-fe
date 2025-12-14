import { BadgeType } from "@/types/common/BadgeType";
import { StarOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

type badgePropsType = React.HTMLAttributes<HTMLSpanElement> & BadgeType;

const CustomBadge = ({ variant = "hot" }: badgePropsType) => {
  switch (variant) {
    case "hot":
      return (
        <span className="px-2.5 py-1 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-xs font-semibold rounded-full shadow-md shadow-red-200/50 border border-red-200">
          🔥 Hot
        </span>
      );
    case "urgent":
      return (
        <motion.span
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0.7), 0 0 15px rgba(239, 68, 68, 0.5)",
              "0 0 0 8px rgba(239, 68, 68, 0), 0 0 25px rgba(239, 68, 68, 0.4)",
              "0 0 0 0 rgba(239, 68, 68, 0.7), 0 0 15px rgba(239, 68, 68, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-full shadow-2xl shadow-red-600/70 border-3 border-red-400 ring-2 ring-red-500 ring-offset-2 ring-offset-white"
          style={{ borderWidth: "3px" }}
        >
          ⚡ Urgent
        </motion.span>
      );
    case "superhot":
      return (
        <motion.span
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 0 0 rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.6)",
              "0 0 0 10px rgba(251, 191, 36, 0), 0 0 30px rgba(251, 191, 36, 0.4)",
              "0 0 0 0 rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.6)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-3 py-1.5 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 text-white text-xs font-bold rounded-full shadow-2xl shadow-orange-500/80 border-3 border-yellow-200 ring-2 ring-yellow-300 ring-offset-2 ring-offset-white"
          style={{ borderWidth: "3px" }}
        >
          🔥 Super Hot
        </motion.span>
      );
    case "featured":
      return (
        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-600 text-xs font-semibold rounded-full flex items-center gap-1">
          <StarOutlined />
          Featured
        </span>
      );
    case "spotlight":
      return (
        <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
          COMPANY SPOTLIGHT
        </div>
      );
  }
};
export default CustomBadge;
