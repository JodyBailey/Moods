import { FormControl, FormGroup, FormLabel } from '@mui/material';

import CheckboxInput from './CheckboxInput';

const FormCheckboxSection = ({ labelText, items, onChange, options }) => {
  return (
    <FormControl component={'fieldset'}>
      <FormLabel className='form-section-title' component={'legend'}>
        {labelText}
      </FormLabel>
      <FormGroup aria-label='contributors' row>
        {options.map((item, i) => (
          <CheckboxInput key={i} value={item} values={items} onChange={onChange} />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default FormCheckboxSection;
