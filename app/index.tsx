import { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { movies } from "@/utils/static";
import { Background, Buttons, Overview, Title } from "@/components/ui";

export default function Index() {
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList<any>>(null);

  const dwidth = width / 1.5;

  return (
    <View style={[styles.container, { paddingBottom: bottom, gap: 20 }]}>
      <Background dwidth={dwidth} scrollX={scrollX} />

      <View style={{ flex: 1, justifyContent: "center", gap: 20 }}>
        <Title dwidth={dwidth} scrollX={scrollX} />
        <View style={styles.content}>
          <Animated.FlatList
            ref={flatListRef}
            data={movies}
            horizontal
            removeClippedSubviews={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={dwidth}
            keyExtractor={(item) => item.id.toString()}
            decelerationRate="fast"
            bounces={false}
            style={styles.flatlist}
            contentContainerStyle={{
              paddingRight: dwidth,
            }}
            // onEndReached={() => {
            //   flatListRef.current?.scrollToOffset({
            //     offset: 0,
            //     animated: !true,
            //   });
            // }}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * dwidth,
                index * dwidth,
                (index + 1) * dwidth,
              ];

              const outputRange = [index * 5, index * 5, dwidth + index * 5];

              const translateX = scrollX.interpolate({
                inputRange,
                outputRange,
              });

              const scaleY = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1, 0.96],
                extrapolateLeft: "clamp",
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1, 0.7],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  style={[
                    styles.imageCon,
                    {
                      width: dwidth,
                      transform: [{ translateX }, { scaleY }],
                      opacity,
                    },
                  ]}
                >
                  <View
                    style={{
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={{
                        uri: item.poster_path,
                      }}
                      style={styles.image}
                    />
                  </View>
                </Animated.View>
              );
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          />
        </View>

        <Overview dwidth={dwidth} scrollX={scrollX} />
      </View>

      <Buttons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    paddingLeft: 40,
  },
  flatlist: {
    flexGrow: 0,
  },
  imageCon: {
    height: 400,
    paddingHorizontal: 4,
  },
  image: {
    height: 400,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 30,
    overflow: "hidden",
  },
});
