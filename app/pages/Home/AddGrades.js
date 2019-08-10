import React, { Fragment, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  FlatList,
  Button,
  RefreshControl
} from "react-native";

const AddGrades = () => {
  const [name, setName] = useState();
  const [semester, setSemester] = useState();
  const [grade, setGrade] = useState();
  const [credits, setCredits] = useState();
  const [status, setStatus] = useState();
  const [note, setNote] = useState();

  const addGrade = async () => {
    const res = await fetch("http://10.0.2.2:3000/grades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        name: name,
        semester: semester,
        grade: grade,
        credits: credits,
        status: status,
        note: note,
        date: new Date().getDate()
      }
    });
  };

  return (
    <Fragment>
      <Text>Add Grades</Text>
      <Text>Subject: </Text>
      <TextInput value={name} onChangeText={value => setName(value)} />
      <Text>Semester: </Text>
      <TextInput value={semester} onChangeText={value => setSemester(value)} />
      <Text>Grade: </Text>
      <TextInput value={grade} onChangeText={value => setGrade(value)} />
      <Text>Credits: </Text>
      <TextInput value={credits} onChangeText={value => setCredits(value)} />
      <Text>Status: </Text>
      <TextInput value={status} onChangeText={value => setStatus(value)} />
      <Text>Note: </Text>
      <TextInput value={note} onChangeText={value => setNote(value)} />
      <Button title="Submit" onPress={addGrade} />
    </Fragment>
  );
};

export default AddGrades;
