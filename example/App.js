import React from "react";
import { View, StatusBar, StyleSheet, Text, Alert } from "react-native";
import { LaunchArguments } from "react-native-launch-arguments";
import { stringifyPair } from "./stringifyPair";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {Object.entries(LaunchArguments.value()).map(([k, v]) => (
          <Text key={k} style={styles.sectionDescription}>
            {stringifyPair(k, v)}
          </Text>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default App;
