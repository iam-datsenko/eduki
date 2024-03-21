import React, {FC} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ParamList} from './types';
import HomeScreen from './screens/HomeScreen';
import SingleScreen from './screens/SingleScreen';

const Stack = createNativeStackNavigator<ParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#96D3D3',
  },
};

const App: FC = ({}) => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: 'black',
          headerShadowVisible: false,
          headerStyle: {backgroundColor: '#96D3D3'},
          headerTitleStyle: {fontSize: 22},
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: 'Welcome to Eduki!',
          }}
        />
        <Stack.Screen
          name="Single"
          component={SingleScreen}
          options={{
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
