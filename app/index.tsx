// React and React Native core imports
import React, { useState, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Third-party library imports
import { LinearGradient } from 'expo-linear-gradient';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';

// Local imports: components
import Header from '@/components/Header';
import CardTodo from '@/components/CardTodo';
import TabBottomMenu from '@/components/TabBottomMenu';
import ButtonAdd from '@/components/ButtonAdd';

// Local imports: styles
import styles from './index.style';

// Local imports: types and constants
import { Todo, TabName, TODO_LIST } from '@/types/todo.types';

export default function Index() {
  const [todoList, setTodoList] = useState(TODO_LIST);
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedTabName, setSelectedTabName] = useState(TabName.ALL);
  const scrollViewRef = useRef<ScrollView>(null);

  function getFilteredList() {
    switch (selectedTabName) {
      case TabName.ALL:
        return todoList;
      case TabName.IN_PROGRESS:
        return todoList.filter((todo) => !todo.isCompleted);
      case TabName.DONE:
        return todoList.filter((todo) => todo.isCompleted);
    }
  }

  function deleteTodo(todoToDelete: Todo) {
    Alert.alert('タスクを削除', 'このタスクを削除してもよろしいですか？', [
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      { text: 'キャンセル', style: 'cancel' },
    ]);
  }

  function updateTodoTitle(todoToUpdate: Todo) {
    Alert.prompt(
      'タイトルを編集',
      '新しいタイトルを入力してください',
      [
        {
          text: '保存',
          onPress: (newTitle?: string) => {
            if (newTitle) {
              setTodoList(
                todoList.map((todo) =>
                  todo.id === todoToUpdate.id
                    ? { ...todo, title: newTitle }
                    : todo
                )
              );
            }
          },
        },
        {
          text: 'キャンセル',
          style: 'cancel',
        },
      ],
      'plain-text',
      todoToUpdate.title
    );
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View key={todo.id} style={styles.cardItem}>
        <CardTodo
          onLongPress={updateTodoTitle}
          onPress={updateTodo}
          onDelete={deleteTodo}
          todo={todo}
        />
      </View>
    ));
  }

  function updateTodo(todo: Todo) {
    const updatedTodoList = todoList.map((item) =>
      item.id === todo.id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodoList(updatedTodoList);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue('');

    // Scroll to the end of the list after adding a new todo
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 600);
  }

  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isAddDialogDisplayed}
        onBackdropPress={() => setIsAddDialogDisplayed(false)}
      >
        <Dialog.Title>新規タスク</Dialog.Title>
        <Dialog.Description>タスクを入力してください</Dialog.Description>

        <Dialog.Input
          onChangeText={setInputValue}
          placeholder='Ex: Go to the gym'
        />

        <Dialog.Button
          label='キャンセル'
          color='grey'
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label='保存'
          onPress={addTodo}
        />
      </Dialog.Container>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <LinearGradient
            colors={['#e3e3e3', '#fff']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradient}
          >
            {/* ===== Header Section ===== */}
            <View style={styles.header}>
              <Header />
            </View>

            {/* ===== Main Content Area ===== */}
            <View style={styles.body}>
              <ScrollView ref={scrollViewRef}>{renderTodoList()}</ScrollView>
            </View>

            {/* ===== Button Add ===== */}
            <ButtonAdd onPress={() => setIsAddDialogDisplayed(true)} />
          </LinearGradient>
        </SafeAreaView>
      </SafeAreaProvider>

      {/* ===== Bottom Navigation ===== */}
      <View style={styles.footer}>
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      {renderAddDialog()}
    </>
  );
}
