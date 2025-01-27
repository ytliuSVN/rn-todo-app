import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'baseline',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 4,
  },
  logoTextL: {
    fontSize: 64,
    paddingRight: 4,
    alignItems: 'center',
  },
  logoTextR: {
    fontSize: 64,
    flexGrow: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#8a8888',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});

export default styles;
