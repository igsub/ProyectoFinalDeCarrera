import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

const loadScript = (src, position, id) => {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const GoogleAutocomplete = (props) => {
  let {mapState, setMapState, autocompleteState, setAutocompleteState} = props
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  // if (typeof window !== 'undefined' && !loaded.current) {
  //   if (!document.querySelector('#google-maps')) {
  //     loadScript(
  //       `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
  //       document.querySelector('head'),
  //       'google-maps',
  //     );
  //   }

  //   loaded.current = true;
  // }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (autocompleteState.inputValue === '') {
      setAutocompleteState( as => ({...as, options: as.value ? [as.value] : []}));
      return undefined;
    }

    fetch({ input: autocompleteState.inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (autocompleteState.value) {
          newOptions = [autocompleteState.value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setAutocompleteState( as => ({ ...as, options: newOptions}));
      }
    });

    return () => {
      active = false;
    };
  }, [setAutocompleteState, autocompleteState.value, autocompleteState.inputValue, fetch]);

  const changeMapLocation = (placeId) => {
    const geocoder = mapState.mapApi? new mapState.mapApi.Geocoder() : null;
    if (geocoder) {
      geocoder.geocode({ 'placeId': placeId }).then(({results}) => {
        if (results[0]) {
          const newLat = results[0].geometry.location.lat();
          const newLng = results[0].geometry.location.lng();
          setMapState(prevState => (
            {...prevState, 
              address: results[0].formatted_address, 
              lat: newLat,
              lng: newLng,
              center: [newLat, newLng]
            }));
        } else {
          window.alert('No se encontraron resultados');
        }
      })
    }
  }

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: "100%" }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      noOptionsText={"No hay opciones"}
      filterOptions={(x) => x}
      options={autocompleteState.options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={autocompleteState.value}
      onChange={(event, newValue) => {
        const newOptions = newValue ? [newValue, ...autocompleteState.options] : autocompleteState.options;
        setAutocompleteState( as => ({...as, options: newOptions, value: newValue}));
        if (newValue) 
          changeMapLocation(newValue.place_id);
        console.log(newValue)
      }}
      onInputChange={(event, newInputValue) => {
        setAutocompleteState( as => ({ ...as, inputValue: newInputValue}));
      }}
      renderInput={(params) => (
        <TextField {...params} label="Ubicación" variant="standard" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}

export default GoogleAutocomplete;
