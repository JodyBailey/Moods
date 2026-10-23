import { FormControlLabel, Checkbox } from "@mui/material";

import FormInputContainer from "./FormInputContainer";
import type { ContributorType } from "../../constants/entryOptions";

type CheckboxInputProps = {
  value: ContributorType;
  values: ContributorType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxInput = ({ value, values, onChange }: CheckboxInputProps) => {
  const selected = values.includes(value);

  return (
    <FormInputContainer
      value={value}
      selected={selected}
      type={"entryOptions"}
      element={
        <FormControlLabel
          value={value}
          control={<Checkbox className="opacity-0" name={value} onChange={onChange} checked={selected} />}
          label={<div className="form-section-item-label">{value}</div>}
          labelPlacement="bottom"
        />
      }
    />
  );
};

export default CheckboxInput;
