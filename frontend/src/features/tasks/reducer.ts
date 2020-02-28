import { createSlice, PayloadAction } from 'redux-starter-kit';
import { Task, ReminderSetting } from './interface';

export type TaskApiErrorAction = {
  error: string;
};

export type UpdateTasks = {
    projectId: number
};

export type CreateTask = {
    projectId: number;
    name: string;
    dueDate: string;
    dueTime: string;
    reminderSetting: ReminderSetting;
}

export type GetTask = {
    taskId: number;
}

export type TasksAction = {
  tasks: Array<Task>;
};

export type PutTask = {
  projectId: number,
  tasks: Task[]
}

export type DeleteTask = {
  taskId: number
}

let initialState = {
  tasks: [] as Array<Task>
};

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    tasksReceived: (
      state,
      action: PayloadAction<TasksAction>
    ) => {
      const { tasks } = action.payload;
      state.tasks = tasks;
    },
    taskApiErrorReceived: (
      state,
      action: PayloadAction<TaskApiErrorAction>
    ) => state,
    TasksUpdate: (state, action: PayloadAction<UpdateTasks>) =>state,
    TasksCreate: (state, action: PayloadAction<CreateTask>) => state,
    TaskPut: (state, action: PayloadAction<PutTask>) => state,
    TaskGet: (state, action: PayloadAction<GetTask>) => state,
    TaskDelete: (state, action: PayloadAction<DeleteTask>) => state
    }
});

export const reducer = slice.reducer;
export const actions = slice.actions;