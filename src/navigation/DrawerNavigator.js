import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import MainTabNavigator from './TabNavigator'; 
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#57b95a' }}>
      <View style={styles.drawerHeader}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={styles.backArrow}>
          <Ionicons name="arrow-back-outline" size={25} color="white" /> 
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require('../images/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={styles.profileText}
            onPress={() => props.navigation.navigate('Profile')}>
            Profile
          </Text>
        </View>
      </View>

      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#ffffff', 
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          component={MainTabNavigator}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name="home-outline"
                size={size}
                color={focused ? '#ffffff' : color} 
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, color, size }) => (
              <Ionicons
                name="person-outline"
                size={size}
                color={focused ? '#57b95a' : color} 
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    
    flexDirection: 'column',
    alignItems: 'center',
  },
  backArrow: {
    padding: 10,
    alignSelf: 'flex-start',
    marginBottom: -50
   
  },
  logo: {
    alignSelf: 'center',
    width: 170, 
    height: 150,
   
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
   
   
  
  },
  drawerItemsContainer: {
    flex: 1,
  },
  logoutContainer: {
    borderTopWidth: 3,
    borderTopColor: '#ccc',
    padding: 11,
  },
  logoutButton: {
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: '#ff3333',
    fontWeight: 'bold',
  },
  logoContainer:{
    marginTop: 0
   
  },
  textContainer:{
 
  }
});
