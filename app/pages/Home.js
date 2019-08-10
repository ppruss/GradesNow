import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import Grades from "./Home/Grades";
import Statistics from "./Home/Statistics";
import AddGrades from "./Home/AddGrades";

const TabNavigator = createBottomTabNavigator({
  Grades: Grades,
  Statistics: Statistics,
  "Add Grades": AddGrades
});

export default createAppContainer(TabNavigator);
