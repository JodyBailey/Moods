import { getGenericIconClass } from '../../helpers/iconHelpers';

const GenericIcon = ({ name, additionalClasses = [] }) => {
  const iconClassName = getGenericIconClass(name);

  return <i className={`${iconClassName} ${additionalClasses.join(' ')}`}></i>;
};

export default GenericIcon;
