import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Map from '../components/Map';

function MapScreen(){

  const [region, setRegion] = useState({
    latitude: 39.61958111336315,
    longitude: -122.02954894805048,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  })
  const [error, setError] = useState('');
  const [places, setPlaces] = useState([]);

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  }

  const getLocation = async () => {
    let location = await LocationService.getUserLocation();
    await setRegion({...location, latitudeDelta: 0.05, longitudeDelta: 0.05})
  }

  const getPlaces = async (region) => {
    let places = await PlacesService.getData(region);
    await setPlaces(places);
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    getPlaces(region)
    // console.log('ran!');
  }, [region])

  return (
    <View style={styles.container}>
      <Map
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        places={places}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default MapScreen;
