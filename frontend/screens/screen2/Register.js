import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Alert,  //nuevo alert
} from 'react-native';

const Screen2 = (props) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // function handleRegister() {
  //   alert('Usuario registrado');
  // }

  async function handleRegister() {
    try {
      const response = await fetch('http://192.168.1.34:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   //NECESARIO para que sepa el backend que el string es de un JSON
        },
        body: JSON.stringify({
          name: `${name} ${lastName}`,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'No se pudo registrar');
        return;
      }

      Alert.alert('Éxito', data.message);
      //lo saco del botón, para que solo navegue si res OK
      props.navigation.navigate('Log In');

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  }

  return (
    <ScrollView style={styles.container}>

      <View style={styles.overlay}>


        <Image
          source={require('../../assets/logoBlanco.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.form}>

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputFull}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Phone Number</Text>

        <View style={styles.phoneRow}>
          <TextInput
            style={styles.code}
            value="+54"
          />

          <TextInput
            style={styles.phone}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Text style={styles.label}>Set Password</Text>
        <TextInput
          style={styles.inputFull}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={styles.button}
          // onPress={() => {
          //   handleRegister();
          //   props.navigation.navigate('Log In');
          // }}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  overlay: {
    backgroundColor: 'rgba(0,0,0,0.78)',
    paddingHorizontal: 25,
    paddingTop: 40,
  },


  logo: {
    width: 150,
    height: 65,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },

  form: {
    padding: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  half: {
    width: '48%',
  },

  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 10,
  },

  inputFull: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 10,
  },

  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  code: {
    width: '18%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 14,
  },

  phone: {
    width: '78%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    height: 55,
    paddingHorizontal: 15,
    fontSize: 14,
  },

  button: {
    marginTop: 35,
    height: 55,
    borderRadius: 14,
    backgroundColor: '#8B1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Screen2;
