import SentimentIcon from "../shared/SentimentIcon";
import { sentimentClasses, sentimentMap, sentimentScoreValues, type SentimentScore } from "../../constants/sentimentMap";

type AverageMoodProps = {
  averageMoodScore: number;
};

const AverageMood = ({ averageMoodScore }: AverageMoodProps) => {
  const roundedAverage = Math.round(averageMoodScore) as SentimentScore;

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="average-mood-container d-flex justify-content-center align-items-center">
        <p className="average-mood-text">Average Mood:&nbsp;</p>
        <p className={`average-mood-score ${sentimentClasses[roundedAverage].text}`}>{averageMoodScore} &nbsp;</p>
        <SentimentIcon
          sentiment={roundedAverage}
          additionalClasses={["average-mood-icon", "icon-small", "mt-2", `${sentimentClasses[roundedAverage].text}`]}
        />
        <p className={`average-mood-sentiment ${sentimentClasses[roundedAverage].text}`}>{sentimentMap[roundedAverage]}</p>
      </div>
      <div className="ratings-gradient position-relative"> </div>
      <div className="d-flex justify-content-center align-items-center w-100">
        <div className="sentiment-statistics-container d-flex justify-content-between">
          {sentimentScoreValues.map((sentiment, i) => (
            <div className="ratings-numbers-container d-flex flex-column" style={{ left: `${(i * 100) / 9}%` }} key={i}>
              <p className="text-center">{sentiment}</p>
              <SentimentIcon
                sentiment={sentiment}
                additionalClasses={["rating-gradient-icon", "icon-small", sentimentClasses[sentiment].text]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AverageMood;
