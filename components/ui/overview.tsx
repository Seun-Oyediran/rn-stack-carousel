import { movies } from "@/utils/static";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

const OVERVIEW_HEIGHT = 150;

interface IProps {
  dwidth: number;
  scrollX: Animated.Value;
}

export function Overview(props: IProps) {
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
          outputRange: [OVERVIEW_HEIGHT, 0, -OVERVIEW_HEIGHT],
        });

        return (
          <Animated.View
            key={`${item.id}`}
            style={{
              height: OVERVIEW_HEIGHT,
              opacity,
              transform: [{ translateY }],
            }}
          >
            <Text style={styles.text}>{item.overview}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    height: OVERVIEW_HEIGHT,
    overflow: "hidden",
  },
  text: {
    fontSize: 16,
    lineHeight: 18,
    color: "#fff",
    fontFamily: "NunitoBold",
  },
});
