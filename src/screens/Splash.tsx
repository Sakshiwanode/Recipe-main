import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true); 
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const launchedBefore = await AsyncStorage.getItem('launchedBefore');
        if (launchedBefore === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('launchedBefore', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
      } finally {
        setLoading(false); 
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (isFirstLaunch === false) {
        // Skip splash and navigate immediately if not first launch
        navigation.navigate('Drawer');
      } else if (isFirstLaunch === true) {
       
        const timer = setTimeout(() => {
          navigation.navigate('Drawer');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, isFirstLaunch, navigation]);

  // Render loading screen until 
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="slideInUp"
        source={require('../images/logo.png')}
        style={styles.logo}
      />
      <Animatable.Text animation="slideInUp" style={styles.appName}>
        RecipePro
      </Animatable.Text>
      <Animatable.Text animation="slideInUp" style={styles.tagline}>
        Search Any Recipe with health filters
      </Animatable.Text>
    </View>
  );
};


export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#509750',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#509750',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white', 
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 40,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  tagline: {
    position: 'absolute',
    bottom: 50,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
});
