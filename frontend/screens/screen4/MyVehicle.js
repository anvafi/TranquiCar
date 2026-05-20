import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const MyVehicle = (props) => {
  const [vehicle, setVehicle] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const { vehicleId } = props.route.params;

  useEffect(() => {
    const refresh = props.navigation.addListener('focus', () => {
      loadData();
    });

    return refresh;
  }, [props.navigation]);

  const loadData = async () => {

    try {

      const vehicleResponse = await fetch(
        `http://192.168.1.34:3000/api/vehicles/${vehicleId}`
      );

      const vehicleData = await vehicleResponse.json();

      setVehicle(vehicleData);

      const remindersResponse = await fetch(
        `http://192.168.1.34:3000/api/reminders/vehicle/${vehicleId}`
      );

      const remindersData = await remindersResponse.json();

      setReminders(remindersData);

    } catch (error) {

      console.log(error);

    }
  };

  // const deleteMaintenance = async (maintenanceId) => {
  //   try {
  //     const response = await fetch(
  //       `http://192.168.1.34:3000/api/maintenance/${maintenanceId}`,
  //       {
  //         method: 'DELETE',
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok) {
  //       Alert.alert('No se pudo eliminar', data.message);
  //       return;
  //     }

  //     Alert.alert('Eliminado', data.message);

  //     loadData();

  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('No se pudo conectar con el servidor');
  //   }
  //  };

  const hasCriticalReminder = reminders.some((item) => {

    const remainingKm = item.nextReminderKm - vehicle.mileage;
    return remainingKm < 2000;
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces={false} style={{ flex: 1 }}>

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
          <Text style={styles.headerTitle}>My Vehicle Details</Text>
        </View>

        {/* INFO DEL VEHÍCULO */}
        <View style={styles.contentContainer}>
          {vehicle && (
            <View style={styles.vehicleInfoSection}>
              <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} resizeMode="contain" />
              <Text style={styles.brandText}>{vehicle.brand} {vehicle.model}</Text>
              <Text style={styles.yearText}>{vehicle.year}</Text>

              <View style={styles.kmRow}>
                <Text style={styles.kmText}>{vehicle.mileage} Km</Text>
                <View style={styles.statusBadge}>
                  <MaterialIcons
                    name={hasCriticalReminder ? 'warning' : 'check'}
                    size={16}
                    color={hasCriticalReminder ? '#e74c3c' : '#2ecc71'}
                  />
                  <Text
                    style={[styles.statusText, {
                      color: hasCriticalReminder
                        ? '#e74c3c'
                        : '#2ecc71'
                    }
                    ]}>
                    {hasCriticalReminder ? 'Revisar' : 'Al día'}
                  </Text>
                  {/* <Text style={styles.statusText}>Al día</Text> */}
                </View>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>Upcoming Maintenance</Text>

          {/* LISTA DE TARJETAS (REMINDERS / MAINTENANCE) */}
          {/* TARJETA (REMINDERS) */}
          {/* {maintenance.map((item) => (
            <View key={item.id} style={styles.maintenanceCard}>
              <View>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardSubtitle}>{item.detalle}</Text>
              </View>
              <Text style={[styles.cardStatus, { color: item.color }]}>{item.estado}</Text>
            </View>
          ))} */}
          {reminders.map((item) => {
            const remainingKm =
              item.nextReminderKm - vehicle.mileage;

            let statusColor = '#2ecc71';

            if (remainingKm < 2000) {
              statusColor = '#f1c40f';
            }

            if (remainingKm < 1000) {
              statusColor = '#e74c3c';
            }
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.maintenanceCard,
                  selectedReminder?.id === item.id && {
                    borderColor: '#8B1A1A',
                    borderWidth: 2,
                  }
                ]}
                onPress={() => setSelectedReminder(item)}       //seleccionando tarjeta
              >

                <View>
                  <Text style={styles.cardTitle}>
                    {item.maintenanceType}
                  </Text>

                  {item.kilometersInterval ? (
                    <Text style={styles.cardSubtitle}>
                      Cada {item.kilometersInterval} km
                    </Text>
                  ) : null}

                  {item.monthsInterval ? (
                    <Text style={styles.cardSubtitle}>
                      Cada {item.monthsInterval} meses
                    </Text>
                  ) : null}
                </View>

                <Text style={[styles.cardStatus, { color: statusColor }]}>
                  En {remainingKm.toLocaleString()} Km
                </Text>

              </Pressable>
            );
          })}

          {/* BOTONES DE ACCIÓN */}

          <Pressable
            style={styles.actionButton}
            onPress={() => {

              console.log('Reminder seleccionado:', selectedReminder);

              props.navigation.navigate('AddMaintenance', {
                vehicleId: vehicleId,
                reminder: selectedReminder,
              });

            }}
          >
            <Text style={styles.actionButtonText}>+ Maintenance</Text>
          </Pressable>

          <Pressable style={[styles.actionButton, { marginTop: 15 }]} onPress={() => props.navigation.navigate('AddReminder', {
            vehicleId: vehicleId,
            currentMileage: vehicle.mileage
          })}>
            <Text style={styles.actionButtonText}>+ Reminder</Text>
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
    paddingBottom: 40,
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
    fontWeight: 'bold'
  },
  contentContainer: {
    padding: 20
  },
  vehicleImage: {
    width: '100%',
    height: 200,
    marginBottom: 15
  },
  brandText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000'
  },
  yearText: {
    fontSize: 16,
    color: '#666'
  },
  kmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  kmText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusText: {
    color: '#2ecc71',
    fontWeight: 'bold',
    marginLeft: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15
  },
  maintenanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardSubtitle: {
    color: '#888',
    marginTop: 2
  },
  cardStatus: {
    fontWeight: 'bold'
  },
  actionButton: {
    backgroundColor: '#8B1A1A',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default MyVehicle;
