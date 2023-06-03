import { StatusBar } from 'expo-status-bar';
import { Linking, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>MentalHealth</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Text
        style={styles.hyperlinkStyle}
        onPress={() => {
          Linking.openURL('https://psychologytoday.tests.psychtests.com/bin/transfer');
        }}>
        Open Mental Health Assessment
      </Text>
      <Text
        style={styles.hyperlinkStyle}
        onPress={() => {
          Linking.openURL('https://www.mdcalc.com/calc/1727/gad7-general-anxiety-disorder7');
        }}>
        Open General Anxiety Disorder Assessment
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hyperlinkStyle: {
    color: 'blue',
  },
});
