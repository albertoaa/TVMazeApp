import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacit } from 'react-native';
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

  return (
    <View style={styles.rootContainer}>
      <View style={styles.basicInfoContainer}>
        <Image
          style={styles.coverImage}
          source={{ uri: showInfo.image?.original || showInfo.image?.medium }}
        />
        <View style={styles.basicInfo}>
          <Text style={styles.showNameText}>{showInfo.name}</Text>
          <WebView
            originWhitelist={['*']}
            style={styles.summaryContainer}
            source={{
              html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="font-family: Verdana; font-size: 14px; padding-bottom: 10px">${showInfo.summary}</body></html>`,
            }}
          />
        </View>
      </View>
      <View style={styles.episodesContainer}></View>
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details');
        }}
        style={styles.baseButton}
      >
        <Text>Go to Details</Text>
      </TouchableOpacity> */}
    </View>
  );
};
