import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline';

import TrendingMovies from './components/Trendingmovies';
import MovieList from './components/MovieList';
import { styles1 } from './theme/color';
import { useNavigation } from '@react-navigation/native';
import LoadingScreeen from './LoadingScreeen';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../Api/MovieDb';

const ios = Platform.OS == 'ios';
const Homescreen = () => {
  const[trending,setTrending]= useState([])
  const[upcoming,setupcoming] = useState([])
  const[topRated,setTopRelated] = useState([])
  const[loading,setLoading]= useState(true)
  const navigation= useNavigation()

  useEffect(()=>{
    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  },[])

  const getTrendingMovies =async ()=>{
    const data = await fetchTrendingMovies();
    // console.log('this is Data',data)
    if(data && data.results) setTrending(data.results)
      setLoading(false)
  }
  const getUpcomingMovies =async ()=>{
    const data = await fetchUpcomingMovies();
    // console.log('UpComing Movies',data)
    if(data && data.results) setupcoming(data.results)
      
  }
  const getTopRatedMovies =async ()=>{
    const data = await fetchTopRatedMovies();
    console.warn('Top Realted Mvoies',data)
    if(data && data.results) setTopRelated(data.results)
     
  }
  return (
    <View style={styles.Search}>
      <SafeAreaView style={{marginBottom: ios ? -2 :3}}>
        <StatusBar barStyle="light-content" />
        <View style={styles.SecrchIcon}>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text style={styles.BarText}><Text style={styles1.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('search')}><MagnifyingGlassIcon size={30} strokeWidth={2} color='white'/> </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading?(
          <LoadingScreeen/>
        ):(
           <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:10}}>
    {/* Trending Movies carsole */}
      {trending.length> 0 &&  <TrendingMovies  data={trending}/>}
      <MovieList title='UpComing' data={upcoming}/>
      {/* Top rated Movies */}
      <MovieList title='Top Related' data={topRated}/>
      </ScrollView>
        )
      }

     
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  Search: {
    backgroundColor: '#27272A',
    flex: 1,
  },
  SecrchIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal: 16,
  },
  BarText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
