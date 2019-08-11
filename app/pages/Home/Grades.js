import React, { Fragment, useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { FlatList, RefreshControl } from "react-native";

import GradesItem from "./GradesItem";

const Grades = () => {
  const [grades, setGrades] = useState();
  const [refreshing, setRefreshing] = useState();

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    setRefreshing(true);
    const token = await AsyncStorage.getItem("token");
    const res = await fetch("http://10.0.2.2:3000/grades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    });
    var responseData = await res.json();
    setGrades(responseData);
    setRefreshing(false);
  };

  return (
    <Fragment>
      <FlatList
        data={grades}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshList} />
        }
        renderItem={({ item }) => <GradesItem item={item} />}
      />
    </Fragment>
  );
};

export default Grades;
