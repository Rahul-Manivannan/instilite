import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, TextInput } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

const Stack = createStackNavigator();

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [showTextBox, setShowTextBox] = useState(false); // State to manage visibility of the text box

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://10.42.65.200:3000/readteamprofile');
        const extractedData = response.data;
        setData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const navigation = useNavigation();

  const handleInputChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const buttonBackgroundColor = '#8D9F76';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.team_name}</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          value={data.team_desc}
          onChangeText={text => handleInputChange('team_desc', text)}
          placeholder="Enter Description"
          multiline
        />
        <TextInput
          style={styles.input}
          value={data.team_link}
          onChangeText={text => handleInputChange('team_link', text)}
          placeholder="Enter Link"
        />
        <TextInput
          style={styles.input}
          value={data.team_heads}
          onChangeText={text => handleInputChange('team_heads', text)}
          placeholder="Enter Heads"
          multiline
        />
        <TextInput
          style={styles.input}
          value={data.team_members}
          onChangeText={text => handleInputChange('team_members', text)}
          placeholder="Enter Members"
          multiline
        />
      </View>
      <Button
        title="Upcoming Events"
        onPress={() => navigation.navigate('SecondPage')}
        color={buttonBackgroundColor}
        style={styles.button}
      />
      <Button
        title="Application Forms"
        onPress={() => setShowTextBox(prevState => !prevState)}
        color={buttonBackgroundColor}
        style={styles.button}
      />
      {showTextBox && <Text style={styles.textBox}>{data.team_apps}</Text>}
    </View>
  );
};

const SecondPage = () => {
  return (
    <View style={styles.centeredTextContainer}>
      <Text style={styles.centeredText}>Upcoming Events</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#B4C5A0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  content: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    marginBottom: 10,
  },
  textBox: {
    fontSize: 20,
    marginTop: 10,
  },
});
const ClubProfileScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default ClubProfileScreen;