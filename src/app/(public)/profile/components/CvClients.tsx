"use client";
import { UIButton } from "@/components/UIButton";
import { IUser } from "@/types/User";
import { Card, Upload, UploadProps } from "antd";
import { motion } from "framer-motion";

type CvClientsProps = {
  user: IUser;
  handleChangeCv: UploadProps["onChange"];
};

const CvClients = ({ user, handleChangeCv }: CvClientsProps) => {
  const cvName = user.cv?.replace(/^https?:\/\/[^/]+\/file\//, "");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="lg:col-span-2"
    >
      <Card className="border border-primary-100 rounded-2xl !mt-[20px]">
        CV của bạn
        {user?.cv ? (
          <a
            className="block"
            href={user?.cv || "http://localhost:3000/"}
            target="_blank"
          >
            {cvName}
          </a>
        ) : (
          <p>Bạn chưa có CV</p>
        )}
        <Upload
          accept=".pdf,.doc,.docx"
          showUploadList={false}
          beforeUpload={() => false}
          maxCount={1}
          className="!text-white"
          onChange={(info) => {
            handleChangeCv?.(info);
          }}
        >
          <UIButton variantCustom="primary" className="!h-10 mt-[20px]">
            Upload CV của bạn
          </UIButton>
        </Upload>
      </Card>
    </motion.div>
  );
};
export default CvClients;
