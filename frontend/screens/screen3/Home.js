import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';

export default function AddVehicle(props) {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      brand: 'Volkswagen',
      model: 'T-prime',
      year: '2002 año',
      mileage: '100 Km',
      transmission: 'Manual & Auto',
      image: 'https://a.ccdn.es/cnet/contents/media/volkswagen/1144935.jpg/900x505cut/',
    },
    {
      id: 2,
      brand: 'Hyundai',
      model: 'Tucson',
      year: '2014 año',
      mileage: '23 Km',
      transmission: 'Manual & Auto',
      image: 'https://a.ccdn.es/cnet/contents/media/volkswagen/1144935.jpg/900x505cut/',
    },
    {
      id: 3,
      brand: 'Kawasaki',
      model: 'Ninja H2R',
      year: '2020 año',
      mileage: '33 Km',
      transmission: '',
      image: 'https://a.ccdn.es/cnet/contents/media/volkswagen/1144935.jpg/900x505cut/',
    }
  ]);

  const VehicleList = () => {
    return vehicles.map((item, index) => (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardContent}>
          {/* Lado Izquierdo: Imagen y Nombre */}
          <View style={styles.leftColumn}>
            <Image style={styles.vehicleImage} source={{ uri: item.image }} resizeMode="contain" />
            <Text style={styles.vehicleTitle}>{item.brand} {item.model}</Text>
                    <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
          </View>

          {/* Lado Derecho: Info Técnica */}
          <View style={styles.rightColumn}>
            <Text style={styles.infoText}>{item.year}</Text>
            <Text style={styles.infoText}>{item.mileage}</Text>
            <Text style={styles.infoText}>{item.transmission}</Text>
            <Pressable onPress={() => props.navigation.navigate('MyVehicle')}>
            <Text style={styles.arrowIcon}>{'>'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logoX.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.headerTitle}>Garaje</Text>
        <Text style={styles.subTitle}>Tus vehículos</Text>
        <VehicleList />
      </ScrollView>

      <Pressable style={styles.button} onPress={() => props.navigation.navigate('AddVehicle')}>
        <Text style={styles.textButton}>+</Text>
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1.5,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  vehicleImage: {
    width: '100%',
    height: 100,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#1A1A1A',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 5,
  },
 logoContainer: {
    width: '100%',    
    alignItems: 'center',    
    justifyContent: 'center', 
    marginVertical: 10,      
  },
  logo: {
    width: 120, 
    height: 120,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#CCC',
    marginTop: 10,
  },
  button: {
    position: 'absolute',     
    bottom: 30,      
    right: 30,  
    backgroundColor: '#333',
    width: 50,                
    height: 50,               
    borderRadius: 25,      
    justifyContent: 'center', 
    alignItems: 'center',   
    // Sombras para que resalte
    elevation: 5,      
    shadowColor: '#000',      
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textButton: {
    margin: 24,
    fontSize: 30,
    color:'white',
    textAlign: 'center'
  },
});