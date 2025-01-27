import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cardItem: {
    paddingTop: 4,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  header: { flex: 1 },
  body: { flex: 5 },
  footer: {
    backgroundColor: 'white',
    height: 76,
    paddingBottom: 12,
  },
});

export default styles;
