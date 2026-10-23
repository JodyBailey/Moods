import type { EntryOptionType } from "../../constants/entryOptions";
import { getEntryOptionsIcon } from "../../helpers/iconHelpers";

type EntryItemsIconProps = {
  name: EntryOptionType;
  additionalClasses?: string[];
};

const EntryItemsIcon = ({ name, additionalClasses = [] }: EntryItemsIconProps) => {
  const iconClassName = getEntryOptionsIcon(name);

  return <i className={`${iconClassName} ${additionalClasses.join(" ")}`}></i>;
};

export default EntryItemsIcon;
