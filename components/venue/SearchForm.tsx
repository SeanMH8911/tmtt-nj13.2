'use client'
import React, { useRef, useState } from 'react'
import {
  useLoadScript,
  LoadScriptProps, 
  Autocomplete,
  StandaloneSearchBox,
  LoadScript,
  GoogleMap,
} from '@react-google-maps/api'

type Props = {
    address: string;
    setAddress: string;
    newAddress:string;
    setNewAddress:string;
    latlng:number;
    setLatlng:string;
    postalCode: string;
    setPostalCode: string;
    road: string;
    setRoad: string;
    locality: string ;
    setLocality: string;
    area: string;
    setArea: string;
    country: string;
    setCountry: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const libraries = ["places"];

export default function SearchForm({  
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
    setTitle
}: any) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
    const [searchBox, setSearchBox] = useState(null);
    const onPlacesChanged = () => {
    const data = searchBox.getPlaces()
    console.log(data);
    
    const locationInfo = data[0]
    setTitle(locationInfo.name)
    console.log(locationInfo.name);
    const lat = locationInfo.geometry.location.lat()
    const lng = locationInfo.geometry.location.lng()
    setLat(lat)
    setLng(lng)
    const formattedAddress = locationInfo.formatted_address
    setFullAddress(formattedAddress)
    const addressDetails = locationInfo.address_components
    for (let i = 0; i< addressDetails.length; i++){
        
        if(addressDetails[i].types == 'postal_code'){
            setPostalCode(addressDetails[i].long_name)
        }
        if(addressDetails[i].types[0] == 'country'){
            setCountry(addressDetails[i].long_name)
        }
        if(addressDetails[i].types[0] == 'locality'){
            setLocality(addressDetails[i].long_name)
        }
        if(addressDetails[i].types == 'route'){
            setRoad(addressDetails[i].long_name)
        }
        if(addressDetails[i].types[0] == 'administrative_area_level_2'){
            setArea(addressDetails[i].long_name)
        }
    }
    
    
    
  };
  const onSBLoad = ref => {
    setSearchBox(ref);
  };
  return (
    <>
       <LoadScript
        googleMapsApiKey="AIzaSyBtx6X2LcZwZ-H-eZlskR_G4wXuMAZCnLE"
        
        libraries={libraries} 
        >
        <StandaloneSearchBox
        onLoad={onSBLoad}
        onPlacesChanged={
            onPlacesChanged
        }
        >
      <input
        type="text"
        placeholder="Search for your business"
        className='input-container'
      />
        </StandaloneSearchBox>
    </LoadScript>
    </>
  )
}