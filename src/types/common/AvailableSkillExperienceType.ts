export type AvailableSkillExperienceType = {
  id: number;
  userId: string;
  groupCoreId: number;
  groupCoreName: string;
  availableSkillId: number;
  availableSkillName: string;
  experienceId: number;
  experienceName: string;
};

export type UpdateAvailableSkillExperienceType = {
  availableSkillExperienceId: number;
  userId: string;
  groupCoreId: number;
  availableSkillId: number;
  experienceId: number;
};

export type SaveAvailableSkillExperienceType = {
  userId: string;
  groupCoreId: number;
  availableSkillId: number;
  experienceId: number;
};

export type DeleteAvailableSkillExperienceType = {
  availableSkillExperienceId: number;
};
