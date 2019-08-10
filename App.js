/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Fragment } from "react";
import { StatusBar } from "react-native";
import Login from "./app/pages/Login";

import { SafeAreaView, ScrollView } from "react-native";

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Login />
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
