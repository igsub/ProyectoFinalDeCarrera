import React, { useState, useEffect } from "react";
import AutoComplete from './Autocomplete';
import Marker from './Marker';
import GoogleMapReact from 'google-map-react';

const MyGoogleMap = () => {

    const [mapState, setMapState] = useState({
        mapApiLoaded: false,
        mapInstance: null,
        mapApi: null,
        geoCoder: null,
        places: [],
        center: [],
        zoom: 12,
        address: '',
        draggable: true,
        lat: null,
        lng: null
    });

    const setCurrentLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                if (mapState.lat !== position.coords.latitude || mapState.lng !== position.coords.longitude){
                    setMapState({...mapState,
                        center: [position.coords.latitude, position.coords.longitude],
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                }
            });
        }
    }
    
    useEffect(() => setCurrentLocation() ,[]);

    const onMarkerInteraction = (childKey, childProps, mouse) => {
        setMapState({ ...mapState, 
            draggable: true,
            lat: mouse.lat,
            lng: mouse.lng
        });
    }
    const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
        setMapState({ ...mapState,  draggable: true });
        generateAddress();
    }

    const onChange = ({ center, zoom }) => {
        setMapState({ ...mapState, 
            center: center,
            zoom: zoom,
        });
        console.log("MAP STATE: ",mapState)
    }

    const onClick = (value) => {
        setMapState({ ...mapState, 
            lat: value.lat,
            lng: value.lng
        });
    }

    const apiHasLoaded = (map, maps) => {
        setMapState({ ...mapState, 
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
        });

        generateAddress();
    };

    const addPlace = (place) => {
        setMapState({ ...mapState, 
            places: [place],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
        generateAddress();
    };

    const generateAddress = () => {

        const geocoder = mapState.mapApi? new mapState.mapApi.Geocoder : null;

        if (geocoder){ 
            geocoder.geocode({ 'location': { lat: mapState.lat, lng: mapState.lng } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    setMapState({...mapState, address: results[0].formatted_address });
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
        }
    }

     return (<>{mapState.mapApiLoaded && (
                    <div>
                        <AutoComplete map={mapState.mapInstance} mapApi={mapState.mapApi} addplace={addPlace} mapState={mapState} setMapState={setMapState} />
                    </div>
                )}
                <GoogleMapReact
                    center={mapState.center}
                    zoom={mapState.zoom}
                    draggable={mapState.draggable}
                    onChange={onChange}
                    onChildMouseDown={onMarkerInteraction}
                    onChildMouseUp={onMarkerInteractionMouseUp}
                    onChildMouseMove={onMarkerInteraction}
                    onChildClick={() => console.log('child click')}
                    onClick={onClick}
                    bootstrapURLKeys={{
                        key: 'AIzaSyAhpAjTLApg_9yjc7Kkp0EVM4WFEonZlnw',
                        libraries: ['places', 'geometry'],
                    }}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
                    draggable
                >
                    <Marker
                        text={mapState.address}
                        lat={mapState.lat}
                        lng={mapState.lng}
                    />
                </GoogleMapReact>
                
                <div className="info-wrapper">
                    <div className="map-details">Latitude: <span>{mapState.lat}</span>, Longitude: <span>{mapState.lng}</span></div>
                    <div className="map-details">Zoom: <span>{mapState.zoom}</span></div>
                    <div className="map-details">Address: <span>{mapState.address}</span></div>
                </div>
     </>)
}

export default MyGoogleMap;