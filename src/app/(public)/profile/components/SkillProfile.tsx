"use client";
import {
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";

const { Text } = Typography;

import { UIButton } from "@/components/ui/UIButton";
import AvailableSkillExperienceService from "@/services/common/AvailableSkillExperience";
import GroupCoreSkillService from "@/services/common/GroupCoreSkillService";
import { IUser } from "@/types/auth/User";
import { AvailableSkillType } from "@/types/common/AvailableSkill";
import {
  AvailableSkillExperienceType,
  SaveAvailableSkillExperienceType,
  UpdateAvailableSkillExperienceType,
} from "@/types/common/AvailableSkillExperienceType";
import { ExperienceType } from "@/types/common/Experience";
import { UseQueryResult } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type propsSkillProfileType = {
  skillUser: AvailableSkillExperienceType[];
  groupSkillCount: number[];
  user: IUser;
  availableSkillData: AvailableSkillType[];
  experienceData: ExperienceType[];
  fetchingSkillUser: RefetchSkillUserType;
};

type groupSkillType = {
  userId: string;
  groupCoreId: number;
  groupCoreName: string;
  skills: skillsForGroup[];
};

type skillsForGroup = {
  idUserSkills: number;
  skillId: number;
  skillName: string;
  experienceId: number;
  experienceName: string;
};

export type RefetchSkillUserType = UseQueryResult<
  AvailableSkillExperienceType[],
  Error
>["refetch"];

const SkillProfile = ({
  user,
  skillUser,
  groupSkillCount,
  availableSkillData,
  experienceData,
  fetchingSkillUser,
}: propsSkillProfileType) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const [groups, setGroups] = useState<groupSkillType[]>([]);
  const changedRef = useRef<any>({});
  const removedSkillIdsRef = useRef<number[]>([]);

  const [indexEditGroup, setIndexEditGroup] = useState<number | null>(0);

  useEffect(() => {
    if (!skillUser || !user) return;
    const groupSkillProfile: groupSkillType[] = groupSkillCount.map(
      (groupId) => {
        const skillsResult: skillsForGroup[] = skillUser
          .filter((skill) => skill.groupCoreId === groupId)
          .map((skill) => ({
            idUserSkills: skill.id,
            skillId: skill.availableSkillId,
            skillName: skill.availableSkillName,
            experienceId: skill.experienceId,
            experienceName: skill.experienceName,
          }));

        const nameGroup =
          skillsResult.length > 0
            ? skillUser.find((s) => s.groupCoreId === groupId)?.groupCoreName ||
              ""
            : "";

        return {
          userId: user.id,
          groupCoreId: groupId,
          groupCoreName: nameGroup,
          skills: skillsResult,
        };
      }
    );

    setGroups(groupSkillProfile);
  }, [skillUser, user, groupSkillCount]);

  //   add skill mới qua submit
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      console.log("CHANGED ONLY:", changedRef.current);

      if (changedRef.current) {
        // Tạo group có skill
        if (changedRef.current?.skills) {
          // đặt cờ đánh dấu tạo mới và set id tạo mới
          let isCreateNewGroupCoreName: boolean = false;
          let idCreateNewGroupCoreName: number = 0;

          // nếu có skill xóa thì xóa khỏi db
          if (removedSkillIdsRef.current.length > 0) {
            for (const item of removedSkillIdsRef.current) {
              const payloadDelete = {
                availableSkillExperienceId: item,
              };
              await AvailableSkillExperienceService.DeleteAvailableSkillExperienceById(
                payloadDelete
              );
            }
            removedSkillIdsRef.current = [];
          }

          for (const item of changedRef.current.skills as {
            id: number;
            skill: number | Object;
            years: number | Object;
          }[]) {
            // trường hợp sửa skill và years đã có và không thêm mới
            if (item?.id) {
              if (
                (typeof item.skill === "object" &&
                  item.skill &&
                  "value" in item.skill) ||
                (typeof item.years === "object" &&
                  item.years &&
                  "value" in item.years)
              ) {
                let availableSkillId: number;
                let experienceId: number;
                let groupCoreId;
                if (indexEditGroup !== null) {
                  groupCoreId = groups[indexEditGroup].groupCoreId;
                }

                if (typeof item.skill === "object" && "value" in item.skill) {
                  availableSkillId = Number(item.skill.value);
                } else {
                  availableSkillId = Number(item.skill);
                }

                if (typeof item.years === "object" && "value" in item.years) {
                  experienceId = Number(item.years.value);
                } else {
                  experienceId = Number(item.years);
                }

                const payload: UpdateAvailableSkillExperienceType = {
                  availableSkillExperienceId: item.id,
                  userId: user?.id || "",
                  groupCoreId: groupCoreId || 0,
                  availableSkillId,
                  experienceId,
                };

                const skillChanged =
                  await AvailableSkillExperienceService.UpdateAvailableSkillExperienceById(
                    payload
                  );
              }
            } else {
              // Thêm mới skill và years
              let availableSkillId: number;
              let experienceId: number;

              if (typeof item.skill === "object" && "value" in item.skill) {
                availableSkillId = Number(item.skill.value);
              } else {
                availableSkillId = Number(item.skill);
              }

              if (typeof item.years === "object" && "value" in item.years) {
                experienceId = Number(item.years.value);
              } else {
                experienceId = Number(item.years);
              }

              // Trường hợp thêm mới skill và years ở group đã có sẵn
              if (indexEditGroup !== null) {
                let groupCoreId: number = 0;
                groupCoreId = groups[indexEditGroup].groupCoreId;

                const payload: SaveAvailableSkillExperienceType = {
                  userId: user?.id || "",
                  groupCoreId,
                  availableSkillId,
                  experienceId,
                };

                const skillNewInOldGroup =
                  await AvailableSkillExperienceService.SaveAvailableSkillExperienceById(
                    payload
                  );
              } else {
                // Trường hợp thêm mới ở group chưa có luôn

                // đặt cờ đánh dấu tạo mới
                if (!isCreateNewGroupCoreName) {
                  const payloadGroup = {
                    name: changedRef.current?.groupName,
                  };

                  const groupCoreSkillNew =
                    await GroupCoreSkillService.SaveGroupCoreSkill(
                      payloadGroup
                    );

                  if (groupCoreSkillNew?.id) {
                    isCreateNewGroupCoreName = true;
                    idCreateNewGroupCoreName = groupCoreSkillNew?.id;
                    console.log(
                      "isCreateNewGroupCoreName",
                      isCreateNewGroupCoreName
                    );
                  }
                }

                const payload: SaveAvailableSkillExperienceType = {
                  userId: user?.id || "",
                  groupCoreId: idCreateNewGroupCoreName,
                  availableSkillId,
                  experienceId,
                };

                const skillNewInNewGroup =
                  await AvailableSkillExperienceService.SaveAvailableSkillExperienceById(
                    payload
                  );
              }
            }
          }
        }
        await fetchingSkillUser();
      }

      setOpen(false);
      form.resetFields();
    } catch (_) {}
  };

  //   set giá trị mặc định
  useEffect(() => {
    if (open && indexEditGroup !== null && groups) {
      form.setFieldsValue({
        groupName: groups[indexEditGroup].groupCoreName,
        skills: groups[indexEditGroup].skills.map((s) => {
          return {
            id: s.idUserSkills,
            skill: s.skillId,
            years: s.experienceId,
          };
        }),
      });
    }
  }, [open, groups, indexEditGroup]);

  const onChangeIndexEditGroup = (index: number | null) => {
    setIndexEditGroup(index);
  };

  const onChangeModalOpen = (status: boolean) => {
    setOpen(status);
  };

  const onCancelModal = () => {
    onChangeModalOpen(false);
    changedRef.current = {};
    form.resetFields();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="lg:col-span-2"
    >
      <Card className="border border-primary-100 rounded-2xl">
        <p>Quản lý kỹ năng của bạn tại đây</p>
        <UIButton
          onClick={() => {
            onChangeModalOpen(true);
            onChangeIndexEditGroup(null);
          }}
          className="!my-[10px] "
          variantCustom="primarySmall"
        >
          Thêm kỹ năng
        </UIButton>
        {groups.length === 0 && <Text type="secondary">Chưa có kỹ năng</Text>}

        {groups.map((g, index) => (
          <div key={g.groupCoreId} className="relative mb-[16px]">
            <Text strong style={{ fontSize: 16 }}>
              {g.groupCoreName}
            </Text>
            <Divider className="!my-[6px]" />
            {g.skills?.map((s) => (
              <div key={s.skillId} style={{ marginBottom: 6 }}>
                • {s.skillName} — {s.experienceName} kinh nghiệm
              </div>
            ))}
            <motion.div
              className=" h-[32px] bg-primary w-[32px] absolute right-0 top-1/2 -translate-y-1/2 flex justify-center items-center rounded-full cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              whileHover={{
                opacity: 0.8,
              }}
              onClick={() => {
                onChangeIndexEditGroup(index);
                onChangeModalOpen(true);
              }}
            >
              <EditOutlined className="!text-[14px] !text-white" />
            </motion.div>
          </div>
        ))}
        {/* ==== MODAL ==== */}
        <Modal
          title="Thêm nhóm kỹ năng"
          open={open}
          onOk={handleSubmit}
          onCancel={() => onCancelModal()}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(changed, all) => {
              changedRef.current = {
                ...changedRef.current,
                ...all,
              };
            }}
          >
            {/* Group Name */}
            <Form.Item
              label="Tên nhóm"
              name="groupName"
              rules={[{ required: true, message: "Nhập tên nhóm" }]}
            >
              <input
                className="ant-input"
                placeholder="Ví dụ: Backend, Frontend..."
              />
            </Form.Item>

            {/* Skills */}
            <Form.List
              name="skills"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value || value.length === 0) {
                      return Promise.reject(
                        new Error("Phải thêm ít nhất 1 skill")
                      );
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      align="baseline"
                      style={{ display: "flex", marginBottom: 10 }}
                    >
                      {/* id */}
                      <Form.Item name={[field.name, "id"]} hidden>
                        <input />
                      </Form.Item>

                      {/* Skill */}
                      <Form.Item
                        name={[field.name, "skill"]}
                        rules={[{ required: true, message: "Chọn skill" }]}
                      >
                        <Select
                          labelInValue
                          placeholder="Chọn kỹ năng"
                          style={{ width: 200 }}
                          options={availableSkillData?.map((s) => ({
                            ...s,
                            value: s.id,
                            label: s.name,
                          }))}
                        />
                      </Form.Item>

                      {/* Years */}
                      <Form.Item
                        name={[field.name, "years"]}
                        rules={[
                          { required: true, message: "Chọn năm kinh nghiệm" },
                        ]}
                      >
                        <Select
                          labelInValue
                          placeholder="Năm KN"
                          style={{ width: 140 }}
                          options={experienceData?.map((s) => ({
                            ...s,
                            value: s.id,
                            label: s.name,
                          }))}
                        />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          const values = form.getFieldValue("skills");
                          const item = values[field.name];

                          if (item?.id) {
                            removedSkillIdsRef.current.push(item.id);
                          }

                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm skill
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      </Card>
    </motion.div>
  );
};
export default SkillProfile;
