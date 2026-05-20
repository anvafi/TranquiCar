import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { API_URL } from '../../config/api';

const EditReminder = (props) => {

  const { reminder } = props.route.params;

  const [maintenanceType, setMaintenanceType] = useState(reminder.maintenanceType);
  const [reminderType, setReminderType] = useState(reminder.reminderType);
  const [kilometersInterval, setKilometersInterval] = useState(reminder.kilometersInterval ? String(reminder.kilometersInterval) : '');
  const [monthsInterval, setMonthsInterval] = useState(reminder.monthsInterval ? String(reminder.monthsInterval) : '');
  const [nextReminderKm, setNextReminderKm] = useState(reminder.nextReminderKm ? String(reminder.nextReminderKm) : '');
  const [nextReminderDate, setNextReminderDate] = useState(reminder.nextReminderDate || '');

  const handleEdit = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/reminders/${reminder.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            maintenanceType,
            reminderType,
            kilometersInterval: kilometersInterval ? Number(kilometersInterval) : null,
            monthsInterval: monthsInterval ? Number(monthsInterval) : null,
            nextReminderKm: nextReminderKm ? Number(nextReminderKm) : null,
            nextReminderDate: nextReminderDate || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'Could not update');
        return;
      }

      Alert.alert('Éxito', data.message);
      props.navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Unable to connect to the server');
    }
  };

  // ELIMINAR
  // const handleDelete = () => {

  //   Alert.alert(
  //     'Eliminar',
  //     '¿Seguro que quieres eliminar este reminder?',
  //     [
  //       {
  //         text: 'Cancelar',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Eliminar',
  //         style: 'destructive',
  //         onPress: () => {
  //           console.log('Reminder eliminado:', reminder.id);
  //           Alert.alert('Eliminado', 'Reminder eliminado correctamente');
  //           props.navigation.goBack();
  //         },
  //       },
  //     ]
  //   );
  // };
  const handleDelete = () => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this reminder?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${API_URL}/api/reminders/${reminder.id}`,
                {
                  method: 'DELETE',
                }
              );

              const data = await response.json();

              if (!response.ok) {
                Alert.alert('Error', data.message || 'Could not delete');
                return;
              }

              Alert.alert('Deleted', data.message);
              props.navigation.goBack();

            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'Unable to connect to the server');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>

      <ScrollView bounces={false}>

        {/* HEADER */}
        <View style={styles.headerBackground}>

          <View style={styles.headerTop}>

            <Pressable onPress={() => props.navigation.goBack()}>
              <MaterialIcons
                name="arrow-back"
                size={28}
                color="white"
              />
            </Pressable>

            <Image
              source={require('../../assets/logoBlanco.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={{ width: 28 }} />

          </View>

          <Text style={styles.headerTitle}>
            Edit Reminder
          </Text>

        </View>

        <View style={styles.content}>

          <Text style={styles.label}>Maintenance type</Text>
          <TextInput
            style={styles.input}
            value={maintenanceType}
            onChangeText={setMaintenanceType}
          />

          <Text style={styles.label}>Reminder type</Text>
          <TextInput
            style={styles.input}
            value={reminderType}
            onChangeText={setReminderType}
          />

          <Text style={styles.label}>Interval in kilometers</Text>
          <TextInput
            style={styles.input}
            value={kilometersInterval}
            onChangeText={setKilometersInterval}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Interval in month</Text>
          <TextInput
            style={styles.input}
            value={monthsInterval}
            onChangeText={setMonthsInterval}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Next warning in km</Text>
          <TextInput
            style={styles.input}
            value={nextReminderKm}
            onChangeText={setNextReminderKm}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Next date</Text>
          <TextInput
            style={styles.input}
            value={nextReminderDate}
            onChangeText={setNextReminderDate}
            placeholder="YYYY-MM-DD"
          />

          {/* BOTÓN EDITAR */}
          <Pressable
            style={styles.editButton}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>
              Save changes
            </Text>
          </Pressable>

          {/* BOTÓN ELIMINAR */}
          <Pressable
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Delete reminder
            </Text>
          </Pressable>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerBackground: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 20,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 120,
    height: 120,
  },

  headerTitle: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
  },

  content: {
    padding: 20,
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },

  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 25,
    fontSize: 18,
  },

  editButton: {
    backgroundColor: '#8B0000',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: '#444',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

});

export default EditReminder;
