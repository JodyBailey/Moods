import { getSentimentIconClass } from "../../helpers/iconHelpers";
import type { SentimentScore } from "../../constants/sentimentMap";

type SentimentIconProps = {
  sentiment: SentimentScore;
  additionalClasses?: string[];
};

const SentimentIcon = ({ sentiment, additionalClasses = [] }: SentimentIconProps) => {
  const iconClassName = getSentimentIconClass(sentiment);

  return <i className={`${iconClassName} ${additionalClasses.join(" ")}`}></i>;
};

export default SentimentIcon;
