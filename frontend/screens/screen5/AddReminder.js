import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddReminder = (props) => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSaveReminder = () => {
    alert('Recordatorio guardado');
    // Aquí iría la lógica para guardar en la base de datos
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView bounces={false}>
        
        {/* HEADER OSCURO */}
        <View style={styles.headerBackground}>
          <View style={styles.headerTop}>
            <Pressable onPress={() => props.navigation.goBack()}>
              <Text> "close" </Text>
            </Pressable>
            <Image 
              source={require('../../assets/Image.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={{ width: 28 }} />
          </View>
          <Text style={styles.headerTitle}>Reminder</Text>
        </View>

        {/* CONTENIDO */}
        <View style={styles.formContainer}>
          
          <View style={styles.infoBox}>
            <MaterialIcons name="notifications-active" size={24} color="#8B1A1A" />
            <Text style={styles.infoText}>Configura tus alertas de mantenimiento.</Text>
          </View>

          <Text style={styles.label}>Título del recordatorio</Text>
          <TextInput
            style={styles.inputFull}
            placeholder="Ej. Cambio de Aceite"
            value={titulo}
            onChangeText={setTitulo}
          />

          <Text style={styles.label}>Fecha / Kilometraje</Text>
          <TextInput
            style={styles.inputFull}
            placeholder="Ej. 15/10/2026 o 50.000 km"
            value={fecha}
            onChangeText={setFecha}
          />

          <Text style={styles.label}>Descripción (Opcional)</Text>
          <TextInput
            style={[styles.inputFull, styles.textArea]}
            placeholder="Detalles adicionales..."
            multiline
            numberOfLines={4}
            value={descripcion}
            onChangeText={setDescripcion}
          />

          <Pressable style={styles.saveButton} onPress={handleSaveReminder}>
            <Text style={styles.saveButtonText}>Guardar Recordatorio</Text>
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
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#FFE0E0',
    },
});

export default AddReminder;