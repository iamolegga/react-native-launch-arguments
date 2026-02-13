

import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle
} from 'react-native';
import { LaunchArguments } from 'react-native-launch-arguments';

import { stringifyPair } from './stringifyPair';

export const App: React.FC = ()  => { 
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  };


  return (
    <View style={backgroundStyle}>
      <View style={styles.container}>
        <Text>Hello World</Text>
        {Object.entries(LaunchArguments.value()).map(([k, v]) => (
          <Text key={k} style={styles.sectionDescription}>
            {stringifyPair(k, v)}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});
