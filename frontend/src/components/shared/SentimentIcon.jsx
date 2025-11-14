import { getSentimentIconClass } from '../../helpers/iconHelpers';

const SentimentIcon = ({ sentiment, additionalClasses = [] }) => {
  const iconClassName = getSentimentIconClass(sentiment);

  return <i className={`${iconClassName} ${additionalClasses.join(' ')}`}></i>;
};

export default SentimentIcon;
