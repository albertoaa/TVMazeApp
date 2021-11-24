import React, { useEffect, useState } from 'react';
import {
  View,
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
    const translateY = Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * 60],
        outputRange: [0, -index * 60],
        extrapolateRight: 'clamp',
      })
    );
    const episode = {
      id,
      name,
      summary,
      season,
      number,
      image: image,
    };

    const episodeTitle = `${season}x${number} - ${name}`;
    return (
      <Animated.View style={[{ transform: [{ translateY }] }]}>
        <TouchableOpacity style={styles.episodeItem}>
          <Image
            style={styles.listImage}
            source={{ uri: episode.image?.original || episode.image?.medium }}
          />
          <Text style={styles.showNameText}>{episodeTitle}</Text>
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
