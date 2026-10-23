import { FormControl, FormGroup, FormLabel } from "@mui/material";

import CheckboxInput from "./CheckboxInput";
import type { ContributorType } from "../../constants/entryOptions";

type FormCheckboxSectionProps = {
  labelText: string;
  items: ContributorType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: readonly ContributorType[];
};

const FormCheckboxSection = ({ labelText, items, onChange, options }: FormCheckboxSectionProps) => {
  return (
    <FormControl component={"fieldset"}>
      <FormLabel className="form-section-title" component={"legend"}>
        {labelText}
      </FormLabel>
      <FormGroup aria-label="contributors" row>
        {options.map((item, i) => (
          <CheckboxInput key={i} value={item} values={items} onChange={onChange} />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FormCheckboxSection;
