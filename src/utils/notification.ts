"use client";

import { toast as reactToastify } from "react-toastify";
import Swal from "sweetalert2";

export const toast = {
  success: (title: string, message?: string) => {
    reactToastify.success(message || title, {
      position: "top-right",
      autoClose: 3000,
    });
  },
  error: (title: string, message?: string) => {
    reactToastify.error(message || title, {
      position: "top-right",
      autoClose: 3000,
    });
  },
  warning: (title: string, message?: string) => {
    reactToastify.warning(message || title, {
      position: "top-right",
      autoClose: 3000,
    });
  },
  info: (title: string, message?: string) => {
    reactToastify.info(message || title, {
      position: "top-right",
      autoClose: 3000,
    });
  },
};


export const alert = {
  success: async (title: string, message?: string) => {
    await Swal.fire({
      icon: "success",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  },
  error: async (title: string, message?: string) => {
    await Swal.fire({
      icon: "error",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  },
  warning: async (title: string, message?: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    });
    return result.isConfirmed;
  },
  info: async (title: string, message?: string) => {
    await Swal.fire({
      icon: "info",
      title,
      text: message,
      confirmButtonText: "OK",
    });
  },
  confirm: async (title: string, message?: string) => {
    const result = await Swal.fire({
      icon: "question",
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });
    return result.isConfirmed;
  },
};

