import React, { Fragment, useEffect, useState } from "react";
import { Text } from "react-native";
import { BarChart } from "react-native-chart-kit";

const Statistics = () => {
  const [grades, setGrades] = useState();
  const [totalCredits, setTotalCredits] = useState();
  const [averageGrade, setAverageGrade] = useState();
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

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2 // optional, default 3
  };

  const refreshList = async () => {
    const res = await fetch("http://10.0.2.2:3000/grades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
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
    setAverageGrade(avgGrade);
  };

  return (
    <Fragment>
      <Text>Total Credits: {totalCredits}</Text>
      <Text>Average Grade: {averageGrade}</Text>
      <BarChart
        // style={graphStyle}
        data={barData}
        width={400}
        height={420}
        chartConfig={chartConfig}
      />
    </Fragment>
  );
};

export default Statistics;
