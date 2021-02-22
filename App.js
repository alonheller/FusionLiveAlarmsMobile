import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { NativeRouter, Route, Redirect,withRouter } from "react-router-native";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: () => React$Node = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [history, setHistory] = useState();

  const onLoginClicked = (history) => {
      setHistory(history);
      setAuthenticated(true);
	}

  useEffect(() => {
    if (authenticated) {
      history.push("/dashboard");
    }
  }, [authenticated]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <NativeRouter>
              <Route exact path="/" render={(props) => <Login loginHandler={onLoginClicked} history={props.history}/>} />
              <PrivateRoute path="/dashboard" component={Dashboard} authenticated={authenticated}/>
            </NativeRouter>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
});

export default App;
