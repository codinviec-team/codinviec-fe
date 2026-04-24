"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Skeleton } from "antd";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/Container";
import JobListCard from "@/app/(public)/jobs/components/JobListCard";
import JobServices from "@/services/JobServices";
import { JobType } from "@/types/JobType";

export default function FeaturedJobComponent() {
  const { data: featuredJobs, isLoading } = useQuery<JobType[], Error>({
    queryKey: ["featured-jobs"],
    queryFn: () => JobServices.getFeaturedJobs(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return (
    <Container className="py-16!">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
        >
          Việc làm <span className="text-primary">nổi bật</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Khám phá những cơ hội việc làm IT hấp dẫn nhất được tuyển chọn
        </motion.p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-primary-100 p-6"
            >
              <Skeleton
                active
                avatar={{ size: 80, shape: "square" }}
                paragraph={{ rows: 3 }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {featuredJobs?.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <JobListCard job={job} index={index} />
            </motion.div>
          ))}

          {!featuredJobs?.length && (
            <div className="text-center py-16 text-gray-500">
              Chưa có việc làm nổi bật
            </div>
          )}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-10"
      >
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:shadow-lg text-lg"
        >
          Xem tất cả việc làm
          <span className="transition-transform">→</span>
        </Link>
      </motion.div>
    </Container>
  );
}
