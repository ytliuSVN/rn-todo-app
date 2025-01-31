import { Text, TouchableOpacity } from 'react-native';
import styles from './index.style';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '@/constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

export default function ButtonAdd({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <LinearGradient
        colors={[COLORS.BRAND.PINK, COLORS.BRAND.PURPLE]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.btn}
      >
        <FontAwesome name='trash' size={18} color={'white'} />
        <Text style={styles.txt}>{ t('createNew') }</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}
