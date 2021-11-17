import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  baseButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2196F3',
  },
  coverImage: {
    width: 100,
    height: '100%',
    flex: 3,
    resizeMode: 'cover',
  },
  detailsImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
  basicInfoContainer: {
    flex: 4,
    flexDirection: 'row',
    marginTop: 10,
  },
  basicInfo: {
    flex: 6,
    padding: 10,
    flexDirection: 'column',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  textBold: {
    fontWeight: 'bold',
  },
  showNameText: {
    paddingLeft: 6,
    fontSize: 18,
  },

  summaryContainer: {
    flex: 1,
    width: '100%',
  },
  episodesContainer: {
    marginVertical: 20,
    flex: 7,
  },
  episodeItem: {
    paddingVertical: 10,
    marginVertical: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default styles;
