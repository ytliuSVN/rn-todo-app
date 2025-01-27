import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TabBottomMenu from '../index';
import { TabName } from '@/types/todo.types';

describe('TabBottomMenu', () => {
  const mockTodoList = [
    { id: 1, title: 'Test 1', isCompleted: false },
    { id: 2, title: 'Test 2', isCompleted: true },
    { id: 3, title: 'Test 3', isCompleted: false },
  ];

  const mockOnPress = jest.fn();

  it('renders all tabs with correct counts', () => {
    const { getByText } = render(
      <TabBottomMenu
        selectedTabName={TabName.ALL}
        onPress={mockOnPress}
        todoList={mockTodoList}
      />
    );

    expect(getByText('すべて (3)')).toBeTruthy();
    expect(getByText('進行中 (2)')).toBeTruthy();
    expect(getByText('完了 (1)')).toBeTruthy();
  });

  it('calls onPress with correct tab name', () => {
    const { getByText } = render(
      <TabBottomMenu
        selectedTabName={TabName.ALL}
        onPress={mockOnPress}
        todoList={mockTodoList}
      />
    );

    fireEvent.press(getByText('進行中 (2)'));
    expect(mockOnPress).toHaveBeenCalledWith(TabName.IN_PROGRESS);
  });

  it('applies correct style to selected tab', () => {
    const { getByText } = render(
      <TabBottomMenu
        selectedTabName={TabName.DONE}
        onPress={mockOnPress}
        todoList={mockTodoList}
      />
    );

    const selectedTab = getByText('完了 (1)');
    expect(selectedTab.props.style).toMatchObject({
      color: '#FF009C'
    });
  });
});