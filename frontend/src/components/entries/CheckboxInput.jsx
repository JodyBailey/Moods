import { FormControlLabel, Checkbox } from '@mui/material';

import FormInputContainer from './FormInputContainer';

const CheckboxInput = ({ value, values, onChange }) => {
  const selected = values.includes(value);

  return (
    <FormInputContainer
      value={value}
      selected={selected}
      type={'entryOptions'}
      element={
        <FormControlLabel
          onChange={onChange}
          value={value}
          control={<Checkbox className='opacity-0' name={value} checked={selected} />}
          label={<div className='form-section-item-label'>{value}</div>}
          labelPlacement='bottom'
        />
      }
    />
  );
};

export default CheckboxInput;
