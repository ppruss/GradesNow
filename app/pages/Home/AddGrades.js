import React, { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

const AddGrades = () => {
  const [name, setName] = useState();
  const [semester, setSemester] = useState();
  const [grade, setGrade] = useState();
  const [credits, setCredits] = useState();
  const [status, setStatus] = useState();
  const [note, setNote] = useState();

  const addGrade = async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch("http://10.0.2.2:3000/grades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      },
      body: JSON.stringify({
        name: name,
        semester: semester,
        grade: grade,
        credits: credits,
        status: status,
        note: note
      })
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Subject: </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={value => setName(value)}
      />
      <Text>Semester: </Text>
      <TextInput
        style={styles.input}
        value={semester}
        onChangeText={value => setSemester(value)}
      />
      <Text>Grade: </Text>
      <TextInput
        style={styles.input}
        value={grade}
        onChangeText={value => setGrade(value)}
        keyboardType="numeric"
      />
      <Text>Credits: </Text>
      <TextInput
        style={styles.input}
        value={credits}
        keyboardType="numeric"
        onChangeText={value => setCredits(value)}
      />
      <Text>Status: </Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={value => setStatus(value)}
      />
      <Text>Note: </Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={value => setNote(value)}
      />
      <Button title="Submit" onPress={addGrade} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: "#333",
    margin: 5
  },
  container: {
    padding: 10
  }
});

export default AddGrades;
