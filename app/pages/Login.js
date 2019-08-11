import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const Login = ({ navigation }) => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    checkToken();
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch("http://10.0.2.2:3000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });
    var responseData = await res.json();

    if (responseData && responseData.login && responseData.login == "success") {
      navigation.navigate("Home");
    }
  };

  const loginUser = async () => {
    const res = await fetch("http://10.0.2.2:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        password: password
      })
    });
    var responseData = await res.json();
    if (!responseData.token) {
      setErrorMessage(responseData.message);
      setTimeout(() => setErrorMessage(""), 3000);
    } else {
      await AsyncStorage.setItem("token", responseData.token);
      navigation.navigate("Home");
    }
  };

  return (
    <Fragment>
      <View style={styles.body}>
        <Text style={styles.h1}>Login</Text>
        <Text>Username:</Text>
        <TextInput
          placeholder="Your username..."
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={value => setName(value)}
        />
        <Text>Password:</Text>
        <TextInput
          placeholder="Your password..."
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          value={password}
          onChangeText={value => setPassword(value)}
        />
        <Text>{errorMessage}</Text>
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
  }
});

export default Login;
