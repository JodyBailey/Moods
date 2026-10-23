import { getGenericIconClass } from "../../helpers/iconHelpers";

type GenericIconProps = {
  name: string;
  additionalClasses?: string[];
};

const GenericIcon = ({ name, additionalClasses = [] }: GenericIconProps) => {
  const iconClassName = getGenericIconClass(name);

  return <i className={`${iconClassName} ${additionalClasses.join(" ")}`}></i>;
};

export default GenericIcon;
