import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Agenda } from 'react-native-calendars';
import axios from 'axios';
//const query = 'INSERT INTO eventsdetails (eventid, event_name, event_venue, event_desc, event_posted_date, user_id, event_date, event_start, event_end, event_visibility) 
//VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [newEvents, setNewEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    event_id:'123',
    event_name: '',
    event_venue: '',
    event_desc: '',
    event_date: '',
    event_start: '',
    event_end: '',
    event_visibility: {
      Public: false,
      Personal: false,
    },
  });
  
  useEffect(() => {
    const today = new Date();
    setItems({
      [today.toISOString().slice(0, 10)]: [{ name: 'Marked Day', height: 50 }], // Mark today
    });
  }, []);

  const handleItemPress = (day) => {
    console.log('Item pressed:', day.dateString);
    // Logic to display the form for editing
    setForm(items[day.dateString][0]); // Assuming only one item per day
    setShowForm(true);
  };

  const handleAddEvent = () => {
    const newEvent = { ...form, height: 50 };
    const newItems = { ...items };
    console.log(form);
    axios.post('http://10.42.65.200:3000/pushevents', form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Handle successful response
        console.log(response.data);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
    
    if (!newItems[form.event_date]) {
      newItems[form.event_date] = [];
    }
    newItems[form.event_date].push(newEvent);
    setItems(newItems);
    setNewEvents([...newEvents, newEvent]);
    setForm({
      event_name: '',
      event_venue: '',
      event_desc: '',
      event_date: '',
      event_start: '',
      event_end: '',
      event_visibility: {
        Public: false,
        Personal: false,
      },
    });
    setShowForm(false);
  };

  const handleShowNewEvents = () => {
    Alert.alert('New Events', JSON.stringify(newEvents));
  };

  const handlePushToGSB = () => {
    // Implement logic to push event to GSB
    setForm({
      ...form,
      event_visibility: {
        ...form.event_visibility,
        Public: !form.event_visibility.Public,
      },
    });
  };

  const handlePushToSelf = () => {
    // Implement logic to push event to self
    setForm({
      ...form,
      event_visibility: {
        ...form.event_visibility,
        Personal: !form.event_visibility.Personal,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={(month) => {
          setItems({ ...items });
        }}
        renderItem={(item, firstItemInDay) => (
          <TextInput
            style={[styles.day, firstItemInDay ? styles.firstItem : null]}
            placeholder="Click to edit"
            editable={true}
            value={item.event_name} // Assuming item.event_name is the text to be edited
            onChangeText={(text) => {
              // Logic to update the text
              items[item.dateString][0].event_name = text;
              setItems({ ...items });
            }}
            onFocus={() => handleItemPress(item.date)} // Pass the date of the item to the handler
          />
        )}
        renderEmptyDate={() => <Text>No events for this day</Text>}
        rowHasChanged={(r1, r2) => r1.event_name !== r2.event_name}
        onDayPress={handleItemPress}
        theme={{
          agendaDayTextColor: '#BBC7AC', // Change text color to green
          agendaDayNumColor: 'black', // Change day number color to green
          agendaTodayColor: 'black', // Change today's color to light green
          agendaKnobColor: '#BBC7AC', // Change knob color to green
        }}
      />
      {showForm ? (
        <ScrollView style={[styles.form, { backgroundColor: '#EFFAE1' }]}>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            value={form.event_name}
            onChangeText={(text) => setForm({ ...form, event_name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Venue"
            value={form.event_venue}
            onChangeText={(text) => setForm({ ...form, event_venue: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Description"
            value={form.event_desc}
            onChangeText={(text) => setForm({ ...form, event_desc: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Date (YYYY-MM-DD)"
            value={form.event_date}
            onChangeText={(text) => setForm({ ...form, event_date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Start Time"
            value={form.event_start}
            onChangeText={(text) => setForm({ ...form, event_start: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Event End Time"
            value={form.event_end}
            onChangeText={(text) => setForm({ ...form, event_end: text })}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkboxItem, form.event_visibility.Public ? styles.checked : null]}
              onPress={handlePushToGSB}
            >
              <Text style={styles.checkboxText}>Push to General Student Body</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.checkboxItem, form.event_visibility.Personal ? styles.checked : null]}
              onPress={handlePushToSelf}
            >
              <Text style={styles.checkboxText}></Text>
            </TouchableOpacity>
          </View>
          <Button title="Submit" onPress={handleAddEvent} color="#E2ECD6" />
        </ScrollView>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Add Event" onPress={() => setShowForm(true)} color="#E2ECD6" />
          <Button title="Show New Events" onPress={handleShowNewEvents} color="#E2ECD6" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBC7AC', // Change background color to beige
  },
  day: {
    backgroundColor: '#EFFAE1',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  firstItem: {
    marginTop: 10,
  },
  dayText: {
    fontSize: 16,
    color: 'black', // Change text color to green
  },
  form: {
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    marginLeft: 5,
    color: 'black', // Change text color to green
  },
  checked: {
    backgroundColor: '#E2ECD6', // Change background color to light green
    borderRadius: 5,
  },
});

export default CalendarScreen;
