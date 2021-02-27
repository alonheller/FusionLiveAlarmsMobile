import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AuthContext from '../context/auth';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

const Login: () => React$Node = (props) => {
  const {isAuthorized, setIsAuthorized, server, setServer} = useContext(
    AuthContext,
  );
  const [user, setUser] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);

  const onLoginClicked = async () => {
    setIsLoading(true);
    setIsAuthorized(false);
    const body = {
      Action: 'Login',
      Parameters: {
        username: user,
        password: password,
        rememberMe: false,
      },
    };

    const options = {
      url: server,
      method: 'post',
      data: body,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'ecs/json',
        Action: 'Login',
      },
      withCredentials: true,
    };
    try {
      const response = await axios(options);

      const accountStatus = response?.data?.ReturnValue?.AccountStatus;
      const dropPassValidation =
        response?.data?.ReturnValue?.DropPassValidation;
      const PassPattern = response?.data?.ReturnValue?.PassPattern;
      const ticket = response?.data?.ReturnValue?.Ticket;
      const userId = response?.data?.ReturnValue?.UserID;

      if (accountStatus === 3 && response.status === 200) {
        // set isAuthenticated = true;
        setIsAuthorized(true);
      } else {
        // set isAuthenticated = false;
        // show error message on login screenSize
        Alert('Error on login');
      }

      console.log(response);
    } catch (err) {
      Alert('Error on login');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>User</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setUser(text)}
          value={user}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Password</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Server</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setServer(text)}
          value={server}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Button
          title="LOGIN"
          onPress={() => onLoginClicked()}
          disabled={user === '' || password === '' || server === ''}
        />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Authenticated: {isAuthorized ? 'True' : 'False'}
        </Text>
        {isLoading && <ActivityIndicator size="large" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default Login;
