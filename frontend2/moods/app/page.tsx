import { Box, Typography } from "@mui/material";

import HomeHeader from "@/components/HomeHeader";

export default function Home() {
  return (
    <Box>
      <HomeHeader />
      <div className="home-body-container">
        <h2 className="home-body-heading text-center">Keep track of your mood</h2>
        <Typography className="home-body-text text-center" variant="body1">
          Getting to understand what brings you joy and what gets you down begins with keeping track of the things that contribute
          to your mood!
        </Typography>
        <Typography className="home-body-text text-center" variant="body1">
          Keep a daily journal of you good each day is, what you felt during the day, what you did, and what contributed the most
          to your overall mood. Then, get a sense of how your mood has progressed, what contributed the most to a positice mood
          and what contributed the most to a negative mood.
        </Typography>
      </div>
    </Box>
  );
}
