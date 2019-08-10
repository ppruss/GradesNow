import React, { Fragment } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

const Login = () => {
  const loginUser = () => {};

  return (
    <Fragment>
      <View style={styles.body}>
        <Text style={styles.h1}>Login</Text>
        <Text>Username:</Text>
        <TextInput placeholder="Your username..." placeholderTextColor="#ccc" />
        <Text>Password:</Text>
        <TextInput placeholder="Your password..." placeholderTextColor="#ccc" />
        <Button title="Submit" onPress={loginUser} />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "600"
  },
  body: {
    marginTop: 32,
    paddingHorizontal: 24
  },

  engine: {
    position: "absolute",
    right: 0
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});

export default Login;
