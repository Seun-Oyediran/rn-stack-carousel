import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import play from "../../assets/play.png";
import watch from "../../assets/watch.png";

export function Buttons() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Image source={play} style={styles.icon} />
        <Text style={styles.text}>Trailer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.button2]}>
        <Image source={watch} style={styles.icon} />
        <Text
          style={[
            styles.text,
            {
              color: "#fff",
            },
          ]}
        >
          Watch
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 13,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  button2: {
    gap: 6,
    backgroundColor: "rgba(255,255,255,.3)",
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontFamily: "NunitoBold",
    color: "#27272f",
    fontSize: 16,
    lineHeight: 18,
    marginTop: 3,
  },
});
