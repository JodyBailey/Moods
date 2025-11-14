import SentimentIcon from '../shared/SentimentIcon';
import { sentimentClasses, sentimentMap } from '../../constants/sentimentMap';

const AverageMood = ({ averageMoodScore }) => {
  const roundedAverage = Math.round(averageMoodScore);

  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
      <div className='average-mood-container d-flex justify-content-center align-items-center'>
        <p className='average-mood-text'>Average Mood:&nbsp;</p>
        <p className={`average-mood-score ${sentimentClasses[roundedAverage].text}`}>
          {averageMoodScore} &nbsp;
        </p>
        <SentimentIcon
          sentiment={roundedAverage}
          additionalClasses={[
            'average-mood-icon',
            'icon-small',
            'mt-2',
            `${sentimentClasses[roundedAverage].text}`,
          ]}
        />
        <p className={`average-mood-sentiment ${sentimentClasses[roundedAverage].text}`}>
          {sentimentMap[roundedAverage]}
        </p>
      </div>
      <div className='ratings-gradient position-relative'> </div>
      <div className='d-flex justify-content-center align-items-center w-100'>
        <div className='sentiment-statistics-container d-flex justify-content-between'>
          {Array(9)
            .fill(0)
            .map((_, i) => (
              <div
                className='ratings-numbers-container d-flex flex-column'
                style={{ left: `${(i * 100) / 9}%` }}
                key={i}
              >
                <p className='text-center'>{i + 1}</p>
                <SentimentIcon
                  sentiment={i + 1}
                  additionalClasses={['rating-gradient-icon', 'icon-small', sentimentClasses[i + 1].text]}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AverageMood;
