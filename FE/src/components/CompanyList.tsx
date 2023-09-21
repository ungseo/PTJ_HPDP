import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as Interfaces from "../interface/apiDataInterface";
import ImageList from "@mui/material/ImageList";
import CompanyItem from "./CompanyItem";

import { getCompaniesInfo } from "../api/companies";

export default function CompanyList() {
  const [companyData, setCompanyData] = useState<
    Interfaces.InSearchCompanyInfoResponseInterface[]
  >([]);
  const [keyword, setkeyword] = useState("");
  const accessToken = useSelector((state: any) => state.user.auth.accessToken);
  console.log(accessToken);
  useEffect(() => {
    getCompaniesInfo(
      keyword,
      accessToken,
      (res) => {
        setCompanyData(res.data.data);
        console.log("API연결");
      },
      (err) => {
        console.error("API 호출 실패:", err);
      }
    );
  }, []);

  return (
    <ImageList>
      {itemData.map((item, index) => (
        <CompanyItem key={index} item={item} />
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
