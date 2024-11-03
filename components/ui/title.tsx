import { movies } from "@/utils/static";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const TITLE_HEIGHT = 50;

interface IProps {
  dwidth: number;
  scrollX: Animated.Value;
}

export function Title(props: IProps) {
  const { dwidth, scrollX } = props;

  return (
    <View style={styles.container}>
      {movies.map((item, index) => {
        const inputRange = [-dwidth, 0, dwidth];

        const opacity = scrollX.interpolate({
          inputRange: [
            (index - 1) * dwidth,
            index * dwidth,
            (index + 1) * dwidth,
          ],
          outputRange: [0, 1, 0],
        });

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [TITLE_HEIGHT, 0, -TITLE_HEIGHT],
        });

        return (
          <Animated.View
            key={`${item.id}`}
            style={[styles.itemCon, { opacity, transform: [{ translateY }] }]}
          >
            <Text style={styles.text}>{item.title}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    height: TITLE_HEIGHT,
    overflow: "hidden",
  },
  itemCon: {
    height: TITLE_HEIGHT,
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    lineHeight: 32,
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "NunitoBold",
    textAlign: "center",
  },
});
