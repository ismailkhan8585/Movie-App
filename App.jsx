import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import MovieScreen from './screens/MovieScreen';
import Personscreen from './screens/Personscreen';
import Searchscreen from './screens/Searchscreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Homescreen}
        />
        <Stack.Screen
          name="Movie"
          options={{headerShown: false}}
          component={MovieScreen}
        />
         <Stack.Screen
          name="person"
          options={{headerShown: false}}
          component={Personscreen}
        />
          <Stack.Screen
          name="search"
          options={{headerShown: false}}
          component={Searchscreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
