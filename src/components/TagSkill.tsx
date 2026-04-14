import { Tag } from "antd";

type TagsSkillProps = {
  skillName: string;
  experienceName: string;
} & React.ComponentProps<typeof Tag>;

const TagSkill = ({ skillName, experienceName, ...props }: TagsSkillProps) => {
  return (
    <Tag
      {...props}
      className="!py-[4px] !rounded-[999px] cursor-pointer hover:!border-black"
    >
      {skillName} — {experienceName} kinh nghiệm
    </Tag>
  );
};
export default TagSkill;
