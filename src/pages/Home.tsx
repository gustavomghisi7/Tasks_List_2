import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    if(newTaskTitle !== ''){
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
  
      setTasks(oldState => [...oldState, data]);
    } else {

      Alert.alert('Você não pode adicionar uma tarefa vazia')
      return
    }

  }

  function handleMarkTaskAsDone(id: number) {
    const task = tasks.filter((item) => item.id == id)[0];
    task.done = !task.done;

    const newTasks = [...new Set([task, ...tasks])];
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ))
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}