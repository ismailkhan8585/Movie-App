import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {fallbackPersonImge, imge185} from '../../Api/MovieDb';

const Cast = ({cast, navigation}) => {
  // console.log("shows the CastDatar:",cast)

  return (
    <View style={{marginVertical: 24}}>
      <Text style={styles.header}>Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('person', person)}
                key={index}
                style={{marginRight: 16, alignItems: 'center'}}>
                <View
                  style={{
                    overflow: 'hidden',
                    borderRadius: 50,
                    height: 80,
                    width: 80,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#A0AEC0',
                  }}>
                  <Image
                    style={styles.ImageStyle}
                    source={{
                      uri: imge185(person?.profile_path) || fallbackPersonImge,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    lineHeight: 16,
                    marginTop: 1,
                  }}>
                  {person?.character?.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>

                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    lineHeight: 16,
                    marginTop: 1,
                  }}>
                  {person.original_name.length > 10
                    ? person.original_name.slice(0, 10) + '...'
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 20,
    color: 'white',
  },
  HeaderText: {
    color: 'white',
    marginTop: 1,
    fontSize: 12,
  },
  ImageStyle: {
    borderRadius: 50,
    height: 80,
    width: 80,
    borderColor: '#A0AEC0',
    borderWidth: 4,
  },
});
