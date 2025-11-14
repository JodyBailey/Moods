import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import DeleteModal from './DeleteModal';

export default function MenuSelect({ setOpenEntry, setOpenDeleteModal, additionalClasses }) {
  const [anchor, setAnchor] = useState(null);

  const options = ['Edit', 'Delete'];
  const isMenuOpen = !!anchor;

  const handleClick = (e) => {
    e.stopPropagation();

    setAnchor(e.target);
  };

  const handleSelect = (e) => {
    e.stopPropagation();

    const option = e.target.textContent.toLowerCase().trim();

    if (option === 'edit') {
      setOpenEntry(true);
    } else if (option === 'delete') {
      setOpenDeleteModal(true);
    }

    setAnchor(null);
  };

  return (
    <div className={`entry-menu-select d-flex align-items-center ${additionalClasses.join(' ')}`}>
      <IconButton
        onClick={handleClick}
        aria-label='Entry Menu'
        aria-expanded={isMenuOpen ? 'true' : 'false'}
        aria-controls={isMenuOpen ? 'long-menu' : ''}
        aria-haspopup='true'
      >
        <MoreVertIcon sx={{ color: 'white' }} />
      </IconButton>
      <Menu open={isMenuOpen} anchorEl={anchor} onClose={handleSelect}>
        {options.map((option) => (
          <MenuItem key={option} onClick={handleSelect}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
