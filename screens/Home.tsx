import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles/components';
import { getShowInfo } from '../api';
import { Show } from '../models';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const { height: wHeight } = Dimensions.get('window');
const height = wHeight - 200;

export const Home = ({ navigation }) => {
  const [showInfo, setShowInfo] = useState<Partial<Show>>({});

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });

  useEffect(() => {
    const fetchShowInfo = async () => {
      const data = await getShowInfo('24', true);
      setShowInfo(data);
    };
    fetchShowInfo();
  }, []);

  const EpisodeItem = ({ index, item, y }) => {
    const { id, name, summary, season, number, image } = item;
    const position = Animated.subtract(index * 72, y);
    const isDisappearing = -72;
    const isTop = 0;
    const isBottom = height - 72;
    const isAppearing = height;
    const translateY = Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * 72],
        outputRange: [0, -index * 72],
        extrapolateRight: 'clamp',
      })
    );
    const scale = position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.5, 1, 1, 0.5],
      extrapolate: 'clamp',
    });
    const opacity = position.interpolate({
      inputRange: [isDisappearing, isTop, isBottom, isAppearing],
      outputRange: [0.5, 1, 1, 0.5],
    });
    const episode = {
      id,
      name,
      summary,
      season,
      number,
      image: image,
    };

    const episodeNumber = `${season}x${number}`;
    const episodeTitle = `${name}`;
    return (
      <Animated.View
        style={[{ opacity, transform: [{ translateY }, { scale }] }]}
      >
        <TouchableOpacity
          style={styles.episodeItem}
          onPress={() =>
            navigation.navigate('Details', { episode: JSON.stringify(episode) })
          }
        >
          <Image
            style={styles.listImage}
            source={{ uri: episode.image?.original || episode.image?.medium }}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.showNameText}>{episodeNumber}</Text>
            <Text style={styles.showNameText}>{episodeTitle}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.basicInfoContainer}>
        <Image
          style={styles.coverImage}
          source={{ uri: showInfo.image?.original || showInfo.image?.medium }}
        />
        <View style={styles.basicInfo}>
          <Text style={[styles.showNameText, styles.textBold]}>
            {showInfo.name}
          </Text>
          <WebView
            originWhitelist={['*']}
            style={styles.summaryContainer}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-family: Verdana; font-size: 14px; padding-bottom: 10px">${showInfo.summary}</body></html>`,
            }}
          />
        </View>
      </View>
      <View style={styles.episodesContainer}>
        <AnimatedFlatList
          scrollEventThrottle={16}
          data={showInfo._embedded?.episodes}
          renderItem={({ index, item }) => (
            <EpisodeItem index={index} item={item} y={y} />
          )}
          keyExtractor={(episode) => episode.id}
          {...{ onScroll }}
        />
      </View>
    </View>
  );
};
