import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GradesItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.col}>Grade: {item.grade}</Text>
      <Text style={styles.col}>Credits: {item.credits}</Text>
      <Text style={styles.col}>Status: {item.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    width: "100%",
    marginBottom: 5
  },
  col: {
    width: 120
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    padding: 10
  }
});

export default GradesItem;
