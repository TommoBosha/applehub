import { Card } from "@mui/material";
import styled from "styled-components";


export const CardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(25, 118, 210, 0.1)",
  marginTop: "30px",
  transition: "box-shadow 0.3s ease-in-out", 
  "&:hover": {
    boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.425)", 
  },
}));

export const PaginationWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
});

 export const CardProductWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  marginTop: "30px",
  background: "rgba(25, 118, 210, 0.1)",
}));