import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  minHeight: "375px",
  borderRadius: "12px",
  border: "1px solid #fff",
  boxShadow: "0 3px 10px rgb(255 255 255 / .5)",
  margin: "1rem",
};

export default function GoogleMaps({ latitude, longitude }) {
  console.log(latitude, longitude);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_KEY, // ,
    // ...otherOptions
  });
  return (
    <>
      <GoogleMap mapContainerStyle={containerStyle} zoom={8} center={{ lat: latitude, lng: longitude }}>
        {/* Child components, such as markers, info windows, etc. */}
        <MarkerF position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </>
  );
}
