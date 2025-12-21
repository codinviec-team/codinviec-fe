"use client";
import { motion } from "framer-motion";
import React from "react";

type propsTabProfile = React.HTMLAttributes<HTMLDivElement>;

const TabProfile = ({ children, onClick }: propsTabProfile) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.1 }}
      whileHover={{ backgroundColor: "#F3F4F6" }}
      onClick={onClick}
      className="h-[46px] flex justify-center items-center rounded-md mt-[20px] cursor-pointer"
      style={{ backgroundColor: "#ffffff" }}
    >
      {children}
    </motion.div>
  );
};
export default TabProfile;
