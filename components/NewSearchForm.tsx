import React, { useRef, useState, useEffect } from "react";
import { loadGoogleMapsApi } from "./GoogleApiLoader";

export default function NewSearchForm({
  road,
  setRoad,
  locality,
  setLocality,
  area,
  setArea,
  country,
  setCountry,
  setFullAddress,
  fullAddress,
  lat,
  lng,
  setLat,
  setLng,
  postalCode,
  setPostalCode,
  title,
  setTitle,
}: any) {
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    if (!apiLoaded) {
      loadGoogleMapsApi().then(() => {
        setApiLoaded(true);
      });
    }
  }, [apiLoaded]);

  const handlePlaceSelect = () => {
    const selectedPlace = autocompleteRef.current?.getPlace();
    if (!selectedPlace) {
      return;
    }
    console.log(selectedPlace);
    setTitle(selectedPlace.name);
    const lat = selectedPlace?.geometry?.location?.lat();
    const lng = selectedPlace?.geometry?.location?.lng();
    setLat(lat);
    setLng(lng);
    const formattedAddress = selectedPlace?.formatted_address;
    setFullAddress(formattedAddress);
    const addressDetails = selectedPlace.address_components;
    if (addressDetails) {
      for (let i = 0; i < addressDetails.length; i++) {
        if (addressDetails[i].types[0] == "postal_code") {
          setPostalCode(addressDetails[i].long_name);
        }
        if (addressDetails[i].types[0] == "country") {
          setCountry(addressDetails[i].long_name);
        }
        if (addressDetails[i].types[0] == "locality") {
          setLocality(addressDetails[i].long_name);
        }
        if (addressDetails[i].types[0] == "route") {
          setRoad(addressDetails[i].long_name);
        }
        if (addressDetails[i].types[0] == "administrative_area_level_2") {
          setArea(addressDetails[i].long_name);
        }
      }
    }
  };

  const handleAutocompleteLoad = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    autocompleteRef.current = autocomplete;
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  const autocompleteOptions: google.maps.places.AutocompleteOptions = {
    componentRestrictions: { country: "es" },
  };

  return (
    <div>
      {apiLoaded ? (
        <input
          type="text"
          placeholder="Search for your business"
          className="input-container"
          onKeyDown={handleInputKeyDown}
          ref={(input) => {
            if (input) {
              const newAutocomplete = new google.maps.places.Autocomplete(
                input,
                autocompleteOptions // pass the options object to the constructor
              );
              newAutocomplete.addListener("place_changed", handlePlaceSelect);
              handleAutocompleteLoad(newAutocomplete);
            }
          }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
