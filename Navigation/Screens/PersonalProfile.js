// export default PersonalProfile;
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Ionicons } from '@expo/vector-icons';

const PersonalProfile = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false); // Initial state: not editing
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Fetch user data here (replace with your actual data fetching logic)
    setName('John Doe');
    setRollNo('123456');
    setPhoneNumber('123-456-7890');
    setEmail('johndoe@example.com');
    setAboutMe('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
  }, []);

  const pickImage = async () => {
    ImagePicker.showImagePicker({ title: 'Select Profile Image' }, (response) => {
      if (!response.didCancel) {
        setImageUri(response.uri);
      }
    });
  };

  const handleEditPress = () => {
    if (isEditing) {
      // Ask for confirmation before saving
      Alert.alert(
        'Save Changes',
        'Are you sure you want to save the edited information?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel saving'),
            style: 'cancel',
          },
          {
            text: 'Save',
            onPress: () => {
              handleSave();
              setIsEditing(false); // Change button text and disable editing after saving
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      setIsEditing(true); // Enable editing and change button text
    }
  };

  const handleSave = async () => {
    // Implement your logic for saving the edited data (e.g., API call, local storage)
    // Replace the following example with your actual implementation
    try {
      // Your logic to save data
      Alert.alert('Profile information saved successfully!');
    } catch (error) {
      console.error('Error saving profile information:', error);
      Alert.alert('An error occurred while saving profile information.');
    }
  };

  const handleLogout = () => {
    // Implement logout functionality (e.g., clear user data, navigate to login screen)
    setShowOverlay(true); // Show overlay
    console.log('User is logging out...'); // Placeholder for actual logout logic
  };

  const handleConfirmLogout = () => {
    // Clear user data or navigate to login screen
    setShowOverlay(false); // Hide overlay
    console.log('Confirmed logout...');
  };

  const handleCancelLogout = () => {
    setShowOverlay(false); // Hide overlay
    console.log('Cancelled logout...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <TouchableOpacity onPress={pickImage} style={styles.profileImagePlaceholder}>
            <Ionicons name="md-person" size={50} color="#E2ECD6" />
          </TouchableOpacity>
        )}
        <View style={styles.userDetails}>
          <TextInput
            style={styles.editableText}
            value={name}
            onChangeText={setName}
            editable={isEditing}
            placeholder="Name"
          />
          <TextInput
            style={styles.editableText}
            value={rollNo}
            onChangeText={setRollNo}
            editable={isEditing}
            placeholder="Roll Number"
          />
          <TextInput
            style={styles.editableText}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={isEditing}
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.editableText}
            value={email}
            onChangeText={setEmail}
            editable={isEditing}
            placeholder="Email"
          />
          <TextInput
            style={styles.editableText}
            value={aboutMe}
            onChangeText={setAboutMe}
            editable={isEditing}
            placeholder="About Me"
            multiline={true}
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.editableSection}>
        <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      {/* Logout button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Overlay */}
      {showOverlay && (
        <View style={styles.overlay}>
          <Text>Are you sure you want to logout?</Text>
          <TouchableOpacity onPress={handleConfirmLogout} style={styles.overlayButton}>
            <Text>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelLogout} style={styles.overlayButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#BBC7AC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    marginLeft: 20,
    flex: 1,
  },
  editableText: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  editableSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#E2ECD6',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#333',
    fontSize: 16,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#E2ECD6',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E2ECD6',
    borderRadius: 5,
  },
});

export default PersonalProfile;
