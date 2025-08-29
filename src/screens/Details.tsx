import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);
const Details = () => {
  const route: any = useRoute();
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation: any = useNavigation();
  
  return (
    <View style={styles.container}>
      <Animatable.Image
        source={{uri: route.params.data.recipe.image}}
        style={styles.banner}
        animation={'slideInUp'}
      />
      <AnimatedBtn
        style={styles.backBtn}
        animation={'slideInUp'}
        onPress={() => {
          navigation.goBack('Home');
        }}>
        <Icon
          name="angle-left"
          size={30}
          color="#fff"
          style={styles.BackIcon}
        />
      </AnimatedBtn>
      <Animatable.Text animation={'slideInUp'} style={styles.title}>
        {route.params.data.recipe.label}
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.source}>
        {'added by ' + route.params.data.recipe.source}
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.source}>
        {'Calories:'}
        <Text style={{color: '#e4af3e'}}>
          {route.params.data.recipe.calories}
        </Text>
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.source}>
        {'Total Weight:'}
        <Text style={{color: '#0e0909'}}>
          {route.params.data.recipe.totalWeight}
        </Text>
      </Animatable.Text>
      <Animatable.Text animation={'slideInUp'} style={styles.source}>
        {'Meal Type:'}
        <Text style={{color: '#5daa63'}}>
          {route.params.data.recipe.mealType[0]}
        </Text>
      </Animatable.Text>
      <View>
        <FlatList
          data={[
            'Health',
            'Cautions',
            'Ingredients',
            'Diet',
            'Meal Type',
            'Cuisines',
            'Dish Type',
          ]}
          horizontal
          contentContainerStyle={{marginTop: 20}}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.typeItem,
                  {
                    borderWidth: selectedTab == index ? 0 : 0.5,
                    borderColor: '#797e7b',
                    backgroundColor: selectedTab == index ? '#7edd9d' : 'white',
                  },
                ]}
                onPress={() => {
                  setSelectedTab(index)
                    // navigation.navigate('ItemDetail',item),
                }}>
                <Text style={{color: selectedTab == index ? 'white' : 'black'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FlatList

        data={
          selectedTab == 0
            ? route.params.data.recipe.healthLabels
            : selectedTab == 1
            ? route.params.data.recipe.cautions
            : selectedTab == 2
            ? route.params.data.recipe.ingredientLines
            : selectedTab == 3
            ? route.params.data.recipe.dietLabels
            : selectedTab == 4
            ? route.params.data.recipe.mealType
            : selectedTab == 5
            ? route.params.data.recipe.cuisineType
            : route.params.data.recipe.dishType
        }
        renderItem={({item}) => {
          return (
            <Animatable.View animation={'slideInUp'} style={styles.labels}>
              <Text style={styles.labelstext}>{item}</Text>
            </Animatable.View>
          );
        }}
      />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeff5',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 30,
    left: 20,

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BackIcon: {
    width: 20,
    height: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10,
  },
  source: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    color: '#1f1e1e',
  },
  typeItem: {
    paddingLeft: 10,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    borderRadius: 8,
  },
  labels: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    borderWidth: 0.5,
    justifyContent: 'center',
    marginTop: 10,
    borderColor: '#636161',
    paddingLeft: 10,
  },
  labelstext: {
    color: 'black',
  },
});
