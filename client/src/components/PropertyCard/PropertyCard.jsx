import React from "react";
import './PropertyCard.css'
import {AiFillHeart} from 'react-icons/ai'
import {truncate} from 'lodash'
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";
const PropertyCard = ({card}) => {

  const listingType = card?.listingType || "sale";
  const priceValue = listingType === "rent" ? card?.rentPrice : card?.price;
  const priceLabel = listingType === "rent" ? "Rent" : "Price";
  const typeLabel = listingType === "rent" ? "Rentable flat" : "Selling flat";

  const navigate = useNavigate();
  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../properties/${card.id}`)}
    >
      <Heart id={card?.id}/>
      <img src={card.image} alt="home" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>{priceLabel}:</span>
        <span>{priceValue}</span>
      </span>
      <span className="secondaryText">{typeLabel}</span>
      <span className="primaryText">{truncate(card.title, {length: 15})}</span>
      <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
    </div>
  );
};

export default PropertyCard;
