"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CSSTransition from "react-transition-group/CSSTransition";

import SentimentIcon from "@/components/shared/SentimentIcon";
import { sentimentClasses, type SentimentScore } from "@/constants/sentimentMap";

export default function HomeHeader() {
  const baseSentiments: SentimentScore[] = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }, []);

  const [sentiment, setSentiment] = useState<SentimentScore>(9);
  const [availableSentiments, setAvailableSentiments] = useState<SentimentScore[]>(baseSentiments.slice(0, 8));
  const [inProp, setInProp] = useState<boolean>(true);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
    <div className="home-header-container">
      <CSSTransition classNames={"fade"} in={inProp} nodeRef={iconRef} timeout={1000} appear={true}>
        <div className="home-sentiment-container" ref={iconRef}>
          <SentimentIcon sentiment={sentiment} additionalClasses={["home-sentiment-icon", sentimentClasses[sentiment].text]} />
        </div>
      </CSSTransition>
      <div className="home-header-text-container">
        <h1 className="home-header-text">
          Add meaning to your <span className={`feelings-text ${sentimentClasses[sentiment].text}`}>feelings</span>{" "}
        </h1>
        <div className="d-flex justify-content-center align-items-center">
          <Button className="home-header-btn" id="home-register-btn" onClick={() => router.push("/register")}>
            Register
          </Button>
          <Button className="home-header-btn" id="home-login-btn" onClick={() => router.push("/login")}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
