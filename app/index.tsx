// React and React Native core imports
import React, { useState, useRef } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Third-party library imports
import { LinearGradient } from 'expo-linear-gradient';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

// Local imports: components
import Header from '@/components/Header';
import CardTodo from '@/components/CardTodo';
import TabBottomMenu from '@/components/TabBottomMenu';
import ButtonAdd from '@/components/ButtonAdd';

// Local imports: styles
import styles from './index.style';

// Local imports: types and constants
import { Todo, TabName } from '@/types/todo.types';

export default function Index() {
  const [todoList, setTodoList] = useState([]);
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedTabName, setSelectedTabName] = useState(TabName.ALL);
  const scrollViewRef = useRef<ScrollView>(null);

  /**
   * Tracks the first render of the component to skip initial side effects
   * Set to true initially, becomes false after first render
   */
  const [isInitialRender, setIsInitialRender] = useState(true);

  /**
   * Prevents unnecessary updates during data loading
   * Set to false initially, becomes true during data updates
   */
  const [isLoadUpdate, setIsLoadUpdate] = useState(false);

  const { t } = useTranslation();

  React.useEffect(() => {
    loadTodoList();
  }, []);

  React.useEffect(() => {
    // Skip effect during updates from loading data
    if (isLoadUpdate) {
      setIsLoadUpdate(false);
      return;
    }

    // Skip first render
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    // Save todo list on subsequent changes
    saveTodoList();
  }, [todoList]);

  async function loadTodoList() {
    // console.log('LOAD');

    try {
      const todoListString = await AsyncStorage.getItem('@todoList');
      const parsedTodoList = todoListString ? JSON.parse(todoListString) : [];
      setIsLoadUpdate(true);
      setTodoList(parsedTodoList);
    } catch (err) {
      alert(err)
    }
  }

  async function saveTodoList() {
    // console.log('SAVE');

    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    } catch (err) {
      alert(err)
    }
  }

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
    Alert.alert(t('dialog.delete.title'), t('dialog.delete.description'), [
      {
        text: t('dialog.actions.delete'),
        style: 'destructive',
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      { text: t('dialog.actions.cancel'), style: 'cancel' },
    ]);
  }

  function updateTodoTitle(todoToUpdate: Todo) {
    Alert.prompt(
      t('dialog.update.title'),
      t('dialog.update.description'),
      [
        {
          text: t('dialog.actions.save'),
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
          text: t('dialog.actions.cancel'),
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
        <Dialog.Title>{ t('dialog.create.title') }</Dialog.Title>
        <Dialog.Description>{ t('dialog.create.description') }</Dialog.Description>

        <Dialog.Input
          onChangeText={setInputValue}
          placeholder='Ex: Go to the gym'
        />

        <Dialog.Button
          label={t('dialog.actions.cancel')}
          color='grey'
          onPress={() => setIsAddDialogDisplayed(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label={t('dialog.actions.save')}
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
