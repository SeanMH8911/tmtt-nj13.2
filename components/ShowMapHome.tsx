'use client'
import { Venue } from '@/types/typings'
import {
  GoogleMap, LoadScript, Marker,MarkerClusterer, MarkerClustererF,
} from '@react-google-maps/api'



// ********************************************
// ********************************************
// ********************************************
// Markers not showing up needs to be addressed
// ********************************************
// ********************************************
// ********************************************



type Props = 
{
    venues: Venue
}

function ShowMapHome({venues}:Props ) {
    
 const mapContainerStyle = {
  height: '400px',
  width: '100%',
}

const center = { lat: 28.1012584, lng: -16.7556217 }



const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png'
}



    return (
        <>
        {venues && (
        <LoadScript
        googleMapsApiKey="AIzaSyBtx6X2LcZwZ-H-eZlskR_G4wXuMAZCnLE"
        libraries={["places"]} 
        >
            <GoogleMap id='marker-example' mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
                    <MarkerClustererF options={options}>
                {(clusterer) =>
                    venues.map((venue: Venue) => (
                    <Marker key={venue.id}  clusterer={clusterer} position={{lat: venue.lat, lng: venue.lng}} />
                    ))
                }
                </MarkerClustererF>
            </GoogleMap>
        </LoadScript>
                )}
        </>
        )
    }
export default ShowMapHome