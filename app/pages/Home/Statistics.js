import React, { Fragment, useEffect, useState } from "react";
import { Text, StyleSheet, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { BarChart } from "react-native-chart-kit";

const Statistics = () => {
  const [grades, setGrades] = useState();
  const [totalCredits, setTotalCredits] = useState(0);
  const [averageGrade, setAverageGrade] = useState(0);
  const [gradeAmounts, setGradeAmounts] = useState([0, 0, 0, 0, 0]);

  const barData = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        data: gradeAmounts
      }
    ]
  };

  useEffect(() => {
    refreshList();
  }, []);

  const refreshBars = data => {
    let counts = [0, 0, 0, 0, 0];
    for (i = 0; i < data.length; i++) {
      var num = parseFloat(data[i].grade);
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    setGradeAmounts([counts[1], counts[2], counts[3], counts[4], counts[5]]);
  };

  // Bar Chart Configuration
  const chartConfig = {
    backgroundGradientFrom: "#139",
    backgroundGradientTo: "#29d",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };

  const refreshList = async () => {
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
    refreshBars(responseData);

    let sumCredits = 0;
    let avgGrade = 0;
    for (i = 0; i < responseData.length; i++) {
      sumCredits += parseFloat(responseData[i].credits);
      avgGrade += parseFloat(responseData[i].grade);
    }

    avgGrade /= responseData.length;

    setTotalCredits(sumCredits);
    setAverageGrade(avgGrade.toFixed(1));
  };

  return (
    <Fragment>
      <Text style={styles.big}>Total Credits: {totalCredits}</Text>
      <Text style={styles.big}>Average Grade: {averageGrade}</Text>
      <BarChart
        style={styles.chart}
        data={barData}
        width={Dimensions.get("window").width}
        height={420}
        chartConfig={chartConfig}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  big: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 10
  },
  chart: {
    marginTop: 20
  }
});

export default Statistics;
