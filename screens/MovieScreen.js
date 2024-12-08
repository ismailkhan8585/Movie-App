import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {styles1, theme} from './theme/color';
import LinearGradient from 'react-native-linear-gradient';
import Cast from './components/Cast';
import MovieList from './components/MovieList';
import LoadingScreeen from './LoadingScreeen';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarDetails,
  imge500,
} from '../Api/MovieDb';

let {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';


const MovieScreen = () => {
 
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // call the movie details api
    // console.log('itemid:', item.id);
    setLoading(true);
    getMovieDeatils(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id)
  }, [item]);

  const getMovieDeatils = async id => {
    const data = await fetchMovieDetails(id);
    // console.log('Got Movies Deatils:',data);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async id =>{
    const data = await fetchMovieCredits(id);
    // console.log('get Movie Cardets cast:', data);
    if(data && data.cast) setCast(data.cast)
  };

  const getSimilarMovies = async id =>{
    const data = await fetchSimilarDetails(id);
    // console.log('get Similar Movies Deatils:', data);
    if(data && data.results) setSimilarMovies(data.results)
  };

  
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      style={{flex: 1, backgroundColor: '#111827'}}>
      {/* Back Button  Movie Poster*/}
      <View style={styles.content}>
        <SafeAreaView style={styles.contentInner}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles1.background,
              styles.iconBox,
              ios ? {} : {marginTop: 12},
            ]}>
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <LoadingScreeen />
        ) : (
          <View>
            <Image
              // source={require('../assets/its-movie-time-vector.jpg')}
              source={{uri: imge500(movie?.poster_path) || fallbackMoviePoster}}
              style={{width, height: height * 0.55}}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={[{width, height: height * 0.4}, styles.linears]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
            />
          </View>
        )}
      </View>
      {/* Movie Datils */}
      <View style={{marginTop: -(height * 0.1)}}>
        {/* Title */}
        <Text style={styles.MovieText}>{movie?.title}</Text>
        {/* Status, Release, runTime  */}
        {movie?.id ? (
          <Text style={styles.MovieInformation}>
            {movie?.status}. {movie?.release_date?.split('-')[0]}
            {movie?.runtime}min
          </Text>
        ) : null}

        {/* geners */}
        <View style={styles.geners}>
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} style={styles.genersText}>
                {genre?.name} {showDot ? '.' : null}
              </Text>
            );
          })}
        </View>

        {/* Description */}
        <Text style={styles.description}>{movie?.overview}</Text>
      </View>
      {/* Cast */}
      {cast.length>0 &&  <Cast navigation={navigation} cast={cast} />}
      {/* Similar Movies */}
      {similarMovies.length> 0  &&  <MovieList title='Similar MOvies' hideSeeAll={true} data={similarMovies}/>}
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  contentInner: {
    position: 'absolute',
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconBox: {
    borderRadius: 12,
    padding: 4,
  },
  linears: {
    position: 'absolute',
    bottom: 0,
  },
  MovieText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 5,
  },
  MovieInformation: {
    color: '#A0AEC0',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  geners: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 5,
    marginRight: 8,
  },
  genersText: {
    color: '#9CA3AF',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  description: {
    color: '#9CA3AF',
    marginHorizontal: 16,
    letterSpacing: 0.5,
    textAlign: 'justify',
  },
});
