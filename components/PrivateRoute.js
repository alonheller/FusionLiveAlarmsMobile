import React from 'react';
import { Route, Redirect } from "react-router-native";
import { View,Text, StyleSheet } from 'react-native';

const PrivateRoute: () => React$Node = ({ component: Comp, ...rest }) => {
    const {authenticated} = rest;
    
    return (
        <View>
          <Route {...rest} render={rest => {             
            if (authenticated) {
              return <Comp {...rest} />
            } else {
              return <Redirect
              to={{
                pathname: "/login",
                state: { from: rest.location }
              }}
            />
            }
          }} />
      </View>
    );
  }

export default PrivateRoute;
