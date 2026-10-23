import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import CSSTransition from "react-transition-group/CSSTransition";

import SentimentIcon from "../components/shared/SentimentIcon";
import { sentimentClasses, type SentimentScore } from "../constants/sentimentMap";

const Home = () => {
  const baseSentiments: SentimentScore[] = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }, []);

  const navigate = useNavigate();
  const [sentiment, setSentiment] = useState<SentimentScore>(9);
  const [availableSentiments, setAvailableSentiments] = useState<SentimentScore[]>(
    baseSentiments.slice(0, 8),
  );
  const [inProp, setInProp] = useState<boolean>(true);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSentimentTimer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 8);
      const newSentiment = availableSentiments[randomIndex];

      setSentiment(newSentiment);
      setAvailableSentiments(() => {
        const newAvailableSentiments = [...baseSentiments];

        // Remove the current sentiment from the available sentiments
        newAvailableSentiments.splice(newSentiment - 1, 1);

        return newAvailableSentiments;
      });
    }, 2000);

    const animationTimer = setInterval(() => {
      setInProp((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(updateSentimentTimer);
      clearInterval(animationTimer);
    };
  }, [availableSentiments, baseSentiments]);

  return (
    <Box>
      <div className="home-header-container">
        <CSSTransition
          classNames={"fade"}
          in={inProp}
          nodeRef={iconRef}
          timeout={1000}
          appear={true}
        >
          <div className="home-sentiment-container" ref={iconRef}>
            <SentimentIcon
              sentiment={sentiment}
              additionalClasses={["home-sentiment-icon", sentimentClasses[sentiment].text]}
            />
          </div>
        </CSSTransition>
        <div className="home-header-text-container">
          <h1 className="home-header-text">
            Add meaning to your{" "}
            <span className={`feelings-text ${sentimentClasses[sentiment].text}`}>feelings</span>{" "}
          </h1>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              className="home-header-btn"
              id="home-register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              className="home-header-btn"
              id="home-login-btn"
              onClick={() => navigate("login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="home-body-container">
        <h2 className="home-body-heading text-center">Keep track of your mood</h2>
        <Typography className="home-body-text text-center" variant="body1">
          Getting to understand what brings you joy and what gets you down begins with keeping track
          of the things that contribute to your mood!
        </Typography>
        <Typography className="home-body-text text-center" variant="body1">
          Keep a daily journal of you good each day is, what you felt during the day, what you did,
          and what contributed the most to your overall mood. Then, get a sense of how your mood has
          progressed, what contributed the most to a positice mood and what contributed the most to
          a negative mood.
        </Typography>
      </div>
    </Box>
  );
};

export default Home;
