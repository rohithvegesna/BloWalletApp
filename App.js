import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Header} from 'react-native-elements';
import {name as appName} from './app.json';
import HomePage from './pages/Home';
import Cards from './pages/Cards';
import Mycards from './pages/Mycards';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <>
      <View>
        <Header
          centerComponent={{
            text: appName,
            style: {
              fontWeight: 'bold',
              height: '100%',
              color: '#fff',
            },
          }}
        />
      </View>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Cards" component={Cards} />
          <Tab.Screen name="My Cards" component={Mycards} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
