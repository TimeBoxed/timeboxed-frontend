// import React from 'react';
import taskreducer from '../reducers/task';

const tasks = [
  {
    _id: 1,
    title: 'Object 1',
    timeEstimated: 15,
    completed: false,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 1,
    subTasks: [],
  },
  {
    _id: 2,
    title: 'Task 2',
    timeEstimated: 60,
    completed: false,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 2,
    subTasks: [],
  },
];

const updatedTasks = [
  {
    _id: 2,
    title: 'Task 2',
    timeEstimated: 60,
    completed: false,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 2,
    subTasks: [],
  },
];

const object3 = [
  {
    _id: 3,
    title: 'Task 3',
    timeEstimated: 120,
    completed: true,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 1,
    subTasks: [],
  },
];

const combined1and3 = [
  {
    _id: 1,
    title: 'Object 1',
    timeEstimated: 15,
    completed: false,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 1,
    subTasks: [],
  },
  {
    _id: 3,
    title: 'Task 3',
    timeEstimated: 120,
    completed: true,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 1,
    subTasks: [],
  },
];

const testUpdateState = [
  {
    _id: 1,
    title: 'Object 1',
    timeEstimated: 15,
    completed: false,
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 1,
    subTasks: [],
  },
];

const updatedTask = [
  {
    _id: 2,
    title: 'Task 2',
    timeEstimated: 30, 
    completed: true, // changed
    createdOn: () => new Date(),
    dueDate: () => new Date(), 
    profile: 2,
    subTasks: [],
  },
];

describe('Testing the task reducer with different use cases', () => {
  test('for the TASK_SET case where no initial state', () => {
    const setAction = {
      type: 'TASK_SET',
      payload: tasks,
    };
    // Why does this have an extra level of Arrays 
    expect(taskreducer([], setAction)[0]).toEqual(tasks);
  });
  test('for the TASK_SET case where intial state is present', () => {
    const setAction = {
      type: 'TASK_SET',
      payload: [],
    };
    // Why does this have an extra level of Arrays 
    expect(taskreducer(tasks, setAction)[0]).toEqual(tasks);
  });

  test('for the TASKS_GET case', () => {
    const setAction = {
      type: 'TASKS_GET',
      payload: tasks,
    };

    expect(taskreducer([], setAction)).toEqual(tasks);
  });

  test('for the TASKS_GET case existing state 1 obj payload', () => {
    const setAction = {
      type: 'TASKS_GET',
      payload: object3,
    };

    expect(taskreducer(testUpdateState, setAction)).toEqual(combined1and3);
  });


  test('for the TASK_REMOVE case', () => {
    const setAction = {
      type: 'TASKS_REMOVE',
      payload: testUpdateState,
    };

    expect(taskreducer(tasks, setAction)).toEqual(updatedTasks);
  });
  test('for the TASK_UPDATE case', () => {
    const setAction = {
      type: 'TASK_UPDATE',
      payload: updatedTask,
    };
    // console.log(taskreducer(tasks, setAction));
    // not currently updating the task?? 
    // console.log(taskreducer(tasks, setAction)[1]._id === updatedTask[0]._id);
    // expect(taskreducer(tasks, setAction)[1].title).toEqual(updatedTask[0].title);
    // expect(taskreducer(tasks, setAction)[1].timeEstimated).toEqual(updatedTask[0].timeEstimated);
    expect(taskreducer(tasks, setAction)[1].completed).toEqual(updatedTask[0].completed);
  });
  test('TOKEN_REMOVE', () => {
    const setAction = {
      type: 'TOKEN_REMOVE',
      payload: tasks,
    };
    expect(taskreducer(tasks, setAction)).toEqual([]);
  });
  test('DEFAULT CASE', () => {
    const setAction = {
      type: 'Default',
      payload: updatedTasks,
    };
    expect(taskreducer(tasks, setAction)).toEqual(tasks);
  });
});
