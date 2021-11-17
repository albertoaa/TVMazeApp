import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../styles/components';
import { getShowInfo } from '../api';
import { Show } from '../models';

export const Home = ({ navigation }) => {
  const [showInfo, setShowInfo] = useState<Partial<Show>>({});

  useEffect(() => {
    const fetchShowInfo = async () => {
      const data = await getShowInfo('powerpuff', true);
      setShowInfo(data);
    };
    fetchShowInfo();
  }, []);

  const renderEpisodeTitle = ({ item }) => {
    const { id, name, summary, season, number, image } = item;
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
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', { episode: JSON.stringify(episode) })
        }
        style={styles.episodeItem}
      >
        <Text style={styles.showNameText}>{episodeTitle}</Text>
      </TouchableOpacity>
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
        <FlatList
          data={showInfo._embedded?.episodes}
          renderItem={renderEpisodeTitle}
          keyExtractor={(episode) => episode.id}
        />
      </View>
    </View>
  );
};
