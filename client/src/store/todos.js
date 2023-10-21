import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetches alltasks in db
export const fetchTodos = createAsyncThunk(
  `${URL}/todos/fetchTodos`,
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/todos');
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

// Adds a task to db
export const addTask = createAsyncThunk(
  `${URL}/todos/addTask`,
  async (newTask, thunkAPI) => {
    try {
      const response = await fetch('/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTask }), // Send the newTask object in the request body
      });

      const data = await response.json();
      return data; // Return the newly inserted task details
    } catch (err) {
      throw err;
    }
  }
);

// Deletes a task in db
export const deleteTask = createAsyncThunk(
  'todos/deleteTask',
  async (taskIdToDelete, thunkAPI) => {
    try {
      const response = await fetch('/deleteTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskIdToDelete }), // Send the newTask object in the request body
      });

      const data = await response.json();
      return data; // Return the newly inserted task details
    } catch (err) {
      throw err;
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers:(builder) =>{
    builder
    .addCase(fetchTodos.pending,(state)=>{
      console.log("HERE");
      console.log('pending');
    })
    .addCase(fetchTodos.fulfilled,(state,action)=>{
      console.log('fulfilled');
      state.tasks.push(...action.payload);
    })
    .addCase(fetchTodos.rejected,(state)=>{
      console.log('rejected');
    })
    // Add a new case for addTask
    .addCase(addTask.fulfilled, (state, action) => {
      console.log('Task added:', action.payload);
    })
    .addCase(deleteTask.fulfilled, (state, action) => {
      console.log('Task deleted:', action.payload);
      console.log(action.payload);
    })
  }
});


//export const { } = todosSlice.actions;
export default todosSlice.reducer;
