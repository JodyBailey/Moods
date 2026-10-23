import { Typography } from "@mui/material";

import EntryItemsIcon from "../shared/EntryItemsIcon";
import type { ContributorType, ActivityType, EmotionType } from "../../constants/entryOptions";

type EntrySectionProps = {
  title: string;
  items: Array<{ id: number; name: EmotionType | ActivityType | ContributorType }>;
};

const EntrySection = ({ title, items }: EntrySectionProps) => {
  return (
    <div className="entry-section">
      <Typography variant="h3" className="entry-section-title">
        {title}
      </Typography>
      <div className="entry-items-container d-flex flex-wrap my-2">
        {items.map((item) => (
          <div className="entry-item d-flex flex-column align-items-center" key={item.id}>
            <EntryItemsIcon name={item.name} additionalClasses={["entry-section-icon", "icon-extra-small"]} />
            <Typography variant="body2" className="entry-section-icon-title">
              {item.name}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntrySection;
