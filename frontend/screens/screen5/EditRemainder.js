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

  const [title, setTitle] = useState(reminder.title);
  const [date, setDate] = useState(reminder.date);
  const [km, setKm] = useState(reminder.km);

  // EDITAR
  const handleEdit = () => {

    const updatedReminder = {
      ...reminder,
      title,
      date,
      km,
    };

    console.log('Reminder editado:', updatedReminder);

    Alert.alert('Éxito', 'Reminder actualizado');

    props.navigation.goBack();
  };

  // ELIMINAR
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

          onPress: () => {

            console.log('Reminder eliminado:', reminder.id);

            Alert.alert('Eliminado', 'Reminder eliminado correctamente');

            props.navigation.goBack();
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
              source={require('../../assets/Image.png')}
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

          <Text style={styles.label}>Título</Text>

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
