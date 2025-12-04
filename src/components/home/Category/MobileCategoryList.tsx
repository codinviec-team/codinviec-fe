"use client";

import { useState } from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/home/category/useCategories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileCategoryList() {
  const { data, isLoading } = useCategories();
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [expandedChildren, setExpandedChildren] = useState<Set<number>>(new Set());

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!Array.isArray(data) || data.length === 0) return null;

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleChild = (childId: number) => {
    const newExpanded = new Set(expandedChildren);
    if (newExpanded.has(childId)) {
      newExpanded.delete(childId);
    } else {
      newExpanded.add(childId);
    }
    setExpandedChildren(newExpanded);
  };

  return (
    <nav className="space-y-1">
      {data.map((cat) => (
        <div key={cat.id} className="border-b border-gray-100 last:border-0">
          {/* Main Category - Chỉ để mở/đóng, không có link */}
          <div className="flex items-center">
            {cat.children && cat.children.length > 0 ? (
              <button
                onClick={() => toggleCategory(cat.id)}
                className="flex-1 flex items-center justify-between py-3 px-3 text-gray-700 font-medium hover:text-primary-600 active:text-primary-700 transition-colors text-left"
                aria-label={`Toggle ${cat.name} subcategories`}
              >
                <span>{cat.name}</span>
                <motion.div
                  animate={{ rotate: expandedCategories.has(cat.id) ? 90 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="text-sm text-gray-400"
                  />
                </motion.div>
              </button>
            ) : (
              <Link
                href={`/category/${cat.name}`}
                className="flex-1 py-3 px-3 text-gray-700 font-medium hover:text-primary-600 transition-colors"
              >
                {cat.name}
              </Link>
            )}
          </div>

          {/* Children Categories - Expandable với animation */}
          <AnimatePresence>
            {cat.children && cat.children.length > 0 && expandedCategories.has(cat.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pl-4 pb-2 pt-1 space-y-1">
                  {cat.children.map((child) => (
                    <motion.div
                      key={child.id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                      className="border-l-2 border-primary-200 pl-3"
                    >
                      <div className="flex items-center">
                        <Link
                          href={`/category/${child.name}`}
                          className="flex-1 py-2 text-gray-600 text-sm hover:text-primary-600 active:text-primary-700 transition-colors"
                        >
                          {child.name}
                        </Link>
                        {child.children && child.children.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleChild(child.id);
                            }}
                            className="p-2 text-gray-400 hover:text-primary-600 active:text-primary-700 transition-colors"
                            aria-label="Toggle subcategories"
                          >
                            <motion.div
                              animate={{ rotate: expandedChildren.has(child.id) ? 90 : 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className="text-xs"
                              />
                            </motion.div>
                          </button>
                        )}
                      </div>

                      {/* Sub Children - Expandable với animation */}
                      <AnimatePresence>
                        {child.children && child.children.length > 0 && expandedChildren.has(child.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pt-1 space-y-1">
                              {child.children.map((sub, index) => (
                                <motion.div
                                  key={sub.id}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ duration: 0.15, delay: index * 0.03 }}
                                >
                                  <Link
                                    href={`/category/${sub.name}`}
                                    className="block py-1.5 text-gray-500 text-xs hover:text-primary-600 active:text-primary-700 transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                </motion.div>
                              ))}
                              <motion.div
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.15, delay: child.children.length * 0.03 }}
                              >
                                <Link
                                  href={`/category/${child.name}`}
                                  className="block py-1.5 text-primary-600 text-xs font-medium hover:text-primary-700 active:text-primary-800 transition-colors mt-2"
                                >
                                  Xem tất cả {child.name} →
                                </Link>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}

