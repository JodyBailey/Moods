import { Box, Typography, Button } from "@mui/material";
import GenericIcon from "../shared/GenericIcon";

type NoEntriesProps = {
  onClick: () => void;
};

const NoEntries = ({ onClick }: NoEntriesProps) => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
      <GenericIcon name={"search"} additionalClasses={["no-entries-icon", "icon-medium"]} />
      <Typography variant="h4">You currently have no entries</Typography>
      <Button id="no-entries-create-btn" onClick={onClick}>
        Create your first entry!
      </Button>
    </Box>
  );
};

export default NoEntries;
