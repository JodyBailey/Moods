import { Button } from "@mui/material";

import GenericIcon from "../shared/GenericIcon";

type CreateEntryButtonProps = {
  onClick: () => void;
};

const CreateEntryButton = ({ onClick }: CreateEntryButtonProps) => {
  return (
    <div className="create-entry-btn-container d-flex position-fixed w-100">
      <Button sx={{ textTransform: "none" }} id="create-entry-btn" onClick={onClick}>
        <GenericIcon name={"plus"} additionalClasses={["create-entry-plus-icon"]} />
        Create Entry
      </Button>
    </div>
  );
};

export default CreateEntryButton;
