import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  RecipeByCategory: { data: string };
  Details: { data: Recipe };
};

type RecipeByCategoryRouteProp = RouteProp<RootStackParamList, 'RecipeByCategory'>;
type NavigationProps = NavigationProp<RootStackParamList, 'RecipeByCategory'>;

interface Recipe {
  recipe: {
    source: string;
    label: string;
    image: string;
  };
}

const RecipeByCategory = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RecipeByCategoryRouteProp>(); 
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    SearchRecipe();
  }, []);

  const SearchRecipe = () => {
    setLoading(true); // Start loading
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=food&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d&mealTypes=${route.params.data}`, // Access data safely
    )
      .then(response => response.json())
      .then(result => {
        setRecipes(result.hits);
      })
      .catch(error => console.log('error', error))
      .finally(() => {
        setLoading(false); 
      });
  };

  const renderItem = ({item}:any)   =>{
    return(
      <TouchableOpacity
      style={styles.recipeItem}
      onPress={() => navigation.navigate('Details', { data: item })}
    >
      <Image source={{ uri: item.recipe.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemText}>{item.recipe.label}</Text>
        <Text style={styles.sourceText}>{item.recipe.source}</Text>
      </View>
    </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#fffefe" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

export default RecipeByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#509750',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  flatListContent: {
    paddingTop: 50,
    width: '100%',
  },
  recipeItem: {
    width: 350,
    height: 100,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 9,
    alignSelf: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemTextContainer: {
    marginLeft: 15,
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sourceText: {
    fontSize: 14,
    color: '#7a7a7a',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
