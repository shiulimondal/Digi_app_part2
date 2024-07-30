// NavigationService.js
import { CommonActions, StackActions, DrawerActions } from '@react-navigation/native';

let navigatorRef;

function setTopLevelNavigator(ref) {
    navigatorRef = ref;
}

function navigate(routeName, params) {
    if (navigatorRef) {
        navigatorRef.dispatch(
            CommonActions.navigate({
                name: routeName,
                params: params,
            })
        );
    }
}

function replace(routeName, params) {
    if (navigatorRef) {
        navigatorRef.dispatch(
            StackActions.replace(routeName, params)
        );
    }
}

function openDrawer() {
    if (navigatorRef) {
        navigatorRef.dispatch(DrawerActions.openDrawer());
    }
}

function closeDrawer() {
    if (navigatorRef) {
        navigatorRef.dispatch(DrawerActions.closeDrawer());
    }
}

function goBack() {
    if (navigatorRef) {
        navigatorRef.dispatch(CommonActions.goBack());
    }
}

const NavigationService = {
    setTopLevelNavigator,
    navigate,
    replace,
    openDrawer,
    closeDrawer,
    goBack,
};

export default NavigationService;
