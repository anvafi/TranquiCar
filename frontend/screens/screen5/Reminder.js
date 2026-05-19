// screens/screen6/Reminders.js

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const Reminders = (props) => {

  // DATOS DE EJEMPLO
  // Aquí después cargarás los reminders desde BD/API

  const [reminders] = useState([
    {
      id: 1,
      title: 'Aceite',
      date: '15 Mar 2026',
      km: '40.000 km',
      year: '2026',
    },

    {
      id: 2,
      title: 'Filtros',
      date: '10 Oct 2026',
      km: '35.200 km',
      year: '2026',
    },

    {
      id: 3,
      title: 'Frenos',
      date: '18 Nov 2027',
      km: '20.000 km',
      year: '2027',
    },

    {
      id: 4,
      title: 'Neumaticos',
      date: '22 Abr 2027',
      km: '28.000 km',
      year: '2027',
    },

    {
      id: 5,
      title: 'Neumaticos',
      date: '25 Abr 2027',
      km: '28.000 km',
      year: '2027',
    },
  ]);

  // AGRUPAR POR AÑO
  const groupedReminders = reminders.reduce((groups, reminder) => {

    const year = reminder.year;

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(reminder);

    return groups;

  }, {});

  return (
    <SafeAreaView style={styles.mainContainer}>

      <ScrollView bounces={false}>

        {/* HEADER */}
        <View style={styles.headerContainer}>

          <View style={styles.topRow}>

            <Pressable onPress={() => props.navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={32}
                color="black"
              />
            </Pressable>

            <Image
              source={require('../../assets/logoX.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={{ width: 32 }} />

          </View>

          <Text style={styles.title}>Remainders</Text>

        </View>

        {/* LISTA */}
        <View style={styles.contentContainer}>

          {Object.keys(groupedReminders).map((year) => (

            <View key={year}>

              <Text style={styles.yearText}>
                {year}
              </Text>

              {groupedReminders[year].map((reminder) => (

                <Pressable
                  key={reminder.id}
                  style={styles.card}
                  onPress={() =>
                  props.navigation.navigate('EditReminder', {
                  reminder: reminder,
                  })
                }
              >

                  <Text style={styles.cardTitle}>
                    {reminder.title}
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    {reminder.date} - {reminder.km}
                  </Text>

                </Pressable>

              ))}

            </View>

          ))}

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

  headerContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    width: 140,
    height: 80,
  },

  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 30,
  },

  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },

  yearText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 5,
  },

  card: {
    backgroundColor: '#EFEFEF',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },

  cardSubtitle: {
    fontSize: 16,
    color: '#8A8A8A',
    fontWeight: '600',
  },

});

export default Reminders;
