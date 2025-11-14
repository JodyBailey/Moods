import { Button } from '@mui/material';

import GenericIcon from '../shared/GenericIcon';

const CreateEntryButton = ({onClick}) => {
    return (
      <div className='create-entry-btn-container d-flex position-fixed w-100'>
        <Button sx={{ textTransform: 'none' }} id='create-entry-btn' onClick={onClick}>
          <GenericIcon name={'plus'} additionalClasses={['create-entry-plus-icon']}/>
          Create Entry
        </Button>
      </div>
    )
}

export default CreateEntryButton;