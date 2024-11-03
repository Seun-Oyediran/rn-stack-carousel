import React, { Fragment } from "react";
import { Animated, StyleSheet } from "react-native";
import { movies } from "@/utils/static";

interface IProps {
  dwidth: number;
  scrollX: Animated.Value;
}

export function Background(props: IProps) {
  const { dwidth, scrollX } = props;

  return (
    <Fragment>
      {movies.map((item, index) => {
        const inputRange = [
          (index - 1) * dwidth,
          index * dwidth,
          (index + 1) * dwidth,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        });

        return (
          <Animated.Image
            key={`${item.id}`}
            source={{ uri: item.backdrop_path }}
            style={[StyleSheet.absoluteFillObject, { opacity }]}
            blurRadius={20}
          />
        );
      })}
    </Fragment>
  );
}
