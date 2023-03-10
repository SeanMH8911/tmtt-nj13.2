'use client'
import React, { useRef, useState } from 'react'
import {
  StandaloneSearchBox,
} from '@react-google-maps/api'




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
const bounds = {
  north: 29.5,
  south: 27.5,
  east: -13.5,
  west: -18.5,
};


  return (
    <>
       
        <StandaloneSearchBox
        onLoad={onSBLoad}
        onPlacesChanged={
            onPlacesChanged
        }
        bounds={bounds}
        >
      <input
        type="text"
        placeholder="Search for your business"
        className='input-container'
      />
        </StandaloneSearchBox>
  
    </>
  )
}