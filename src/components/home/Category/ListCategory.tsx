"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/home/category/useCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function ListCategory() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return null;
  }
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <ul className="flex space-x-6 text-accent-100 font-semibold">
      {data.map((cat) => (
        <li key={cat.id} className="relative group">
          <Link
            href={`/category/${cat.name}`}
            className="flex items-center space-x-1 hover:text-accent transition px-2 py-2"
          >
            <span>{cat.name}</span>
            {cat.children?.length > 0 && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xs text-accent-300"
              />
            )}
          </Link>

          {/* Invisible bridge để giữ hover khi di chuyển từ link xuống dropdown */}
          {cat.children && cat.children.length > 0 && (
            <div className="absolute left-0 top-full w-full h-2 hidden group-hover:block pointer-events-none z-50" />
          )}

          <AnimatePresence>
            {cat.children && cat.children.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute left-0 top-full pt-2 hidden group-hover:flex flex-col
                  bg-primary-900/95 backdrop-blur-md border border-primary-700
                  rounded-xl shadow-xl min-w-[220px] py-2 z-50 pointer-events-auto"
              >
                {cat.children.map((child, index) => (
                  <motion.li
                    key={child.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.03 }}
                    className="relative group/sub hover:bg-primary-800/70"
                  >
                    <Link
                      href={`/category/${child.name}`}
                      className="block px-4 py-2 text-accent-100 hover:text-accent transition items-center justify-between"
                    >
                      <span>{child.name}</span>
                      {child.children?.length > 0 && (
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[10px] text-accent-300"
                        />
                      )}
                    </Link>

                    {/* Invisible bridge cho sub-menu */}
                    {child.children && child.children.length > 0 && (
                      <div className="absolute left-full top-0 w-2 h-full hidden group-hover/sub:block pointer-events-none z-50" />
                    )}

                    <AnimatePresence>
                      {child.children && child.children.length > 0 && (
                        <motion.ul
                          initial={{ opacity: 0, x: -10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-full top-0 pl-2 hidden group-hover/sub:grid
                            bg-primary-900/95 border border-primary-700 rounded-xl shadow-xl py-2 z-50
                            grid-cols-3 gap-x-6 gap-y-1 min-w-[600px] max-w-[800px] px-4 pointer-events-auto"
                        >
                          {child.children.map((sub, subIndex) => (
                            <motion.li
                              key={sub.id}
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15, delay: subIndex * 0.02 }}
                              className="hover:bg-primary-800/70 rounded-md px-3 py-2 transition"
                            >
                              <Link
                                href={`/category/${sub.name}`}
                                className="block text-accent-100 hover:text-accent transition text-sm font-medium"
                              >
                                {sub.name}
                              </Link>
                            </motion.li>
                          ))}

                          <motion.li
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: child.children.length * 0.02 }}
                            className="col-span-3 border-t border-primary-700 mt-2 pt-2 text-center"
                          >
                            <Link
                              href={`/category/${child.name}`}
                              className="block text-accent-200 hover:text-accent text-sm"
                            >
                              View all {child.name} →
                            </Link>
                          </motion.li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}
