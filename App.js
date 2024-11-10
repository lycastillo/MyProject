import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Facebook from 'expo-facebook';
import firebase from './firebaseConfig';

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  async function handleLoginWithFacebook() {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
        appId: '579093097819019',
      });
      if (type === 'success') {
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        await firebase.auth().signInWithCredential(credential);
        navigation.navigate('Modules');
      } else {
        Alert.alert('Facebook login canceled');
      }
    } catch (error) {
      Alert.alert('Facebook Login Error', error.message);
    }
  }

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    Alert.alert("Login Successful", `Welcome, ${email}!`);
    navigation.navigate('Modules');
  };

  const handleForgotPassword = () => setModalVisible(true);

  const handleSendCode = () => {
    if (!forgotEmail) {
      Alert.alert("Error", "Please enter your registered email.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    Alert.alert("Verification Code Sent", `Code: ${code}\nPlease check your email.`);
    setModalVisible(false);
    setForgotEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s get you Login!</Text>
      <Text style={styles.subtitle}>Enter your information below</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Google button pressed')}>
          <Image source={require('./assets/google_logo.png')} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Gmail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={handleLoginWithFacebook}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' }} style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.divider} />
      </View>

      <TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Don’t have an account? <Text style={styles.registerNow} onPress={() => navigation.navigate('Register')}>Register Now</Text>
      </Text>

      {/* Forgot Password Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgot Password</Text>
            <Text style={styles.modalSubtitle}>Input registered email to send verification code.</Text>
            <TextInput style={styles.modalInput} placeholder="Enter your email" value={forgotEmail} onChangeText={setForgotEmail} keyboardType="email-address" autoCapitalize="none" />
            <TouchableOpacity style={styles.sendCodeButton} onPress={handleSendCode}>
              <Text style={styles.sendCodeButtonText}>Send Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    Alert.alert("Registration Successful", `Welcome, ${name}!`);
    navigation.navigate('Modules');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Now!</Text>
      <Text style={styles.subtitle}>Enter your information below</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Enter Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Re-Enter Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.registerText}>
        Already a member? <Text style={styles.registerNow} onPress={() => navigation.navigate('Login')}>Login</Text>
      </Text>
    </View>
  );
}

function ModulesScreen() {
  return (
    <View style={styles.modulesContainer}>
      <Text style={styles.modulesTitle}>Select your modules</Text>
      <Text style={styles.modulesSubtitle}>Choose your interest</Text>
      
      <View style={styles.moduleButtonsContainer}>
        <TouchableOpacity style={styles.moduleButton}>
          <Text style={styles.moduleButtonText}>Kinder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moduleButton}>
          <Text style={styles.moduleButtonText}>Grade 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moduleButton}>
          <Text style={styles.moduleButtonText}>Grade 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moduleButton}>
          <Text style={styles.moduleButtonText}>Grade 3</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Modules" component={ModulesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#E9C46A',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#000',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#666',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#666',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#F0C987',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
  },
  registerNow: {
    color: '#FF6D00',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#E9C46A',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#D3D3D3',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sendCodeButton: {
    backgroundColor: '#F0C987',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  sendCodeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modulesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9C46A',
    padding: 20,
  },
  modulesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  modulesSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    width: '80%',
  },
  moduleButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  moduleButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
  },
  moduleButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#F0C987',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '60%',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
