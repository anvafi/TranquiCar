// screens/screen6/AddReminder.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, ScrollView, SafeAreaView, Switch, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { API_URL } from '../../config/api';

const ReminderBlock = ({
  title,
  enabled,
  setEnabled,
  km,
  setKm,
  months,
  setMonths,
}) => (
  <View style={styles.reminderBlock}>

    <View style={styles.titleRow}>
      <Text style={styles.reminderTitle}>{title}</Text>

      <Switch
        trackColor={{ false: '#767577', true: '#6C4AB6' }}
        thumbColor={'#FFFFFF'}
        ios_backgroundColor="#767577"
        onValueChange={setEnabled}
        value={enabled}
      />
    </View>

    <Text style={styles.label}>Avisar cada:</Text>

    <View style={styles.inputsRow}>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          keyboardType="numeric"
          value={km}
          onChangeText={setKm}
        />

        <Text style={styles.inputText}>Km</Text>
      </View>

      <Text style={styles.separator}>|</Text>

      <Text style={styles.middleText}>o cada</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.smallInput}
          keyboardType="numeric"
          value={months}
          onChangeText={setMonths}
        />

        <Text style={styles.inputText}>meses</Text>
      </View>

    </View>

    <View style={styles.divider} />

  </View>
);

const AddReminder = (props) => {

  const [oilEnabled, setOilEnabled] = useState(false);
  const [filtersEnabled, setFiltersEnabled] = useState(false);
  const [tiresEnabled, setTiresEnabled] = useState(false);
  const [brakesEnabled, setBrakesEnabled] = useState(false);
  const [itvEnabled, setItvEnabled] = useState(false);

  const [brakesKm, setBrakesKm] = useState('');
  const [brakesMonths, setBrakesMonths] = useState('');

  const [itvKm, setItvKm] = useState('');
  const [itvMonths, setItvMonths] = useState('');

  const [oilKm, setOilKm] = useState('');
  const [oilMonths, setOilMonths] = useState('');

  const [filtersKm, setFiltersKm] = useState('');
  const [filtersMonths, setFiltersMonths] = useState('');

  const [tiresKm, setTiresKm] = useState('');
  const [tiresMonths, setTiresMonths] = useState('');

  const { vehicleId, currentMileage } = props.route.params;

  // const handleAddReminder = () => {

  //   const remindersData = {
  //     oil: {
  //       enabled: oilEnabled,
  //       km: oilKm,
  //       months: oilMonths,
  //     },

  //     filters: {
  //       enabled: filtersEnabled,
  //       km: filtersKm,
  //       months: filtersMonths,
  //     },

  //     tires: {
  //       enabled: tiresEnabled,
  //       km: tiresKm,
  //       months: tiresMonths,
  //     },
  //   };

  //   console.log(remindersData);

  //   alert('Recordatorios añadidos');

  //   props.navigation.goBack();
  // };
  const handleAddReminder = async () => {
    try {
      const remindersToCreate = [];

      if (oilEnabled) {
        remindersToCreate.push({
          maintenanceType: 'Aceite',
          reminderType: 'mixed',
          kilometersInterval: oilKm ? Number(oilKm) : null,
          monthsInterval: oilMonths ? Number(oilMonths) : null,
          nextReminderKm: oilKm ? Number(currentMileage) + Number(oilKm) : null,
          nextReminderDate: null,
          vehicleId,
        });
      }

      if (filtersEnabled) {
        remindersToCreate.push({
          maintenanceType: 'Filtros',
          reminderType: 'mixed',
          kilometersInterval: filtersKm ? Number(filtersKm) : null,
          monthsInterval: filtersMonths ? Number(filtersMonths) : null,
          nextReminderKm: filtersKm ? Number(currentMileage) + Number(filtersKm) : null,
          nextReminderDate: null,
          vehicleId,
        });
      }

      if (tiresEnabled) {
        remindersToCreate.push({
          maintenanceType: 'Neumáticos',
          reminderType: 'mixed',
          kilometersInterval: tiresKm ? Number(tiresKm) : null,
          monthsInterval: tiresMonths ? Number(tiresMonths) : null,
          nextReminderKm: tiresKm ? Number(currentMileage) + Number(tiresKm) : null,
          nextReminderDate: null,
          vehicleId,
        });
      }

      if (brakesEnabled) {
        remindersToCreate.push({
          maintenanceType: 'Frenos',
          reminderType: brakesKm && brakesMonths ? 'mixed' : brakesKm ? 'km' : 'date',
          kilometersInterval: brakesKm ? Number(brakesKm) : null,
          monthsInterval: brakesMonths ? Number(brakesMonths) : null,
          nextReminderKm: brakesKm ? Number(currentMileage) + Number(brakesKm) : null,
          nextReminderDate: null,
          vehicleId,
        });
      }

      if (itvEnabled) {
        remindersToCreate.push({
          maintenanceType: 'ITV',
          reminderType: itvKm && itvMonths ? 'mixed' : itvKm ? 'km' : 'date',
          kilometersInterval: itvKm ? Number(itvKm) : null,
          monthsInterval: itvMonths ? Number(itvMonths) : null,
          nextReminderKm: itvKm ? Number(currentMileage) + Number(itvKm) : null,
          nextReminderDate: null,
          vehicleId,
        });
      }

      for (const reminder of remindersToCreate) {
        const response = await fetch(`${API_URL}/api/reminders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reminder),
        });

        const data = await response.json();

        if (!response.ok) {
          Alert.alert('Error', data.message || 'No se pudo crear un recordatorio');
          return;
        }
      }

      Alert.alert('Éxito', 'Recordatorios creados correctamente');
      props.navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };



  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces={false}>

        {/* HEADER CON LOGO */}
        <View style={styles.headerBackground}>
          <View style={styles.headerTop}>
            <Pressable onPress={() => props.navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={28} color="white" />
            </Pressable>
            <Image
              source={require('../../assets/logoBlanco.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ width: 28 }} />
          </View>
          <Text style={styles.headerTitle}>Add Reminder</Text>
        </View>

        <View style={styles.contenido}>

          <ReminderBlock
            title="Aceite"
            enabled={oilEnabled}
            setEnabled={setOilEnabled}
            km={oilKm}
            setKm={setOilKm}
            months={oilMonths}
            setMonths={setOilMonths}
          />

          <ReminderBlock
            title="Filtros"
            enabled={filtersEnabled}
            setEnabled={setFiltersEnabled}
            km={filtersKm}
            setKm={setFiltersKm}
            months={filtersMonths}
            setMonths={setFiltersMonths}
          />

          <ReminderBlock
            title="Neumáticos"
            enabled={tiresEnabled}
            setEnabled={setTiresEnabled}
            km={tiresKm}
            setKm={setTiresKm}
            months={tiresMonths}
            setMonths={setTiresMonths}
          />

          <ReminderBlock
            title="Frenos"
            enabled={brakesEnabled}
            setEnabled={setBrakesEnabled}
            km={brakesKm}
            setKm={setBrakesKm}
            months={brakesMonths}
            setMonths={setBrakesMonths}
          />

          <ReminderBlock
            title="ITV"
            enabled={itvEnabled}
            setEnabled={setItvEnabled}
            km={itvKm}
            setKm={setItvKm}
            months={itvMonths}
            setMonths={setItvMonths}
          />

          {/* BOTÓN */}
          <Pressable
            style={styles.addButton}
            onPress={handleAddReminder}
          >
            <Text style={styles.addButtonText}>Add</Text>
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

  contenido: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  reminderBlock: {
    marginBottom: 15,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  reminderTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    color: '#7A7A7A',
    marginBottom: 15,
    fontWeight: '600',
  },

  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  smallInput: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontSize: 18,
  },

  inputText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },

  separator: {
    marginHorizontal: 12,
    fontSize: 22,
    color: '#999',
  },

  middleText: {
    fontSize: 18,
    color: '#7A7A7A',
    marginRight: 12,
  },

  divider: {
    height: 1,
    backgroundColor: '#DDD',
    marginTop: 25,
  },

  addButton: {
    backgroundColor: '#8B0000',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  addButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },

});

export default AddReminder;
