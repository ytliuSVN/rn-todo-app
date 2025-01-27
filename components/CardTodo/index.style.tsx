import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rightActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#A6009C',
    padding: 18,
  },
  rightAction: {
    width: 40,
    height: 40,
  },
  separator: {
    width: '100%',
    borderTopWidth: 1,
  },
  swipeableContainer: {
    height: 115,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    color: '#1C1C1C',
    maxWidth: '80%',
    overflow: 'hidden',
  },
  shadow: {
    // iOS shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android shadow
    elevation: 8,
  },
});

export default styles;
