import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles1, theme} from './theme/color';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {useNavigation, useRoute} from '@react-navigation/native';

import MovieList from './components/MovieList';
import {defaultBirthday, fallbackPersonImge, fetchPersonDeatils, fetchPersonMovies, imge342} from '../Api/MovieDb';

let {width, height} = Dimensions.get('window');
const ios = Platform.ios == 'ios';

const Personscreen = () => {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState({});
  const navigate = useNavigation();

  useEffect(() => {
    setLoading(true);
    // console.log('Person data:', item);
    getPersonDetails(item.id);
    getPersonMovies(item.id)
  }, [item]);

  const getPersonDetails = async id => {
    const data = await fetchPersonDeatils(id);
    // console.log('Got Person Deatils:', data);
    if (data) setPerson(data);
    setLoading(false);
  };

  
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    console.log('get Person Movies:', data);
    if (data && data.cast) setPersonMovies(data.cast);
    // setLoading(false);
  };
  return (
    <ScrollView style={styles.header}>
      <SafeAreaView
        style={[
          styles.contentInner,
          Platform === 'ios' ? {} : {marginVertical: 12},
        ]}>
        <TouchableOpacity
          onPress={() => navigate.goBack()}
          style={[
            styles1.background,
            styles.iconBox,
            ios ? {} : {marginTop: 12},
          ]}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Person Details */}
      <View>
        <View style={[styles.personDetils]}>
          <View style={styles.ImageRounded}>
            <Image
              source={{
                uri: imge342(person?.profile_path || fallbackPersonImge),
              }}
              style={styles.MenImage}
            />
          </View>
        </View>
        <View style={{marginTop: 12}}>
          <Text style={styles.personlocation}>{person?.name}</Text>
          <Text style={styles.personlocation}>{person?.place_of_birth}</Text>
        </View>
        <View style={styles.personInfor}>
          <View style={styles.gender}>
            <Text style={styles.labelText}>
              {person?.gender == 1 ? 'female' : 'Male'}
            </Text>
            <Text style={styles.valueText}>Male</Text>
          </View>
          <View style={styles.gender}>
            <Text style={styles.labelText}>Birthday</Text>
            <Text style={styles.valueText}>
              {person?.birthday || defaultBirthday}
            </Text>
          </View>

          <View style={styles.gender}>
            <Text style={styles.labelText}>Known For</Text>
            <Text style={styles.valueText}>{person?.known_for_department}</Text>
          </View>
          <View style={[styles.gender, styles.noBorder]}>
            <Text style={styles.labelText}>Popularity</Text>
            <Text style={styles.valueText}>
              {person?.popularity?.toFixed(2)}%
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 24, marginHorizontal: 16}}>
          <Text style={{color: 'white', fontSize: 18}}>Biography</Text>
          <Text style={{color: '#9CA3AF', letterSpacing: 1}}>
           {person?.biography ||'N/A'}
          </Text>
        </View>
        <MovieList data={personMovies} title={'Movies'} hideSeeAll={true} />
      </View>
    </ScrollView>
  );
};

export default Personscreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#171717',
  },
  contentInner: {
    zIndex: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  personDetils: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  MenImage: {
    height: height * 0.43,
    width: width * 0.74,
  },
  ImageRounded: {
    alignItems: 'center',
    borderRadius: 9999,
    overflow: 'hidden',
    height: 250,
    width: 250,
    borderWidth: 1,
    borderColor: '#737373',
  },
  personText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  personlocation: {
    textAlign: 'center',
    color: '#737373',
    fontSize: 16,
  },
  personInfor: {
    marginHorizontal: 12,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3f3f46',
    borderRadius: 9999,
    padding: 16,
    overflow: 'hidden',
  },
  gender: {
    borderRightWidth: 2,
    borderRightColor: '#9CA3AF',
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  noBorder: {
    borderRightWidth: 0,
  },
  labelText: {
    color: '#d4d4d8',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
});
