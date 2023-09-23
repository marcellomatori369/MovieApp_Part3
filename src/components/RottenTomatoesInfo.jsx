import React, { useEffect, useState } from "react";

const rottenTomatoesURL = import.meta.env.VITE_ROTTEN_TOMATOES_API;

const RottenTomatoesInfo = ({ movie }) => {
  const [rottenImg, setRottenImg] = useState("/Rotten_Tomatoes_grey.png");
  const [rottenScore, setRottenScore] = useState("-.-");

  useEffect(() => {
    const fetchRottenTomatoesData = async () => {
      const rottenTomatoesApiKey = import.meta.env.VITE_ROTTEN_TOMATOES_API_KEY;
      const url = `${rottenTomatoesURL}/?t=${movie.original_title}&y=${movie.release_date.substring(0, 4)}&${rottenTomatoesApiKey}`;

      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.Ratings && data.Ratings.length > 0) {
            const rottenRating = data.Ratings.find(
              (rating) => rating.Source === "Rotten Tomatoes"
            )?.Value.replace(/%/, "");

            if (rottenRating >= 75) {
              setRottenImg("/Certified_Fresh.png");
              setRottenScore(data.Ratings.find((rating) => rating.Source === "Rotten Tomatoes").Value);
            } else if (rottenRating >= 60 && rottenRating < 75) {
              setRottenImg("/Rotten_Tomatoes.png");
              setRottenScore(data.Ratings.find((rating) => rating.Source === "Rotten Tomatoes").Value);
            } else if (rottenRating > 0 && rottenRating < 60) {
              setRottenImg("/splash.png");
              setRottenScore(data.Ratings.find((rating) => rating.Source === "Rotten Tomatoes").Value);
            }
          }
        } else {
          console.error("Erro ao buscar dados do Rotten Tomatoes.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do Rotten Tomatoes:", error);
      }
    };

    fetchRottenTomatoesData();
  }, [movie]);

  return (
    <div  className="rotten-container">
        <img src={rottenImg} width="60" height="60" alt="Rotten Tomatoes" />
        <h3>{rottenScore}</h3>
    </div>
  );  
};

export default RottenTomatoesInfo;
