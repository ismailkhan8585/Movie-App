import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {XMarkIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import LoadingScreeen from './LoadingScreeen';
import debounce from 'lodash/debounce';
import {fallbackPersonImge, imge185, serchMovies} from '../Api/MovieDb';

const {width, height} = Dimensions.get('window');

const Searchscreen = () => {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  const handleSearch = value => {
    // console.log('Value:', value);
    if (value && value.length > 2) {
      setLoading(true);
      serchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then(data => {
        setLoading(false);
        // console.log('Got Values:', data);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebunce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#262626'}}>
      <View style={styles.serchcss}>
        <TextInput
          onChangeText={handleTextDebunce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          style={styles.textinput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            borderRadius: 9999,
            padding: 12,
            margin: 4,
            backgroundColor: '#6B7280',
          }}>
          <XMarkIcon size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Results */}
      {loading ? (
        <LoadingScreeen />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 15}}
          style={{marginBottom: 12}}>
          <Text style={styles.results}>Results({results.length})</Text>
          <View style={styles.result}>
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}>
                  <View style={styles.SerchHeader}>
                    <Image
                      // source={require('../assets/MovieImg.jpg')}
                      source={{
                        uri: imge185(item?.poster_path) || fallbackPersonImge,
                      }}
                      style={[
                        styles.MovieImg,
                        {width: width * 0.44, height: height * 0.3},
                      ]}
                    />
                    <Text style={styles.MovieText}>
                      {item?.title?.length > 22
                        ? item?.title.slice(0, 22) + '...'
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={require('../assets/screenEmpty.jpg')}
            style={{width: 384, height: 384}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Searchscreen;

const styles = StyleSheet.create({
  serchcss: {
    marginHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 9999,
  },

  textinput: {
    paddingBottom: 4,
    paddingLeft: 24,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  results: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  SerchHeader: {
    marginBottom: 16,
  },
  MovieImg: {
    borderRadius: 24,
  },
  MovieText: {
    color: '#A3A3A3',
    marginLeft: 4,
  },
});
