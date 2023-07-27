import { Box, Input, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRef, useEffect } from "react";
const initialState = {
  county: "",
  region: "",
  city: "",
  street: "",
  houseNumber: "",
  apartamentNumber: "",
};

function UserAddress() {
  const [state, setState] = useState(initialState);
  const [street, setStreet] = useState("initialState");

  const AutoComplete = () => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
      componentRestrictions: { country: "ua" },
      fields: ["address_components", "geometry", "icon", "name"],
      types: ["establishment"],
    };
    useEffect(() => {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
    }, []);

    return (
      <>
        <Input
          variant="standard"
          label="Вулиця"
          value={street}
          type="text"
          inputRef={inputRef}
          onChange={(e) => {
            const value = e.target.value;
            setStreet(value);
          }}
        />
        <TextField
          variant="standard"
          label="Вулиця"
          value={state.street}
          type="text"
          inputRef={inputRef}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setState((prevState) => ({ ...prevState, street: value }));
          }}
        />
      </>
    );
  };
  return (
    <>
      <Box>
        <AutoComplete />
        <Typography>Адреса доставки</Typography>
        <Typography>{state.street}</Typography>
        <Box>
          <TextField
            variant="standard"
            label="Країна"
            value={state.county}
            type="text"
            required
            onChange={(e) => {
              const value = e.target.value;
              setState((prevState) => ({ ...prevState, county: value }));
            }}
          />
          <TextField
            variant="standard"
            label="Регіон"
            value={state.region}
            type="text"
            required
            onChange={(e) => {
              const value = e.target.value;
              setState((prevState) => ({ ...prevState, region: value }));
            }}
          />
          <TextField
            variant="standard"
            label="Місто"
            value={state.sity}
            type="text"
            required
            onChange={(e) => {
              const value = e.target.value;
              setState((prevState) => ({ ...prevState, sity: value }));
            }}
          />
          <TextField
            variant="standard"
            label="Вулиця"
            value={state.street}
            type="text"
            required
            onChange={(e) => {
              const value = e.target.value;
              setState((prevState) => ({ ...prevState, street: value }));
            }}
          />
          <TextField
            variant="standard"
            label="Номер будинку"
            value={state.houseNumber}
            type="text"
            required
            onChange={(e) => {
              const value = e.target.value;
              setState((prevState) => ({ ...prevState, houseNumber: value }));
            }}
          />
          <TextField
            variant="standard"
            label="Номер квартири"
            value={state.apartamentNumber}
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              setState((prevState) => ({
                ...prevState,
                apartamentNumber: value,
              }));
            }}
          />
        </Box>
      </Box>
    </>
  );
}

export default UserAddress;
