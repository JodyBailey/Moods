import EntryItemsIcon from "../shared/EntryItemsIcon";
import SentimentIcon from "../shared/SentimentIcon";
import { getSentimentFromValue } from "../../constants/sentimentMap";
import { sentimentClasses } from "../../constants/sentimentMap";
import { useSentimentContext } from "../../hooks/useSentimentContext";
import type { ContributorType, SentimentType } from "../../constants/entryOptions";

type FormInputContainerProps = {
  element: React.ReactNode;
  selected: boolean;
} & ({ type: "entryOptions"; value: ContributorType } | { type: "sentiment"; value: SentimentType });

const FormInputContainer = ({ value, element, selected, type }: FormInputContainerProps) => {
  const centerClasses = ["position-absolute", "top-50", "start-50", "translate-middle"];
  const additionalClasses = [...centerClasses, "form-input-icon"];
  const { sentiment } = useSentimentContext();

  const getSelectedOptionClass = () => {
    if (!sentiment) {
      return "sentiment-default-text";
    }

    return sentimentClasses[sentiment].text;
  };

  if (selected) additionalClasses.push(getSelectedOptionClass());

  return (
    <div className="position-relative">
      {type === "entryOptions" ? (
        <EntryItemsIcon name={value} additionalClasses={additionalClasses} />
      ) : (
        <SentimentIcon sentiment={getSentimentFromValue(value)} additionalClasses={additionalClasses} />
      )}
      {element}
    </div>
  );
};

export default FormInputContainer;
