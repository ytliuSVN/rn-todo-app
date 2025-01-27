// Core React and React Native imports
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Third-party library imports
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// Local imports: types and constants
import { COLORS } from '@/constants/colors';
import { Todo } from '@/types/todo.types';

// Local imports: styles
import styles from './index.style';

export default function CardTodo({
  todo,
  onPress,
  onDelete,
  onLongPress,
}: {
  todo: Todo;
  onPress: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onLongPress: (todo: Todo) => void;
}) {
  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 86 }],
      };
    });

    return (
      <Reanimated.View style={styleAnimation}>
        <View style={styles.rightActionContainer}>
          <Text style={styles.rightAction} onPress={() => onDelete(todo)}>
            <FontAwesome name='trash' size={40} color={'white'} />
          </Text>
        </View>
      </Reanimated.View>
    );
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.shadow}>
        <ReanimatedSwipeable
          containerStyle={styles.swipeableContainer}
          friction={2}
          enableTrackpadTwoFingerGesture
          rightThreshold={40}
          renderRightActions={RightAction}
        >
          <TouchableOpacity
            onLongPress={() => onLongPress(todo)}
            style={styles.card}
          >
            <Text
              style={[
                styles.title,
                todo.isCompleted && {
                  textDecorationLine: 'line-through',
                  fontStyle: 'italic',
                  opacity: 0.5,
                },
              ]}
              numberOfLines={2}
              ellipsizeMode='tail'
            >
              {todo.title}
            </Text>
            <FontAwesome
              onPress={() => onPress(todo)}
              name={todo.isCompleted ? 'check-circle' : 'circle-o'}
              size={36}
              color={
                todo.isCompleted
                  ? COLORS.STATUS.COMPLETED
                  : COLORS.STATUS.PENDING
              }
            />
          </TouchableOpacity>
        </ReanimatedSwipeable>
      </View>
    </GestureHandlerRootView>
  );
}
