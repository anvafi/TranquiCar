import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Context from '../../context/Context';
import { API_URL } from '../../config/api';

//libreria de EXPO (buscar alternativas??)
import * as ImagePicker from 'expo-image-picker';

//traducir
const AddVehicle = (props) => {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [km, setKm] = useState('');

  const [image, setImage] = useState(null);

  const { user } = useContext(Context);

  const handleAddVehicle = async () => {

    // console.log({ tipo, marca, modelo, anio, km });
    // alert('Vehículo añadido con éxito');
    // props.navigation.goBack();

    try {
      const response = await fetch(`${API_URL}/api/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   //NECESARIO para que sepa el backend que el string es de un JSON
        },
        body: JSON.stringify({
          brand: marca,
          model: modelo,
          year: Number(anio),
          mileage: Number(km),
          image,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'No se pudo añadir el vehículo');
        return;
      }

      Alert.alert('Vehículo guardado', data.message);
      props.navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };
  //de cámara
  const takePhoto = async () => {

    const permission = await ImagePicker.requestCameraPermissionsAsync();   //petición permisos

    if (!permission.granted) {
      Alert.alert('Permiso de cámara denegado');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({    //abre cámara

      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],                                       //jugar con el ratio
      quality: 1,

    });

    if (!result.canceled) {

      setImage(result.assets[0].uri);   //guarda URI

    }

  };

  //de galería, TODO añadir botón
  // const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync();

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces={false} style={{ flex: 1 }}>

        {/* HEADER OSCURO CON LOGO */}
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
          <Text style={styles.headerTitle}>Add Vehicle</Text>
        </View>

        <View style={styles.formContainer}>
          {/* cambiar placeholder */}
          <Pressable style={styles.photoPlaceholder} onPress={takePhoto}>
            {
              image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.previewImage}
                />
              ) : (
                <MaterialIcons name="add" size={40} color="#333" />
              )
            }
            <Text style={styles.addPhotoText}>Add photo</Text>
          </Pressable>

          <Text style={styles.label}>Tipo</Text>
          <TextInput
            style={styles.inputFull}
            value={tipo}
            onChangeText={setTipo}
            placeholder="Ej. Coche / Moto"
          />

          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.inputFull}
            value={marca}
            onChangeText={setMarca}
          />

          <Text style={styles.label}>Modelo</Text>
          <TextInput
            style={styles.inputFull}
            value={modelo}
            onChangeText={setModelo}
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Año</Text>
              <TextInput
                style={styles.inputSmall}
                value={anio}
                onChangeText={setAnio}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Km Actuales</Text>
              <TextInput
                style={styles.inputSmall}
                value={km}
                onChangeText={setKm}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Pressable style={styles.addButton} onPress={handleAddVehicle}>
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
  formContainer: {
    padding: 25,
  },
  photoPlaceholder: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  addPhotoText: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputFull: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  column: {
    width: '46%',
  },
  inputSmall: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fafafa',
  },
  addButton: {
    backgroundColor: '#8B1A1A',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  //foto
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },

});

export default AddVehicle;
