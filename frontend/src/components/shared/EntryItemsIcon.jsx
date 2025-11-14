import { getEntryOptionsIcon } from '../../helpers/iconHelpers';

const EntryItemsIcon = ({ name, additionalClasses = [] }) => {
  const iconClassName = getEntryOptionsIcon(name);

  return <i className={`${iconClassName} ${additionalClasses.join(' ')}`}></i>;
};

export default EntryItemsIcon;
