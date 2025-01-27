export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export enum TabName {
  ALL = 'all',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export const TODO_LIST: Todo[] = [
  { id: 1, title: 'Buy coffee for morning meeting', isCompleted: false },
  { id: 2, title: 'Go to office for team building', isCompleted: true },
  { id: 3, title: 'Take TOEIC mock test', isCompleted: false },
  { id: 4, title: 'あああああああああ10あああああああああ20あああああああああ30あああああああああ40', isCompleted: true },
  { id: 5, title: 'Pay electricity bill', isCompleted: false },
  { id: 6, title: 'Pick up dry cleaning', isCompleted: true },
  { id: 7, title: 'Schedule dentist appointment', isCompleted: false },
  { id: 8, title: 'Buy groceries for dinner', isCompleted: false },
  { id: 9, title: 'Review project deadline', isCompleted: true },
  { id: 10, title: 'Book flight tickets for vacation', isCompleted: false },
];