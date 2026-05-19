// screens/screen6/EditMaintenance.js

import React, { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

const EditMaintenance = (props) => {

  const { maintenance } = props.route.params;

  // SEPARAR FECHA
  const splitDate = maintenance.date.split('/');

  const [maintenanceType, setMaintenanceType] = useState(
    maintenance.maintenanceType
  );

  const [day, setDay] = useState(splitDate[0]);
  const [month, setMonth] = useState(splitDate[1]);
  const [year, setYear] = useState(splitDate[2]);

  const [kilometers, setKilometers] = useState(
    maintenance.kilometers.toString()
  );

  const [cost, setCost] = useState(
    maintenance.cost.toString()
  );

  const [notes, setNotes] = useState(
    maintenance.notes || ''
  );

  // EDITAR
  const handleEditMaintenance = () => {

    const updatedMaintenance = {
      ...maintenance,

      maintenanceType,

      date: `${day}/${month}/${year}`,

      kilometers,
      cost,
      notes,
    };

    console.log('Maintenance actualizado:', updatedMaintenance);

    Alert.alert(
      'Éxito',
      'Mantenimiento actualizado correctamente'
    );

    props.navigation.goBack();
  };

  // ELIMINAR
  const handleDeleteMaintenance = () => {

    Alert.alert(
      'Eliminar mantenimiento',
      '¿Seguro que quieres eliminar este mantenimiento?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },

        {
          text: 'Eliminar',
          style: 'destructive',

          onPress: () => {

            console.log(
              'Maintenance eliminado:',
              maintenance.id
            );

            Alert.alert(
              'Eliminado',
              'Mantenimiento eliminado correctamente'
            );

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
            Edit Maintenance
          </Text>

        </View>

        <View style={styles.formContainer}>

          {/* TIPO */}
          <Text style={styles.label}>
            Tipo de mantenimiento
          </Text>

          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={maintenanceType}
              onValueChange={(itemValue) =>
                setMaintenanceType(itemValue)
              }
            >

              <Picker.Item
                label="Aceite"
                value="Aceite"
              />

              <Picker.Item
                label="Filtros"
                value="Filtros"
              />

              <Picker.Item
                label="Frenos"
                value="Frenos"
              />

              <Picker.Item
                label="Neumáticos"
                value="Neumaticos"
              />

              <Picker.Item
                label="ITV"
                value="ITV"
              />

            </Picker>

          </View>

          {/* FECHA */}
          <Text style={styles.label}>Fecha</Text>

          <View style={styles.dateRow}>

            <TextInput
              style={styles.dateInput}
              keyboardType="numeric"
              maxLength={2}
              value={day}
              onChangeText={setDay}
            />

            <TextInput
              style={styles.dateInput}
              keyboardType="numeric"
              maxLength={2}
              value={month}
              onChangeText={setMonth}
            />

            <TextInput
              style={styles.dateInput}
              keyboardType="numeric"
              maxLength={4}
              value={year}
              onChangeText={setYear}
            />

          </View>

          {/* KM Y COSTE */}
          <View style={styles.doubleInputRow}>

            <View style={styles.doubleInputBox}>

              <Text style={styles.label}>
                Kilometraje
              </Text>

              <View style={styles.inputWithSuffix}>

                <TextInput
                  style={styles.inputHalf}
                  keyboardType="numeric"
                  value={kilometers}
                  onChangeText={setKilometers}
                />

                <Text style={styles.simbolText}>
                  Km
                </Text>

              </View>

            </View>

            <View style={styles.doubleInputBox}>

              <Text style={styles.label}>
                Coste
              </Text>

              <View style={styles.inputWithSuffix}>

                <TextInput
                  style={styles.inputHalf}
                  keyboardType="numeric"
                  value={cost}
                  onChangeText={setCost}
                />

                <Text style={styles.simbolText}>
                  €
                </Text>

              </View>

            </View>

          </View>

          {/* NOTAS */}
          <Text style={styles.label}>Notas</Text>

          <TextInput
            style={styles.notesInput}
            multiline
            numberOfLines={6}
            value={notes}
            onChangeText={setNotes}
          />

          {/* BOTÓN EDITAR */}
          <Pressable
            style={styles.editButton}
            onPress={handleEditMaintenance}
          >
            <Text style={styles.buttonText}>
              Guardar cambios
            </Text>
          </Pressable>

          {/* BOTÓN ELIMINAR */}
          <Pressable
            style={styles.deleteButton}
            onPress={handleDeleteMaintenance}
          >
            <Text style={styles.buttonText}>
              Eliminar mantenimiento
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
    backgroundColor: '#1a1a1a',
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

  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  label: {
    fontSize: 18,
    color: '#7a7a7a',
    marginBottom: 10,
    fontWeight: '600',
  },

  pickerContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginBottom: 30,
    overflow: 'hidden',
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  dateInput: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 18,
  },

  doubleInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  doubleInputBox: {
    width: '47%',
  },

  inputWithSuffix: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
  },

  inputHalf: {
    flex: 1,
    fontSize: 18,
  },

  simbolText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },

  notesInput: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    height: 160,
    textAlignVertical: 'top',
    padding: 15,
    fontSize: 16,
    marginBottom: 30,
  },

  editButton: {
    backgroundColor: '#8B0000',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  deleteButton: {
    backgroundColor: '#444',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

});

export default EditMaintenance;
