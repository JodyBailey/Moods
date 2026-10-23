import { useState, type Dispatch, type SetStateAction } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Menu, MenuItem } from "@mui/material";

type MenuSelectProps = {
  setOpenEntry: Dispatch<SetStateAction<boolean>>;
  setOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
  additionalClasses: string[];
};

export default function MenuSelect({ setOpenEntry, setOpenDeleteModal, additionalClasses }: MenuSelectProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const options = ["Edit", "Delete"];
  const isMenuOpen = !!anchor;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchor(e.currentTarget);
  };

  const handleSelect = (option: string) => {
    if (option === "Edit") {
      setOpenEntry(true);
    } else if (option === "Delete") {
      setOpenDeleteModal(true);
    }

    setAnchor(null);
  };

  return (
    <div className={`entry-menu-select d-flex align-items-center ${additionalClasses.join(" ")}`}>
      <IconButton
        onClick={handleClick}
        aria-label="Entry Menu"
        aria-expanded={isMenuOpen ? "true" : "false"}
        aria-controls={isMenuOpen ? "long-menu" : ""}
        aria-haspopup="true"
      >
        <MoreVertIcon sx={{ color: "white" }} />
      </IconButton>
      <Menu open={isMenuOpen} anchorEl={anchor} onClose={handleSelect}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleSelect(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
