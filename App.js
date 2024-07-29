// Import necessary components and libraries
import React, { useEffect, useState } from 'react';
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
import Home from './src/Screens/Home/Home';
import MyAccount from './src/Screens/MyAccount/MyAccount';
import Help from './src/Screens/Help/Help';
import CategoryScreen from './src/Screens/Home/CategoryScreen/CategoryScreen';
import SubCategoryScreen from './src/Screens/Home/SubCategoryScreen.js/SubCategoryScreen';
import { setuser } from './src/Redux/reducer/User';
import { AboutUs } from './src/Screens/DrawerScreen/AboutUs';
import { MyProfile } from './src/Screens/DrawerScreen/MyProfile';
import { MyBankAccount } from './src/Screens/DrawerScreen/MyBankAccount';
import { MyMember } from './src/Screens/DrawerScreen/MyMember';
import { MyIncome } from './src/Screens/DrawerScreen/MyIncome';
import { DrawerWorks } from './src/Screens/DrawerScreen/DrawerWorks';
import { Settings } from './src/Screens/DrawerScreen/Settings';
import ChangePassword from './src/Screens/DrawerScreen/ChangePassword';
import NotificationScreen from './src/Screens/NotificationScreen/NotificationScreen';
import FillBankDitails from './src/Screens/DrawerScreen/FillBankDitails';
import EditBankAccount from './src/Screens/DrawerScreen/EditBankAccount';
import Splash from './src/Screens/Auth/Splash';
import SubCatFrom from './src/Screens/Home/SubCategoryScreen.js/SubCatFrom';
import MyDirectMember from './src/Screens/DrawerScreen/MyDirectMember';
import MyDepthMember from './src/Screens/DrawerScreen/MyDepthMember';
import Message from './src/Screens/Message/Message';
import ViewSubcategory from './src/Screens/Home/SubCategoryScreen.js/ViewSubcategory';
import SubCategoryProfile from './src/Screens/Home/SubCategoryScreen.js/SubCategoryProfile';
import SubCategorySubscription from './src/Screens/Home/SubCategoryScreen.js/SubCategorySubscription';
import OldLogin from './src/Screens/Auth/OldLogin';
import FPlogin from './src/Screens/Auth/ForgotPassward/FPlogin';
import FPOtp from './src/Screens/Auth/ForgotPassward/FPOtp';
import ForgetPassword from './src/Screens/Auth/ForgotPassward/ForgetPassword';
import PrivacyPolicy from './src/Screens/Auth/PrivacyPolicy';
import TermsAndConditions from './src/Screens/Auth/TermsAndConditions';
import FundingDetails from './src/Screens/DrawerScreen/FundingDetails';
import IncomeStructure from './src/Screens/Home/ReferScreen/IncomeStructure';
import TransferMoney from './src/Screens/Home/ReferScreen/TransferMoney';



const { height, width } = Dimensions.get('screen');
const Stack = createStackNavigator();

const App = () => {
  const { login_status } = useSelector(state => state.User);
  const [activeuser, setActiveUser] = useState('')
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
        console.log('jSGDKJfgkLAGKJGkjgkjbjkbjkbk', result);
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
            login_status === true ?
              <>
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Message" component={Message} />
                <Stack.Screen name="MyAccount" component={MyAccount} />
                <Stack.Screen name="Help" component={Help} />
                <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
                <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
                <Stack.Screen name="AboutUs" component={AboutUs} />
                <Stack.Screen name="MyProfile" component={MyProfile} />
                <Stack.Screen name="MyBankAccount" component={MyBankAccount} />
                <Stack.Screen name="MyMember" component={MyMember} />
                <Stack.Screen name="MyIncome" component={MyIncome} />
                <Stack.Screen name="FundingDetails" component={FundingDetails} />
                <Stack.Screen name="IncomeStructure" component={IncomeStructure} />
                <Stack.Screen name="TransferMoney" component={TransferMoney} />
                <Stack.Screen name="DrawerWorks" component={DrawerWorks} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="FillBankDitails" component={FillBankDitails} />
                <Stack.Screen name="EditBankAccount" component={EditBankAccount} />
                <Stack.Screen name="SubCatFrom" component={SubCatFrom} />
                <Stack.Screen name="MyDirectMember" component={MyDirectMember} />
                <Stack.Screen name="MyDepthMember" component={MyDepthMember} />
                <Stack.Screen name="ViewSubcategory" component={ViewSubcategory} />
                <Stack.Screen name="SubCategoryProfile" component={SubCategoryProfile} />
                <Stack.Screen name="SubCategorySubscription" component={SubCategorySubscription} />
          

              </>

              :
              <>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="LoginOTP" component={LoginOTP} />
                <Stack.Screen name="UserLogin" component={UserLogin} />
                <Stack.Screen name="OldLogin" component={OldLogin} />
                <Stack.Screen name="UserRegister" component={UserRegister} />
                <Stack.Screen name="FPlogin" component={FPlogin} />
                <Stack.Screen name="FPOtp" component={FPOtp} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
              </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
