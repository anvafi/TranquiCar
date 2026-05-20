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

const EditReminder = (props) => {

  const { reminder } = props.route.params;

  // const [title, setTitle] = useState(reminder.title);
  // const [date, setDate] = useState(reminder.date);
  // const [km, setKm] = useState(reminder.km);

  const [maintenanceType, setMaintenanceType] = useState(reminder.maintenanceType);
  const [reminderType, setReminderType] = useState(reminder.reminderType);
  const [kilometersInterval, setKilometersInterval] = useState(reminder.kilometersInterval ? String(reminder.kilometersInterval) : '');
  const [monthsInterval, setMonthsInterval] = useState(reminder.monthsInterval ? String(reminder.monthsInterval) : '');
  const [nextReminderKm, setNextReminderKm] = useState(reminder.nextReminderKm ? String(reminder.nextReminderKm) : '');
  const [nextReminderDate, setNextReminderDate] = useState(reminder.nextReminderDate || '');

  // EDITAR
  // const handleEdit = () => {

  //   const updatedReminder = {
  //     ...reminder,
  //     title,
  //     date,
  //     km,
  //   };

  //   console.log('Reminder editado:', updatedReminder);

  //   Alert.alert('Éxito', 'Reminder actualizado');

  //   props.navigation.goBack();
  // };
  const handleEdit = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.34:3000/api/reminders/${reminder.id}`,
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
        Alert.alert('Error', data.message || 'No se pudo actualizar');
        return;
      }

      Alert.alert('Éxito', data.message);
      props.navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
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
      'Eliminar',
      '¿Seguro que quieres eliminar este reminder?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `http://192.168.1.34:3000/api/reminders/${reminder.id}`,
                {
                  method: 'DELETE',
                }
              );

              const data = await response.json();

              if (!response.ok) {
                Alert.alert('Error', data.message || 'No se pudo eliminar');
                return;
              }

              Alert.alert('Eliminado', data.message);
              props.navigation.goBack();

            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'No se pudo conectar con el servidor');
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

        {/* CONTENIDO */}
        <View style={styles.content}>

          {/* <Text style={styles.label}>Título</Text>

          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Fecha</Text>

          <TextInput
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />

          <Text style={styles.label}>Kilómetros</Text>

          <TextInput
            style={styles.input}
            value={km}
            onChangeText={setKm}
          /> */}
          <Text style={styles.label}>Tipo de mantenimiento</Text>
          <TextInput
            style={styles.input}
            value={maintenanceType}
            onChangeText={setMaintenanceType}
          />

          <Text style={styles.label}>Tipo de recordatorio</Text>
          <TextInput
            style={styles.input}
            value={reminderType}
            onChangeText={setReminderType}
          />

          <Text style={styles.label}>Intervalo en kilómetros</Text>
          <TextInput
            style={styles.input}
            value={kilometersInterval}
            onChangeText={setKilometersInterval}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Intervalo en meses</Text>
          <TextInput
            style={styles.input}
            value={monthsInterval}
            onChangeText={setMonthsInterval}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Próximo aviso en km</Text>
          <TextInput
            style={styles.input}
            value={nextReminderKm}
            onChangeText={setNextReminderKm}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Próxima fecha</Text>
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
              Guardar cambios
            </Text>
          </Pressable>

          {/* BOTÓN ELIMINAR */}
          <Pressable
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Eliminar reminder
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
    backgroundColor: '#F5F5F5',
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
