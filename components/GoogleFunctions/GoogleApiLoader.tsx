type GoogleMapsApi = typeof google.maps;
type googleMapsApiPromise = Promise<GoogleMapsApi>;

let googleMapsApiPromise: googleMapsApiPromise | null = null;

export const loadGoogleMapsApi = () => {
  if (!googleMapsApiPromise) {
    googleMapsApiPromise = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBtx6X2LcZwZ-H-eZlskR_G4wXuMAZCnLE&callback=Function.prototype&libraries=places`;
      script.onload = () => resolve(window.google.maps);
      document.body.appendChild(script);
    });
  }
  return googleMapsApiPromise;
};
