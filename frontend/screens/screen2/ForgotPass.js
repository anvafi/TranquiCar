import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
  if (!email) {
    Alert.alert('Error', 'Please, put your email.');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://192.168.1.34:3000/api/users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      Alert.alert('Error', data.message || 'No se pudo enviar el correo.');
      return;
    }

    Alert.alert(
      '¡Correo enviado!',
      'Revisa tu bandeja de entrada para restablecer tu contraseña.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );

  } catch (error) {
    Alert.alert('Error', 'No se pudo conectar con el servidor.');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>

    <View style={styles.header}>

    <Pressable
      onPress={() => navigation.goBack()}
      style={styles.backButton}
    >
      <MaterialIcons name="arrow-back" size={28} color="white" />
    </Pressable>

    <Image
      source={require('../../assets/logoBlanco.png')}
      style={styles.logo}
    />
    
    </View>

      <Text style={styles.title}>Forgot your password? </Text>
      <Text style={styles.subtitle}>
      Enter your email address and we'll send you instructions on how to reset it.      
      </Text>

        <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Sending...' : 'Sending Link'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    height: 60,
    paddingHorizontal: 20,
    fontSize: 14,
  },
  card: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 18,
  overflow: 'hidden',
  marginBottom: 20,
  alignSelf: 'center',
},
  button: {
  width: '80%',
  height: 55,
  backgroundColor: '#b30000',
  borderRadius: 14,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  alignSelf: 'center',
},
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
  position: 'absolute',
  top: 50,
  left: 20,
  zIndex: 10,
},
  logo: {
  width: 120,
  height: 120,
  marginBottom: 30,
  marginTop: 20,
  resizeMode: 'contain',
  alignSelf: 'center',
}
});
