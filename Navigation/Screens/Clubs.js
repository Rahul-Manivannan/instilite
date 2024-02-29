import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ClubItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.clubItem} onPress={() => onPress(item)}>
      <Text style={styles.clubName}>{item.name}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
    </TouchableOpacity>
  );
};

const Clubs = () => {
  const navigation = useNavigation();
  const [clubs] = useState([
    { id: 1, name: "Product Design Club", navigationLink: './PDC/PDC.js' },
    { id: 2, name: "RAFTAR", navigationLink: 'RAFTAR' },
    { id: 3, name: "AI Club", navigationLink: 'RAFTAR' },
    { id: 4, name: "AVISHKAR HYPERLOOP", navigationLink: 'RAFTAR' },
    { id: 5, name: "BIOTECH Club", navigationLink: 'RAFTAR' },
    { id: 6, name: "AERO Club", navigationLink: 'RAFTAR' },
    { id: 7, name: "3D Printing Club", navigationLink: 'RAFTAR' },
    { id: 8, name: "Electronics Club", navigationLink: 'RAFTAR' },
    { id: 9, name: "Horizon", navigationLink: 'RAFTAR' },
    { id: 10, name: "I-Bot Club", navigationLink: 'RAFTAR' },
    { id: 11, name: "Programming Club", navigationLink: 'RAFTAR' },
    { id: 12, name: "Team Saahay", navigationLink: 'RAFTAR' },
    { id: 13, name: "Mathematics Club", navigationLink: 'RAFTAR' },
    { id: 14, name: "Team Envisage", navigationLink: 'RAFTAR' },
    { id: 15, name: "Webops and Blockchain Club", navigationLink: 'RAFTAR' },
    { id: 16, name: "ABHIYAAN", navigationLink: 'RAFTAR' },
    { id: 17, name: "ANVESHAK", navigationLink: 'RAFTAR' },
    { id: 18, name: "AGNIRATH", navigationLink: 'RAFTAR' },
    { id: 19, name: "IGEM", navigationLink: 'RAFTAR' },
    { id: 20, name: "ABHYUDAY", navigationLink: 'RAFTAR' },
    // Add more clubs here
  ]);
  const [searchText, setSearchText] = useState('');

  const filteredClubs = clubs.filter(
    (club) => club.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
  };

  const handlePress = (item) => {
    navigation.navigate(item.navigationLink);
  };

  const renderItem = ({ item }) => (
    <ClubItem
      item={item}
      onPress={() => handlePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search clubs..."
        onChangeText={handleSearchChange}
        value={searchText}
      />
      <FlatList
        data={filteredClubs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2ECD6',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  clubItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#BBC7AC',
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Clubs;