// App.js
import React from 'react';
import { View, Button, StyleSheet, Vibration, Text } from 'react-native';

export default function App() {
  const startInfiniteVibration = () => {
    Vibration.vibrate([100], true);
  };

  const cancelVibration = () => {
    Vibration.cancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vibración infinita</Text>
      <Button title="Iniciar Vibración" onPress={startInfiniteVibration} />
      <View style={{ height: 20 }} />
      <Button title="Cancelar Vibración" onPress={cancelVibration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' }
});
