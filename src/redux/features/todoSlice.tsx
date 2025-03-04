import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todo: [],
};

const todosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {},
});
export default todosSlice.reducer;
