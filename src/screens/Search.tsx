import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { DISH_FILTERS, DIET_FILTERS, HEALTH_FILTERS, CUISINE_FILTERS } from '../Data';

const Search = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [selectDish, setSelectDish] = useState('');
  const [selectCuisine, setSelectCuisine] = useState('');
  const [selectHealth, setSelectHealth] = useState('');
  const [selectDiet, setSelectDiet] = useState('');
  const searchRecipe = async () => {
    if (!search.trim()) return;
    setLoading(true);
  
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Accept-Language', 'en');
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
  
    let url = '';
    if (selectDish=='' && selectCuisine=='' && selectHealth=='' && selectDiet=='') {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d`;
    } else if (selectCuisine) {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d&cuisineType=${selectCuisine}`;
    } else if (selectHealth) {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d&health=${selectHealth}`;
    } else if (selectDiet) {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d&diet=${selectDiet}`;
    } else if (selectCuisine!='' && selectHealth!='' && selectDiet!='') {
      url = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=55517a84&app_key=06ccbd6df34b3d255b5cb2c5cf427d7d&health=${selectHealth}&diet=${selectDiet}&cuisineType=${selectCuisine}`;
    }
  
    try {
      const response = await fetch(url, );
      const result = await response.json();
      console.log(result.hits);
      setRecipes(result.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };
  const clearFilters = () => {
    setSelectDish('');
    setSelectCuisine('');
    setSelectHealth('');
    setSelectDiet('');
  };
  



  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#509750" />
      </TouchableOpacity>

      <View style={styles.searchBox}>
        <TouchableOpacity onPress={searchRecipe} style={styles.searchIcon}>
          <Icon name="search" size={30} color="#509750" />
        </TouchableOpacity>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Please search here..."
          style={styles.placeholder}
        />
        {search ? (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSearch('');
              setRecipes([]);
            }}
          >
            <Icon name="close" size={30} color="#509750" />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
          )}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => setShowFilters(true)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        isVisible={showFilters}
        onBackdropPress={() => setShowFilters(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.headerContainer}>
            <Text style={{ fontSize: 30 }}>Filters</Text>
            <TouchableOpacity style={styles.closeIcon} onPress={() => setShowFilters(false)}>
              <Icon name="close" size={40} color="#000" />
            </TouchableOpacity>
          </View>

          <View>
            <Text>Dish Type</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
              horizontal
              data={DISH_FILTERS}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, { backgroundColor: selectDish === item ? '#f3ecec' : 'transparent' }]}
                  onPress={() => setSelectDish(item)}
                >
                  <Text style={[styles.filterItemText, { color: selectDish === item ? 'black' : 'white' }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View>
            <Text>Cuisine</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
              horizontal
              data={CUISINE_FILTERS}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, { backgroundColor: selectCuisine === item ? '#f3ecec' : 'transparent' }]}
                  onPress={() => setSelectCuisine(item)}
                >
                  <Text style={[styles.filterItemText, { color: selectCuisine === item ? 'black' : 'white' }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View>
            <Text>Health</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
              horizontal
              data={HEALTH_FILTERS}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, { backgroundColor: selectHealth === item ? '#f3ecec' : 'transparent' }]}
                  onPress={() => setSelectHealth(item)}
                >
                  <Text style={[styles.filterItemText, { color: selectHealth === item ? 'black' : 'white' }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View>
            <Text>Diet</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 10 }}
              horizontal
              data={DIET_FILTERS}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.filterItem, { backgroundColor: selectDiet === item ? '#f3ecec' : 'transparent' }]}
                  onPress={() => setSelectDiet(item)}
                >
                  <Text style={[styles.filterItemText, { color: selectDiet === item ? 'black' : 'white' }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

           {/* Clear Filters Button */}
    <TouchableOpacity
      style={styles.clearThisButton}
      onPress={() => {
        clearFilters(); // Clear the filters
      }}
    >
      <Text style={styles.clearButtonText}>Clear Filters</Text>
    </TouchableOpacity>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => {
              setShowFilters(false);
              searchRecipe();
            }}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#eaecec',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  placeholder: {
    marginLeft: 10,
    fontSize: 16,
    color: '#9b9090',
    flex: 1,
  },
  searchBox: {
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginTop: 50,
  },
  clearButton: {
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  flatListContent: {
    paddingTop: 20,
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
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#509750',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,
    elevation: 8,
  },
  selectedFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    width: '90%',
  },
  selectedFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
  selectedFilterText: {
    marginRight: 5,
    color: 'black',
  },
  modalContent: {
    backgroundColor: '#509750',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#f7efef',
    marginTop: 10,
  },
  horizontalList: {
    paddingHorizontal: 5,
  },
  filterItem: {
    backgroundColor: '#dde0de',
    borderRadius: 9,
    borderWidth:1,
    padding: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10
  },
  filterItemText: {
    marginRight: 5,
    color: '#000',
  },
  selected: {
    backgroundColor: '#5cc27a',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 8,
  },
  applyButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
    marginBottom: 10,
  },
  clearThisButton: {
      marginTop: 10,
      backgroundColor: '#ff4d4d', 
      paddingVertical: 10,
      borderRadius: 8,
    },
    
    clearButtonText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 16,
    },
    
});


