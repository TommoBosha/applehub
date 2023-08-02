import React, { useEffect, useRef, useState } from "react";
import options from "./optionsAdress";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { styles } from "./styles";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { apiKey, db } from "../../../firebase/config";
import { useSelector } from "react-redux";
import { getUserId } from "../../../redux/auth/authSelectors";

const initialState = {
  region: "",
  city: "",
  street: "",
  houseNumber: "",
  apartamentNumber: "",
};

function AddUserAddress({ closeAddAddress }) {
  const mapRef = useRef(null);
  const regionInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const [state, setState] = useState(initialState);
  const userId = useSelector(getUserId);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initMap() {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 50.450001, lng: 30.523333 },
      zoom: 13,
      mapTypeControl: false,
    });

    const marker = new window.google.maps.Marker({
      position: { lat: 50.450001, lng: 30.523333 },
      map: map,
    });

    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      map.setCenter({ lat: latitude, lng: longitude });
      marker.setPosition({ lat: latitude, lng: longitude });
    });

    const autocompleteOptions = {
      ...options,
      bounds: map.getBounds(),
      strictBounds: false,
    };

    const regionAutocomplete = new window.google.maps.places.Autocomplete(
      regionInputRef.current,
      autocompleteOptions
    );

    const cityAutocomplete = new window.google.maps.places.Autocomplete(
      cityInputRef.current,
      autocompleteOptions
    );

    const streetAutocomplete = new window.google.maps.places.Autocomplete(
      streetInputRef.current,
      autocompleteOptions
    );

    function handlePlaceChange(autocomplete, field) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(20);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        const { region, city, street } = extractAddressComponents(place);

        if (field === "region") {
          setState((prevState) => ({ ...prevState, region }));
        } else if (field === "city") {
          setState((prevState) => ({ ...prevState, city }));
        } else if (field === "street") {
          setState((prevState) => ({ ...prevState, street }));
        }
      }
    }

    regionAutocomplete.addListener("place_changed", () => {
      handlePlaceChange(regionAutocomplete, "region");
    });

    cityAutocomplete.addListener("place_changed", () => {
      handlePlaceChange(cityAutocomplete, "city");
    });

    streetAutocomplete.addListener("place_changed", () => {
      handlePlaceChange(streetAutocomplete, "street");
    });
  }

  function extractAddressComponents(place) {
    let region = "";
    let city = "";
    let street = "";

    for (const component of place.address_components) {
      const types = component.types;
      if (types.includes("administrative_area_level_1")) {
        region = component.long_name;
      } else if (types.includes("locality")) {
        city = component.long_name;
      } else if (types.includes("route")) {
        street = component.long_name;
      }
    }

    return {
      region,
      city,
      street,
    };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    const addresses = userData?.addresses ?? [];

    const newAddress = {
      region: state.region,
      city: state.city,
      street: state.street,
      houseNumber: state.houseNumber,
      apartamentNumber: state.apartamentNumber,
    };

    const updatedAddresses =
      addresses.length === 0
        ? [{ ...newAddress }]
        : [...addresses, { ...newAddress }];

    await updateDoc(userDocRef, {
      addresses: updatedAddresses,
    });
    closeAddAddress();
    setState(initialState);
  };

  return (
    <>
      <FormControl sx={styles.form}>
        <TextField
          variant="standard"
          id="region-input"
          label="Область"
          name="region"
          value={state.region}
          type="text"
          required
          inputRef={regionInputRef}
          sx={styles.boxInput}
          onChange={(e) => setState({ ...state, region: e.target.value })}
        />
        <TextField
          variant="standard"
          id="city-input"
          label="Місто"
          name="city"
          value={state.city}
          type="text"
          required
          inputRef={cityInputRef}
          sx={styles.boxInput}
          onChange={(e) => setState({ ...state, city: e.target.value })}
        />
        <TextField
          variant="standard"
          id="street-input"
          label="Вулиця"
          name="street"
          value={state.street}
          type="text"
          required
          inputRef={streetInputRef}
          sx={styles.boxInput}
          onChange={(e) => setState({ ...state, street: e.target.value })}
        />
        <TextField
          variant="standard"
          id="houseNumber-input"
          label="Номер будинку"
          name="houseNumber"
          value={state.houseNumber}
          type="text"
          required
          sx={styles.boxInput}
          onChange={(e) => setState({ ...state, houseNumber: e.target.value })}
        />
        <TextField
          variant="standard"
          id="apartamentNumber-input"
          label="Номер квартири"
          name="apartamentNumber"
          value={state.apartamentNumber}
          type="text"
          sx={styles.boxInput}
          onChange={(e) =>
            setState({ ...state, apartamentNumber: e.target.value })
          }
        />
        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit}
          sx={styles.button}
        >
          Додати адресу
        </Button>
        <Button
          type="submit"
          variant="outlined"
          onClick={() => closeAddAddress()}
          sx={styles.button}
        >
          Назад
        </Button>
        <Box
          id="map"
          ref={mapRef}
          style={{ width: "100%", height: "200px", marginTop: "16px" }}
        />
      </FormControl>
    </>
  );
}
export default AddUserAddress;
