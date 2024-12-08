import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { imge500 } from '../../Api/MovieDb';

const { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.trendings}>
      <Text style={styles.trendingsText}>Trending Movies</Text>
      <Swiper
        loop
        autoplay
        autoplayTimeout={2.5}
        showsPagination={true}
        containerStyle={styles.swiperContainer}
      >
        {data.map((item, index) => (
          <MovieCard key={index} item={item} navigation={navigation} />
        ))}
      </Swiper>
    </View>
  );
};

const MovieCard = ({ item, navigation }) => {
  // console.log('item.poster_path:',item.poster_path);
  
  const handleClick = () => {
    navigation.navigate('Movie', item);
  };

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.movieCard}>
        <Image
          // source={require('../../assets/MovieImg.jpg')}
          source={{uri: imge500(item.poster_path)}}
          style={styles.movieImage}
        />
        <Text style={styles.movieText}>{item.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default TrendingMovies;

const styles = StyleSheet.create({
  trendings: {
    marginVertical: 20,
  },
  trendingsText: {
    color: 'white',
    marginHorizontal: 16,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  swiperContainer: {
    height: height * 0.45,
    width: width * 1,
  },
  movieCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
  },
  movieImage: {
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 10,
  },
  movieText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});
 