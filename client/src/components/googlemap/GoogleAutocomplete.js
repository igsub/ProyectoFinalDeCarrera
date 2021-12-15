import React, { useState } from "react";
import MUIPlacesAutocomplete, {
    geocodeByPlaceID, geocodeBySuggestion
  } from 'mui-places-autocomplete';

const GoogleAutocomplete = () => {
    const [autocompleteState, setAutocompleteState] = useState({ open: false, coordinates: null, errorMessage: null })

    const onSuggestionSelected = async (suggestion) => {
        geocodeBySuggestion(suggestion).then((results) => {
            if (results.length < 1) {
              setAutocompleteState({
                ...autocompleteState,
                open: true,
                errorMessage: 'Geocode request completed successfully but without any results',
              })
      
              return
            }
        // Just use the first result in the list to get the geometry coordinates
        const { geometry } = results[0]

        const coordinates = {
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
        }

        // Add your business logic here. In this case we simply set our state to show our <Snackbar>.
        setAutocompleteState({ ...autocompleteState, open: true, coordinates })
        }).catch((err) => {
        setAutocompleteState({ ...autocompleteState, open: true, errorMessage: err.message })
        })
    }

    return <MUIPlacesAutocomplete onSuggestionSelected={onSuggestionSelected} renderTarget={}/>
}

export default GoogleAutocomplete;