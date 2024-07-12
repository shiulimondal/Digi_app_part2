import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import DrawerCard from '../Components/DrawerCard/DrawerCard';


const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    'Worklet'
    return (
            <Drawer.Navigator
                useLegacyImplementation={false}
                initialRouteName='BottomTab'
                drawerContent={props => <DrawerCard {...props} />}

                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        // backgroundColor: '#1D3557'
                    },

                }}>
                <Drawer.Screen name="BottomTab" component={BottomTab} />
             
            </Drawer.Navigator>

    )
}

export default DrawerNavigation

const styles = StyleSheet.create({

})
