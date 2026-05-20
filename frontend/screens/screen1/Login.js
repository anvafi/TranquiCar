import { useState, useContext } from 'react';
import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Alert
} from 'react-native';
import Context from '../../context/Context';
import { API_URL } from '../../config/api';

const Screen1 = (props) => {
  const [screen, setScreen] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(Context);

  async function handleLogin() {
    try {
      const response = await fetch('${API_URL}/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',   //NECESARIO para que sepa el backend que el string es de un JSON
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.message || 'No se pudo iniciar sesión');
        return;
      }
      //
      login(data.user);
      //popup
      Alert.alert('Log in correcto', data.message);
      //lo saco del botón, para que solo navegue si res OK
      props.navigation.navigate('Home');

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/coche.jpg')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Image source={require('../../assets/logoBlanco.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Log in</Text>

        <View style={styles.row}>
          <Text style={styles.subText}>Don’t have an account? </Text>

          <Pressable onPress={() => props.navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.line} />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Pressable onPress={() => { props.navigation.navigate('Forgot Password') }}>
          <Text style={styles.link}> Forgot Your Password? </Text>
        </Pressable>


        <Pressable style={styles.button}
          // onPress={() => {
          //   handleLogin();
          //   props.navigation.navigate('Home');

          // }}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Enter</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  subText: {
    color: '#ccc',
    fontSize: 12,
  },

  link: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 25,
  },

  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
  },

  input: {
    height: 60,
    paddingHorizontal: 20,
    fontSize: 14,
  },

  line: {
    height: 1,
    backgroundColor: '#ddd',
  },

  button: {
    width: '80%',
    height: 55,
    backgroundColor: '#b30000',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

});

export default Screen1;
