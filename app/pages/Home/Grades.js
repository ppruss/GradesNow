import React, { Fragment, useEffect, useState } from "react";
import { Text, FlatList, Button, RefreshControl } from "react-native";

const Grades = () => {
  const [grades, setGrades] = useState();
  const [refreshing, setRefreshing] = useState();

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    setRefreshing(true);
    const res = await fetch("http://10.0.2.2:3000/grades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    var responseData = await res.json();
    setGrades(responseData);
    setRefreshing(false);
  };

  return (
    <Fragment>
      <Button title="Refresh" onPress={refreshList} />
      <FlatList
        data={grades}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshList} />
        }
        renderItem={({ item }) => (
          <Text>
            {item.name} {item.grade} {item.credits} {item.status}
          </Text>
        )}
      />
    </Fragment>
  );
};

export default Grades;
