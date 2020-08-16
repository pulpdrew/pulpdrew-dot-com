import { TagColorService } from "../lib/tag-color";

export const TagChip: React.FC<{ tag: string }> = ({ tag }) => {
  const bg = TagColorService.getBgColor(tag);
  const border = TagColorService.getBorderColor(tag);

  return <span className={`${bg} ${border} border-2 rounded-full px-2 mr-2 p-1`}>{tag}</span>  
};

export const TagChipList: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="mb-1">
      {tags.map((tag) => <TagChip tag={tag} key={tag}></TagChip>)}
    </div>
  );
};