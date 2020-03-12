import React from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Linking, Dimensions } from 'react-native';

function Map({region, onRegionChangeComplete, places}){

  const renderMarkers = () => {
    if(places){
      return places.map(place => {
        return (
          <Marker key={place.id} coordinate={place.coords}>
            <Callout>
              <Text>{place.name}, {place.price}</Text>
              <Text>{place.rating} stars - {place.review_count} reviews</Text>
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(place.url)}
              >
                Link

              </Text>
            </Callout>
          </Marker>
        )
      })
    } else {
      return [];
    }

  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {renderMarkers()}
      </MapView>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map
