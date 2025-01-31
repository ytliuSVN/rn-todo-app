// Core React and React Native imports
import React from 'react';
import { Text, View } from 'react-native';

// Third-party library imports
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import { useTranslation } from 'react-i18next';

// Local imports: constants
import { COLORS } from '@/constants/colors';

// Local imports: styles
import styles from './index.style';

export default function Header() {
  const { t } = useTranslation();

  const [fontsLoaded] = useFonts({
    Bangers_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoTextL, { fontFamily: 'Bangers_400Regular' }]}>
          2D
        </Text>
        <FontAwesome
          name={'check-circle'}
          size={48}
          color={COLORS.STATUS.COMPLETED}
        />
        <Text style={[styles.logoTextR, { fontFamily: 'Bangers_400Regular' }]}>
          list
        </Text>
      </View>
      <Text style={styles.subtitle}>{ t('subtitle') }</Text>
    </>
  );
}
