// Import necessary components and libraries
import React, { useEffect,useState } from 'react';
import { View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import AuthService from './src/Services/Auth';
import NavigationService from './src/Services/Navigation';
import Login from './src/Screens/Auth/Login';
import LoginOTP from './src/Screens/Auth/LoginOTP';
import UserLogin from './src/Screens/Auth/UserLogin';
import UserRegister from './src/Screens/Auth/UserRegister';
import DrawerNavigation from './src/Navigations/DrawerNavigation';
import BottomTab from './src/Navigations/BottomTab';
import Home from './src/Screens/Home/Home';
import Message from './src/Screens/Message';
import MyAccount from './src/Screens/MyAccount/MyAccount';
import Help from './src/Screens/Help/Help';
import CategoryScreen from './src/Screens/Home/CategoryScreen/CategoryScreen';
import SubCategoryScreen from './src/Screens/Home/SubCategoryScreen.js/SubCategoryScreen';
import { setuser } from './src/Redux/reducer/User';

const { height, width } = Dimensions.get('screen');
const Stack = createStackNavigator();

const App = () => {
  const { login_status } = useSelector(state => state.User);
  const [activeuser,setActiveUser]= useState('')
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const result = await AuthService.getAccount();
      setActiveUser(result)
      if (result) {
        dispatch(setuser(result));
        console.log('jSGDKJfgkLAGKJGkjgkjbjkbjkbk',result);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={r => NavigationService.setTopLevelNavigator(r)}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.ModalTransition,
          }}
        >
          {
            login_status ===true  ?
            <>
              <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Message" component={Message} />
              <Stack.Screen name="MyAccount" component={MyAccount} />
              <Stack.Screen name="Help" component={Help} />
              <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
              <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
            </>
          
            :
            <>
             <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="LoginOTP" component={LoginOTP} />
              <Stack.Screen name="UserLogin" component={UserLogin} />
              <Stack.Screen name="UserRegister" component={UserRegister} />
            </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
