import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

    backgroundColor: 'white',

    // iOS shadow
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,

    // Android shadow
    elevation: 4,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedText: {
    color: '#FF009C',
  },
  unselectedText: {
    color: '#1C1C1C',
  },
});

export default styles;
