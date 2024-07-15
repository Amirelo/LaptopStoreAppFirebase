import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/bottom_nav/HomeScreen';
import FavoriteScreen from './screens/account/FavoriteScreen';
import NotificationScreen from './screens/account/NotificationScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ExploreScreen from './screens/bottom_nav/ExploreScreen';
import * as images from '../../assets/images';
import CustomImage from '../../components/atoms/CustomImage';
import CustomHeader from '../../components/molecules/product/CustomHeader';
import ExploreFilterScreen from './screens/product/ExploreFilterScreen';
import CartScreen from './screens/bottom_nav/CartScreen';
import CartRecipientScreen from './screens/cart/CartRecipientScreen';
import CheckOutScreen from './screens/cart/CheckOutScreen';
import AccountScreen from './screens/bottom_nav/AccountScreen';
import ProfileScreen from './screens/account/ProfileScreen';
import UpdateInfoScreen from './screens/account/UpdateInfoScreen';
import ShippingAddressScreen from './screens/cart/ShippingAddressScreen';
import InsertAddressScreen from './screens/account/InsertAddressScreen';
import OrderScreen from './screens/account/OrderScreen';
import OrderDetailScreen from './screens/account/OrderDetailScreen';
import PromoCodeScreen from './screens/account/PromoCodeScreen';
import CardScreen from './screens/account/CardScreen';
import ProductDetailScreen from './screens/product/ProductDetailScreen';
import InsertCardScreen from './screens/account/InsertCardScreen';
import ProductCommentScreen from './screens/product/ProductCommentScreen';
import InsertCommentScreen from './screens/product/InsertCommentScreen';
import {AuthContext} from '../Auth/AuthContext';
import SettingScreen from './screens/account/SettingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const {language, theme} = React.useContext(AuthContext);
  const colors = theme;
  const customHeaderStyle = {
    backgroundColor: colors.borderColor,
    elevation: 10,
    shadowColor: colors.primaryColor,
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingBottom: 4},
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: language.header_text_home,
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          headerStyle: customHeaderStyle,
          headerRight: () => <CustomHeader type={'home'} />,
          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? 'tabBarActiveTint' : 'text'}
                preset={'inputIcon'}
                source={images.ic_home}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: language.header_text_explore,
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          headerStyle: customHeaderStyle,
          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? 'tabBarActiveTint' : 'text'}
                preset={'inputIcon'}
                source={images.ic_explore}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: language.header_text_cart,
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          headerStyle: customHeaderStyle,
          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? 'tabBarActiveTint' : 'text'}
                preset={'inputIcon'}
                source={images.ic_cart}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: language.header_text_account,
          tabBarActiveTintColor: colors.tabBarActiveTintColor,
          headerStyle: customHeaderStyle,
          tabBarIcon: ({focused}) => {
            return (
              <CustomImage
                tintColor={focused ? 'tabBarActiveTint' : 'text'}
                preset={'inputIcon'}
                source={images.ic_person}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigation = () => {
  const {language, theme} = React.useContext(AuthContext);
  const colors = theme;
  const customHeaderStyle = {
    backgroundColor: colors.borderColor,
    elevation: 10,
    shadowColor: colors.primaryColor,
  };
  return (
    <Stack.Navigator initialRouteName="HomeTab">
      <Stack.Screen
        name="HomeTab"
        options={{
          headerShown: false,
        }}
        component={TabNavigation}
      />
      <Stack.Screen
        options={{
          title: language.header_text_favorite,
          headerStyle: customHeaderStyle,
        }}
        name="Favorite"
        component={FavoriteScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_notification,
          headerStyle: customHeaderStyle,
        }}
        name="Notification"
        component={NotificationScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_filter,
          headerStyle: customHeaderStyle,
        }}
        name="Filter"
        component={ExploreFilterScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_recipient_info,
          headerStyle: customHeaderStyle,
        }}
        name="Recipient Info"
        component={CartRecipientScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_checkout,
          headerStyle: customHeaderStyle,
        }}
        name="Checkout"
        component={CheckOutScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_profile,
          headerStyle: customHeaderStyle,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_insert_address,
          headerStyle: customHeaderStyle,
        }}
        name="New Address"
        component={InsertAddressScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_insert_card,
          headerStyle: customHeaderStyle,
        }}
        name="New Card"
        component={InsertCardScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_order,
          headerStyle: customHeaderStyle,
        }}
        name="User Order"
        component={OrderScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_order_details,
          headerStyle: customHeaderStyle,
        }}
        name="Order Details"
        component={OrderDetailScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_promocodes,
          headerStyle: customHeaderStyle,
        }}
        name="Promocodes"
        component={PromoCodeScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_card,
          headerStyle: customHeaderStyle,
        }}
        name="Card"
        component={CardScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_product_detail,
          headerStyle: customHeaderStyle,
        }}
        name="Product Detail"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_product_ratings,
          headerStyle: customHeaderStyle,
        }}
        name="Product Comments"
        component={ProductCommentScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_product_insert_rating,
          headerStyle: customHeaderStyle,
        }}
        name="New Comment"
        component={InsertCommentScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_update_user,
          headerStyle: customHeaderStyle,
        }}
        name="Update User Information"
        component={UpdateInfoScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_address,
          headerStyle: customHeaderStyle,
        }}
        name="Shipping Address"
        component={ShippingAddressScreen}
      />
      <Stack.Screen
        options={{
          title: language.header_text_settings,
          headerStyle: customHeaderStyle,
        }}
        name="Settings"
        component={SettingScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
