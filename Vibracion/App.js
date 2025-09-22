// App.js
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Vibration,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState(null);
  const [inCall, setInCall] = useState(false); // false = entrante, true = en curso

  // Configurar audio para que funcione en iOS/Android
  useEffect(() => {
    const configureAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };
    configureAudio();

    // iniciar llamada entrante al abrir la app
    startIncomingCall();

    return () => {
      endCall();
    };
  }, []);

  // Reproducir un audio en loop
  const playSound = async (file) => {
    try {
      const { sound } = await Audio.Sound.createAsync(file, {
        shouldPlay: true,
        isLooping: true,
      });
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error reproduciendo sonido:", error);
    }
  };

  // Iniciar llamada entrante
  const startIncomingCall = () => {
    Vibration.vibrate([500, 1000], true);
    playSound(require("./assets/john-pork-is-calling_JdVKLhF.mp3")); // ringtone
  };

  // Contestar llamada
  const answerCall = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    playSound(
      require("./assets/Dead_Silence_Hides_My_Cries_-_The_Helping_Hand_Breakdown_show_Voron_(mp3.pm).mp3")
    ); // música durante llamada
    setInCall(true);
  };

  // Rechazar / cortar llamada
  const endCall = async () => {
    Vibration.cancel();
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setInCall(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://static.wikia.nocookie.net/notcaukaso/images/5/59/John_pork.png/revision/latest/thumbnail/width/360/height/450?cb=20230924035537&path-prefix=es" }}
        style={styles.avatar}
      />

      <Text style={styles.name}>John Pork</Text>
      <Text style={styles.subtitle}>
        {inCall ? "Llamada en curso..." : "Llamada entrante..."}
      </Text>

      {!inCall ? (
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.circleButton, { backgroundColor: "green" }]}
            onPress={answerCall}
          >
            <Text style={styles.icon}>📞</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.circleButton, { backgroundColor: "red" }]}
            onPress={endCall}
          >
            <Text style={styles.icon}>❌</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.circleButton, { backgroundColor: "red", marginTop: 20 }]}
          onPress={endCall}
        >
          <Text style={styles.icon}>🔴</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101820FF", // negro elegante
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#25D366", // verde WhatsApp
  },
  name: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 18, marginBottom: 40, color: "lightgray" },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  circleButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  icon: { fontSize: 30, color: "white" },
});
