import React from "react";
import { FaStar } from "react-icons/fa";
import "./Card.css";

export default function StarRating({ rating, remainder }) {
  return (
    <div className="stars">
      {[...Array(rating)].map((star, index) => {
        return <FaStar key={index} size={20} className="yellow-stars" />;
      })}

      {[...Array(remainder)].map((star, index) => {
        return <FaStar key={index} size={20} className="gray-stars" />;
      })}
    </div>
  );
}
