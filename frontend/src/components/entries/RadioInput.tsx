import { FormControlLabel, Radio } from "@mui/material";

import FormInputContainer from "./FormInputContainer";
import { getSentimentFromValue } from "../../constants/sentimentMap";
import type { SentimentType } from "../../constants/entryOptions";

type RadioInputProps = {
  activeValue: number | null;
  value: SentimentType;
};

const RadioInput = ({ activeValue, value }: RadioInputProps) => {
  const sentiment = getSentimentFromValue(value);
  const selected = activeValue === sentiment;

  return (
    <FormInputContainer
      value={value}
      selected={selected}
      type={"sentiment"}
      element={
        <FormControlLabel
          value={value}
          control={<Radio className="opacity-0" name={value} value={sentiment} />}
          label={<div className="form-section-item-label">{value}</div>}
          labelPlacement="bottom"
        />
      }
    />
  );
};

export default RadioInput;
