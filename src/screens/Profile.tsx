import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

// Define an interface for user data
interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  phone: string;
  dob: {
    date: string;
    age: number;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
}



const Profile = ({ navigation }: any) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const user = data.results[0];
      setUserData(user);
      setFirstName(user.name.first);
      setLastName(user.name.last);
      setEmail(user.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Add or Update user data (POST or PUT request)
  const addOrUpdateUser = async (isUpdate = false) => {
    const method = isUpdate ? 'PUT' : 'POST';
    try {
      const response = await fetch('https://randomuser.me/api/', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: { first: firstName, last: lastName },
          email: email,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', `User ${isUpdate ? 'updated' : 'added'} successfully`);
        fetchUserData(); // Refresh data
      } else {
        Alert.alert('Error', `Failed to ${isUpdate ? 'update' : 'add'} user`);
      }
    } catch (error) {
      console.error(`Error ${isUpdate ? 'updating' : 'adding'} user:`, error);
    }
  };

  // Delete user data (DELETE request)
  const deleteUser = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/', {
        method: 'DELETE',
      });

      if (response.ok) {
        Alert.alert('Success', 'User deleted successfully');
        setUserData(null);
      } else {
        Alert.alert('Error', 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="arrow-back" size={30} color="#ffffff" />
      </TouchableOpacity>

      {userData ? (
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.picture.large }} style={styles.profileImage} />
          <Text style={styles.nameText}>
            {`${userData.name.title} ${userData.name.first} ${userData.name.last}`}
          </Text>
          <Text style={styles.emailText}>{userData.email}</Text>

          {/* Form inputs for updating user data */}
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Button to update user data */}
          <TouchableOpacity style={styles.button} onPress={() => addOrUpdateUser(true)}>
            <Text style={styles.buttonText}>Update User</Text>
          </TouchableOpacity>

          {/* Button to delete user */}
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteUser}>
            <Text style={styles.buttonText}>Delete User</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {/* Form inputs for adding new user */}
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Button to add new user */}
          <TouchableOpacity style={styles.button} onPress={() => addOrUpdateUser()}>
            <Text style={styles.buttonText}>Add User</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#509750',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#509750',
  },
  profileContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nameText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#111111',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#0e0d0d',
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
