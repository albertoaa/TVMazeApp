import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { Episode } from '../models';
import styles from '../styles/components';

export const Details = ({ route }) => {
  const [episode, setEpisode] = useState<Partial<Episode>>({});
  useEffect(() => {
    setEpisode(JSON.parse(route.params.episode));
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Image
        style={styles.detailsImage}
        source={{ uri: episode.image?.original || episode.image?.medium }}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.showNameText}>{episode.name}</Text>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-family: Verdana; font-size: 16px; padding-bottom: 10px">${episode.summary}</body></html>`,
          }}
        />
      </View>
    </View>
  );
};
