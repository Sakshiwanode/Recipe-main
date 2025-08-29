import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MEAL_FILTERS } from '../Data';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';


const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

interface Recipe {
  recipe: {
    label: string;
    image: string;
  };
}

const HomeScreen = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation: any = useNavigation();

  useEffect(() => {
    getTrendyRecipes();
  }, []);

  const getTrendyRecipes = () => {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d`
    )
      .then(response => response.json())
      .then(result => {
        setRecipes(result.hits);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <TouchableOpacity
        style={styles.togglerIcon}
        onPress={() => navigation.toggleDrawer()}>
        <Icon name="bars" size={30} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.topView}>
        <Image
          source={require('../images/cooking.jpg')}
          style={styles.banner}
        />
        <View style={styles.transparentView}>
          <Animatable.Text animation={'slideInUp'} style={styles.logo}>
            RecipePro
          </Animatable.Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.searchBox}
            onPress={() => {
              navigation.navigate('Search');
            }}>
            <Icon name="search" size={25} color="#000" style={styles.search} />

            <Text style={styles.placeholder}>Please search here......</Text>
          </TouchableOpacity>

          <Text style={styles.note}>
            Search 1000+ recipes easily with one click
          </Text>
        </View>
      </View>

      <Animatable.Text animation={'slideInUp'} style={styles.heading}>
        Categories
      </Animatable.Text>
      <View>
        <FlatList
          horizontal
          data={MEAL_FILTERS}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <AnimatedBtn
              animation={'slideInUp'}
              style={styles.categoryItem}
              onPress={() => {
                navigation.navigate('RecipeByCategory', {category: item.title});
              }}>
              <View style={styles.card}>
                <Image source={item.icon} style={styles.categoryIcon} />
              </View>
              <Text style={styles.category}>{item.title}</Text>
            </AnimatedBtn>
          )}
          keyExtractor={item => item.title}
        />
      </View>

      <Animatable.Text animation={'slideInUp'} style={styles.heading}>
        Trendy Recipes
      </Animatable.Text>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#509750"
          style={{marginTop: 20}}
        />
      ) : (
        <FlatList
          contentContainerStyle={{marginTop: 10}}
          horizontal
          data={recipes}
          renderItem={({item}) => (
            <AnimatedBtn
              animation={'slideInUp'}
              style={styles.recipeItem}
              onPress={() => {
                navigation.navigate('Details', {
                  data: item,
                });
              }}>
              <Animatable.Image
                animation={'slideInUp'}
                source={{uri: item.recipe.image}}
                style={styles.recipeImage}
              />
              <View style={styles.transparentView}>
                <Text style={styles.recipeLabel}>{item.recipe.label}</Text>
              </View>
            </AnimatedBtn>
          )}
          keyExtractor={(item, index) => `${item.recipe.label}-${index}`}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeff5',
  },
  togglerIcon: {
    position: 'absolute',
    top: 20,
   
    right:10,
    zIndex: 1,
  },
  topView: {
    width: '100%',
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  transparentView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    paddingLeft: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  searchBox: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 30,
  },
  search: {
    width: 40,
    height: 30,
  },
  placeholder: {
    marginLeft: 15,
    fontSize: 16,
    color: '#9b9090',
  },
  note: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: 'black',
    marginLeft: 20,
  },
  categoryItem: {
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    height: '70%',
    borderRadius: 9,
    shadowColor: 'rgba(0,0,0,.3)',
    shadowOpacity: 6,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    tintColor: '#7edd9d',
    color: 'black',
  },
  category: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 10,
  },
  recipeItem: {
    width: 180,
    height: 220,
    marginLeft: 20,
    borderRadius: 9,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9,
    marginBottom: 10,
  },
  recipeLabel: {
    marginTop: 90,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f8f6f6',
    textAlign: 'center',
  },
});
