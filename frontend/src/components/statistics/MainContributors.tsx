import { Typography } from "@mui/material";

import { sentimentClasses } from "../../constants/sentimentMap";
import SentimentIcon from "../shared/SentimentIcon";
import EntryItemsIcon from "../shared/EntryItemsIcon";
import type { ContributorType } from "../../constants/entryOptions";
import type { SentimentScore } from "../../constants/sentimentMap";

type MainContributorsProps = {
  title: string;
  contributors: Array<[ContributorType, number]>;
  borderColor: string;
};

const MainContributors = ({ title, contributors, borderColor }: MainContributorsProps) => {
  if (contributors.length === 0) {
    return;
  }

  const average = Math.round(contributors[0][1]) as SentimentScore;

  return (
    <div className="main-contributors" style={{ border: `1px solid ${borderColor}` }}>
      <Typography className="contributor-title" variant="h3">
        {title}
      </Typography>
      <div className="d-flex align-items-center">
        <Typography className="contributor-score" variant="h4">
          Score: <span className={sentimentClasses[average].text}>{contributors[0][1]}</span>
        </Typography>
        <SentimentIcon
          sentiment={average}
          additionalClasses={["contributor-score-icon", "icon-small", "mt-2", "ms-1", sentimentClasses[average].text]}
        />
      </div>
      <div className="mt-2">
        {contributors.map((contributor, i) => (
          <div className="d-flex" key={i}>
            <Typography className="main-contributor-item-title" variant="h5" key={i}>
              {contributor[0]}
            </Typography>
            <EntryItemsIcon
              name={contributor[0]}
              additionalClasses={["main-contributor-icon", "icon-extra-small", "mt-1", "ms-1", sentimentClasses[average].text]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContributors;
