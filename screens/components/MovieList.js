import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';

import { styles1 } from '../theme/color';
import { fallbackMoviePoster, imge185 } from '../../Api/MovieDb';

let {width, height} = Dimensions.get('window');
const MovieList = ({title, data,hideSeeAll}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
      <View
        style={{
          marginHorizontal: 16,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, color: 'white', marginBottom:10}}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
          <Text style={[styles1.text, {transform: [{scale: 1.2}]}]}>
            See All
          </Text>
        </TouchableOpacity>
          )
        }
       
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View style={{marginRight:16,marginBottom:4}}>
                <Image
                 source={{uri: imge185(item.poster_path) || fallbackMoviePoster}}
                  style={styles.MovieImg}
                />
                <Text style={styles.MovieText}>{item.title.length>14 ? item. title. slice(0,14)+'...':item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  MovieText: {
    color: '#D1D5DB',
    marginLeft: 10,
  },
  MovieImg: {
    borderRadius: 20,
    width: width * 0.33,  // 20% of the screen width
    height: height * 0.22, // Example height, adjust as needed
    
  },
});
