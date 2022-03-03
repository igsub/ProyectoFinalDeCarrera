import React, { useState, useEffect } from "react"
import Marker from "./Marker"
import GoogleMapReact from "google-map-react"

const MyGoogleMap = (props) => {
	let { mapState, setMapState, autocompleteState, setAutocompleteState } = props

	// const setCurrentLocation = () => {
	//     if ('geolocation' in navigator) {
	//         navigator.geolocation.getCurrentPosition((position) => {
	//             if (mapState.lat !== position.coords.latitude || mapState.lng !== position.coords.longitude){
	//                 setMapState({...mapState,
	//                     defaultCenter: [position.coords.latitude, position.coords.longitude],
	//                     lat: position.coords.latitude,
	//                     lng: position.coords.longitude
	//                 });
	//             }
	//         });
	//     }
	// }

	// useEffect(() => {
	//     if ('geolocation' in navigator) {
	//         navigator.geolocation.getCurrentPosition((position) => {
	//             if (mapState.lat !== position.coords.latitude || mapState.lng !== position.coords.longitude){
	//                 setMapState({...mapState,
	//                     center: [position.coords.latitude, position.coords.longitude],
	//                     lat: position.coords.latitude,
	//                     lng: position.coords.longitude
	//                 });
	//             }
	//         });
	//     }
	// })

	const onMarkerInteraction = (childKey, childProps, mouse) => {
		setMapState((prevMapState) => ({
			...prevMapState,
			draggable: true,
			lat: mouse.lat,
			lng: mouse.lng,
		}))
	}

	const onMarkerInteractionMouseUp = (childKey, childProps, mouse) => {
		setMapState((prevMapState) => ({ ...prevMapState, draggable: true }))
		generateAddress()
	}

	const onChange = ({ center, zoom }) => {
		setMapState((prevMapState) => ({
			...prevMapState,
			center: center,
			zoom: zoom,
		}))
	}

	const changeAutocompleteLocation = (lat, lng) => {
		const geocoder = mapState.mapApi ? new mapState.mapApi.Geocoder() : null
		if (geocoder) {
			geocoder.geocode({ location: { lat: lat, lng: lng } }).then(({ results }) => {
				if (results[0]) {
					setAutocompleteState((prevState) => ({
						...prevState,
						value: results[0].formatted_address,
						lat: lat,
						lng: lng,
					}))
				} else {
					window.alert("No se encontraron resultados")
				}
			})
		}
	}

	const onClick = (value) => {
		setMapState((prevMapState) => ({
			...prevMapState,
			lat: value.lat,
			lng: value.lng,
		}))

		changeAutocompleteLocation(value.lat, value.lng)
		console.log("MAP CLICK: ", value)
	}

	const apiHasLoaded = (map, maps) => {
		setMapState((prevMapState) => ({
			...prevMapState,
			mapApiLoaded: true,
			mapInstance: map,
			mapApi: maps,
		}))

		generateAddress()
	}

	const generateAddress = () => {
		const geocoder = mapState.mapApi ? new mapState.mapApi.Geocoder() : null

		if (geocoder) {
			geocoder.geocode({ location: { lat: mapState.lat, lng: mapState.lng } }, (results, status) => {
				if (status === "OK") {
					if (results[0]) {
						setMapState({
							...mapState,
							address: results[0].formatted_address,
						})
					} else {
						window.alert("No se encontraron resultados")
					}
				} else {
					window.alert("El Geocoder falló debido a: " + status)
				}
			})
		}
	}

	return (
		<>
			<GoogleMapReact
				center={mapState.center}
				zoom={mapState.zoom}
				draggable={mapState.draggable}
				onChange={onChange}
				onChildMouseDown={onMarkerInteraction}
				onChildMouseUp={onMarkerInteractionMouseUp}
				onChildMouseMove={onMarkerInteraction}
				onChildClick={() => console.log("child click")}
				onClick={onClick}
				bootstrapURLKeys={{
					key: process.env.REACT_APP_GOOGLE_API_KEY,
					libraries: ["places"],
				}}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
				styles={[
					{
						featureType: "all",
						elementType: "labels",
						stylers: [
							{
								visibility: "#on",
							},
						],
						flex: "1",
					},
				]}
			>
				<Marker text={mapState.address} lat={mapState.lat} lng={mapState.lng} />
			</GoogleMapReact>

			{/* <div className="info-wrapper">
            <div className="map-details">Latitude: <span>{mapState.lat}</span>, Longitude: <span>{mapState.lng}</span></div>
            <div className="map-details">Zoom: <span>{mapState.zoom}</span></div>
            <div className="map-details">Address: <span>{mapState.address}</span></div>
        </div> */}
		</>
	)
}

export default MyGoogleMap
