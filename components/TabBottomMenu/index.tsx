import { Text, TouchableOpacity, View } from 'react-native';
import styles from './index.style';
import { TabName } from '@/types/todo.types';
import { useTranslation } from 'react-i18next';

type TabBottomMenuProps = {
  selectedTabName: string;
  onPress: (tabName: string) => void;
  todoList: Array<{ isCompleted: boolean }>;
};

/**
 * TabBottomMenu - Bottom navigation component with three states:
 * - All (すべて)
 * - In Progress (進行中)
 * - Done (完了)
 */
export default function TabBottomMenu({
  selectedTabName,
  onPress,
  todoList,
}: TabBottomMenuProps) {
  const { t } = useTranslation();

  const TAB_TEXT = {
    [TabName.ALL]: t('tabs.all'),
    [TabName.IN_PROGRESS]: t('tabs.inProgress'),
    [TabName.DONE]: t('tabs.done'),
  };
  /**
   * Counts todos by their completion status
   * @example
   * {
   *   all: 10,        // Total number of todos
   *   inProgress: 6,  // Number of incomplete todos
   *   done: 4         // Number of completed todos
   * }
   */
  const countByStatus = {
    all: todoList.length,
    inProgress: todoList.filter((todo) => !todo.isCompleted).length,
    done: todoList.filter((todo) => todo.isCompleted).length,
  };

  function getTextStyle(tabName: string) {
    return {
      ...styles.baseText,
      color:
        selectedTabName === tabName
          ? styles.selectedText.color
          : styles.unselectedText.color,
    };
  }

  return (
    <View style={styles.root}>
      {/* ===== All Tasks Tab ===== */}
      <TouchableOpacity onPress={() => onPress(TabName.ALL)}>
        <Text style={getTextStyle(TabName.ALL)}>{TAB_TEXT[TabName.ALL]} ({countByStatus.all})</Text>
        {/* <Text>{countByStatus.all}</Text> */}
      </TouchableOpacity>

      {/* ===== In Progress Tab ===== */}
      <TouchableOpacity onPress={() => onPress(TabName.IN_PROGRESS)}>
        <Text style={getTextStyle(TabName.IN_PROGRESS)}>
          {TAB_TEXT[TabName.IN_PROGRESS]} ({countByStatus.inProgress})
        </Text>
        {/* <Text>{countByStatus.inProgress}</Text> */}
      </TouchableOpacity>

      {/* ===== Completed Tasks Tab ===== */}
      <TouchableOpacity onPress={() => onPress(TabName.DONE)}>
        <Text style={getTextStyle(TabName.DONE)}>{TAB_TEXT[TabName.DONE]} ({countByStatus.done})</Text>
        {/* <Text>{countByStatus.done}</Text> */}
      </TouchableOpacity>
    </View>
  );
}
