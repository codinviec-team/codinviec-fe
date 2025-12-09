"use client";

import {useState} from "react";
import type {CollapseProps} from "antd";
import {Button, Checkbox, Collapse, Modal} from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseOutlined,
    DollarOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";

const salaryRanges = [
  { label: "Dưới 10 triệu", value: "0-10" },
  { label: "10 - 15 triệu", value: "10-15" },
  { label: "15 - 20 triệu", value: "15-20" },
  { label: "20 - 30 triệu", value: "20-30" },
  { label: "30 - 50 triệu", value: "30-50" },
  { label: "Trên 50 triệu", value: "50+" },
];

const jobTypes = [
  { label: "Full-time", value: "fulltime" },
  { label: "Part-time", value: "parttime" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
  { label: "Remote", value: "remote" },
];

const experienceLevels = [
  { label: "Intern/Fresher", value: "fresher" },
  { label: "Junior (1-2 năm)", value: "junior" },
  { label: "Middle (2-5 năm)", value: "middle" },
  { label: "Senior (5+ năm)", value: "senior" },
  { label: "Lead/Manager", value: "lead" },
];

const locations = [
  { label: "Hà Nội", value: "hanoi" },
  { label: "Hồ Chí Minh", value: "hcm" },
  { label: "Đà Nẵng", value: "danang" },
  { label: "Cần Thơ", value: "cantho" },
  { label: "Hải Phòng", value: "haiphong" },
  { label: "Remote", value: "remote" },
];

const skills = [
  "ReactJS",
  "Node.js",
  "Python",
  "Java",
  "JavaScript",
  "TypeScript",
  "Vue.js",
  "Angular",
  "PHP",
  "Go",
  "Ruby",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
];

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
};

export default function FilterModal({
  open,
  onClose,
  onApply,
}: FilterModalProps) {
  const [selectedSalary, setSelectedSalary] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleSalaryChange = (checkedValues: string[]) => {
    setSelectedSalary(checkedValues);
  };

  const handleJobTypeChange = (checkedValues: string[]) => {
    setSelectedJobTypes(checkedValues);
  };

  const handleExperienceChange = (checkedValues: string[]) => {
    setSelectedExperience(checkedValues);
  };

  const handleLocationChange = (checkedValues: string[]) => {
    setSelectedLocations(checkedValues);
  };

  const handleSkillChange = (checkedValues: string[]) => {
    setSelectedSkills(checkedValues);
  };

  const handleClearAll = () => {
    setSelectedSalary([]);
    setSelectedJobTypes([]);
    setSelectedExperience([]);
    setSelectedLocations([]);
    setSelectedSkills([]);
  };

  const handleApply = () => {
    onApply();
    onClose();
  };

  const collapseItems: CollapseProps["items"] = [
    {
      key: "salary",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <DollarOutlined className="text-primary-500" />
          Mức lương
        </span>
      ),
      children: (
        <Checkbox.Group
          value={selectedSalary}
          onChange={handleSalaryChange}
          className="flex flex-col gap-3"
        >
          {salaryRanges.map((range) => (
            <Checkbox
              key={range.value}
              value={range.value}
              className="!text-gray-700"
            >
              {range.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "jobType",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <ClockCircleOutlined className="text-primary-500" />
          Loại hình công việc
        </span>
      ),
      children: (
        <Checkbox.Group
          value={selectedJobTypes}
          onChange={handleJobTypeChange}
          className="flex flex-col gap-3"
        >
          {jobTypes.map((type) => (
            <Checkbox
              key={type.value}
              value={type.value}
              className="!text-gray-700"
            >
              {type.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "experience",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <CheckCircleOutlined className="text-primary-500" />
          Kinh nghiệm
        </span>
      ),
      children: (
        <Checkbox.Group
          value={selectedExperience}
          onChange={handleExperienceChange}
          className="flex flex-col gap-3"
        >
          {experienceLevels.map((level) => (
            <Checkbox
              key={level.value}
              value={level.value}
              className="!text-gray-700"
            >
              {level.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "location",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <EnvironmentOutlined className="text-primary-500" />
          Địa điểm
        </span>
      ),
      children: (
        <Checkbox.Group
          value={selectedLocations}
          onChange={handleLocationChange}
          className="flex flex-col gap-3"
        >
          {locations.map((location) => (
            <Checkbox
              key={location.value}
              value={location.value}
              className="!text-gray-700"
            >
              {location.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
    {
      key: "skills",
      label: (
        <span className="flex items-center gap-2 font-semibold">
          <CheckCircleOutlined className="text-primary-500" />
          Kỹ năng
        </span>
      ),
      children: (
        <Checkbox.Group
          value={selectedSkills}
          onChange={handleSkillChange}
          className="flex flex-col gap-3"
        >
          {skills.map((skill) => (
            <Checkbox
              key={skill}
              value={skill}
              className="!text-gray-700"
            >
              {skill}
            </Checkbox>
          ))}
        </Checkbox.Group>
      ),
    },
  ];

  const activeFiltersCount =
    selectedSalary.length +
    selectedJobTypes.length +
    selectedExperience.length +
    selectedLocations.length +
    selectedSkills.length;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className="[&_.ant-modal-content]:!rounded-2xl [&_.ant-modal-header]:!rounded-t-2xl"
      closeIcon={<CloseOutlined className="text-gray-400 hover:text-gray-600" />}
    >
      <div className="py-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Bộ lọc tìm kiếm</h3>
          {activeFiltersCount > 0 && (
            <span className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-semibold rounded-full">
              {activeFiltersCount} bộ lọc đã chọn
            </span>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2">
          <Collapse
            items={collapseItems}
            defaultActiveKey={["salary", "jobType", "experience"]}
            ghost
            className="[&_.ant-collapse-header]:!px-0 [&_.ant-collapse-content]:!px-0"
          />
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="mt-6 pt-6 border-t border-primary-100">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Đang lọc theo:
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedSalary.map((salary) => (
                <span
                  key={salary}
                  className="px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
                >
                  {salaryRanges.find((r) => r.value === salary)?.label}
                </span>
              ))}
              {selectedJobTypes.map((type) => (
                <span
                  key={type}
                  className="px-2.5 py-1 bg-accent-50 text-accent-600 text-xs font-medium rounded-full"
                >
                  {jobTypes.find((t) => t.value === type)?.label}
                </span>
              ))}
              {selectedExperience.map((exp) => (
                <span
                  key={exp}
                  className="px-2.5 py-1 bg-secondary-50 text-secondary-600 text-xs font-medium rounded-full"
                >
                  {experienceLevels.find((e) => e.value === exp)?.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 mt-6 pt-6 border-t border-primary-100">
          <Button
            type="text"
            onClick={handleClearAll}
            className="!text-primary-600 hover:!text-primary-700"
          >
            Xóa tất cả
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="!h-11 !px-6 !rounded-xl"
            >
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={handleApply}
              className="!h-11 !px-6 !rounded-xl !bg-primary-600 hover:!bg-primary-700"
            >
              Áp dụng bộ lọc
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

