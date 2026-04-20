"use client";

import Container from "@/components/Container";
import CustomBadge from "@/components/CustomBadge";
import LoadingCustom from "@/components/LoadingCustom";
import TagKeyWordComponent from "@/components/TagKeyWordComponent";
import { PATHS } from "@/constants/paths";
import { useAppSelector } from "@/hooks/hooks";
import JobServices from "@/services/JobServices";
import { RootState } from "@/store";
import { BadgeVariant } from "@/types/BadgeType";
import { ApplyJobType, JobType } from "@/types/home/job/JobType";
import { timeAgo } from "@/utils/DateHelper";
import { alert } from "@/utils/notification";
import {
  ArrowLeftOutlined,
  BookOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  ShareAltOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Demo data - trong thực tế sẽ fetch từ API
type JobDetailPageClientProps = {
  jobId: string;
};

export default function JobDetailPageClient({
  jobId,
}: JobDetailPageClientProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);

  // job
  const { data: dataJob, isLoading: isLoadingJob } = useQuery<JobType, Error>({
    queryKey: ["job"],
    queryFn: () => {
      return JobServices.getJobById(Number(jobId || 0));
    },
  });

  const loadingPage = isLoadingJob;
  if (loadingPage) {
    return (
      <Container>
        <LoadingCustom />;
      </Container>
    );
  }
  if (!dataJob && !loadingPage) {
    return (
      <Container className="!py-16">
        <div className="bg-white rounded-2xl p-12 text-center border border-primary-100">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy việc làm
          </h2>
          <p className="text-gray-600 mb-6">
            Việc làm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push("/jobs")}
            className="!rounded-xl"
          >
            Quay lại danh sách việc làm
          </Button>
        </div>
      </Container>
    );
  }

  const onClickApplyJob = async () => {
    if (user && dataJob && dataJob?.id && user?.id) {
      const payload: ApplyJobType = {
        userId: user?.id,
        idJob: dataJob?.id,
      };
      const jobApply = await JobServices.applyJobForUser(payload);
      if (jobApply?.id) {
        alert.success(
          "Ứng tuyển thành công!",
          `Bạn đã ứng tuyển công việc thành công!`,
        );
        router.push(PATHS.JOBS);
      } else {
        alert.error("Ứng tuyển thất bại!", `Hãy thực hiện lại!`);
      }
    }
  };

  return (
    <Container className="!py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/jobs")}
          className="!rounded-xl"
        >
          Quay lại
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-primary-100 p-8"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6 pb-6 border-b border-primary-100">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-20 h-20 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={dataJob?.company?.logo || "/defaultCompanyLogo.webp"}
                    alt={dataJob?.company?.name || "Tên công ty"}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {dataJob?.statusSpecials &&
                      dataJob?.statusSpecials.map((item) => {
                        if (!item?.title || item?.title === "spotlight")
                          return "";
                        return (
                          <CustomBadge
                            key={item.id}
                            variant={item?.title as BadgeVariant}
                          />
                        );
                      })}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {dataJob?.jobPosition}
                  </h1>
                  <p className="text-xl text-primary-600 font-semibold">
                    {dataJob?.company?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
                  aria-label={isSaved ? "Bỏ lưu" : "Lưu việc làm"}
                >
                  {isSaved ? (
                    <HeartFilled className="text-xl text-red-500" />
                  ) : (
                    <HeartOutlined className="text-xl text-gray-400 hover:text-red-500" />
                  )}
                </button>
                <button className="p-2 hover:bg-primary-50 rounded-lg transition-colors">
                  <ShareAltOutlined className="text-xl text-gray-400 hover:text-primary-600" />
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                <DollarOutlined className="text-2xl text-accent-500" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Mức lương</p>
                  <p className="font-bold text-accent-600">
                    {dataJob?.isAgreedSalary
                      ? "Thỏa thuận"
                      : `${dataJob?.salary}$`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                <EnvironmentOutlined className="text-2xl text-primary-500" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Địa điểm</p>
                  <p className="font-bold text-gray-900">
                    {dataJob?.provinceName || "Nơi làm việc"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                <ClockCircleOutlined className="text-2xl text-secondary-500" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Đăng tải</p>
                  <p className="font-bold text-gray-900">
                    {timeAgo(dataJob?.createdDate || "")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl">
                <BookOutlined className="text-2xl text-accent-500" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Kinh nghiệm</p>
                  <p className="font-bold text-gray-900">
                    {dataJob?.experienceName}
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Kỹ năng yêu cầu
              </h3>
              <div className="flex flex-wrap gap-2">
                {dataJob?.skills.map((item) => (
                  <TagKeyWordComponent key={item?.id}>
                    {item?.name}
                  </TagKeyWordComponent>
                ))}
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Mô tả công việc
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                <p>{dataJob?.descriptionJob || ""}</p>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Trách nhiệm:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {dataJob &&
                      dataJob?.responsibility
                        ?.split(", ")
                        ?.map((res) => <li>{res}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Yêu cầu:</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {dataJob?.requirement?.split(", ")?.map((res) => (
                      <li>{res}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Quyền lợi:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {dataJob?.benefits?.split(", ")?.map((res) => (
                      <li>{res}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="p-6 bg-primary-50 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TeamOutlined className="text-primary-500" />
                Về công ty
              </h3>
              <p className="text-gray-700 mb-4">
                {dataJob?.company?.name} là một trong những công ty công nghệ
                hàng đầu tại Việt Nam, chuyên phát triển các giải pháp phần mềm
                và dịch vụ công nghệ thông tin. Với đội ngũ nhân viên tài năng
                và môi trường làm việc năng động, chúng tôi luôn tạo điều kiện
                tốt nhất cho nhân viên phát triển sự nghiệp. {` `}
                {dataJob?.company?.description}
              </p>
              <Button
                type="link"
                href={`${PATHS.COMPANIES}/${dataJob?.company?.id}`}
                className="!p-0 !h-auto text-primary-600 hover:text-primary-700 font-semibold"
              >
                Xem thêm về công ty →
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-primary-100 p-6 sticky top-24"
          >
            <Button
              type="primary"
              block
              size="large"
              onClick={() => {
                onClickApplyJob();
              }}
              className="!h-12 !rounded-xl !bg-accent-500 hover:!bg-accent-600 !mb-4"
            >
              Ứng tuyển ngay
            </Button>
            <Button
              block
              size="large"
              onClick={() => setIsSaved(!isSaved)}
              className="!h-12 !rounded-xl !mb-4"
              icon={
                isSaved ? (
                  <HeartFilled className="text-red-500" />
                ) : (
                  <HeartOutlined />
                )
              }
            >
              {isSaved ? "Đã lưu" : "Lưu việc làm"}
            </Button>
            <Button
              block
              size="large"
              icon={<ShareAltOutlined />}
              className="!h-12 !rounded-xl"
            >
              Chia sẻ
            </Button>
          </motion.div>
        </div>
      </div>
    </Container>
  );
}
