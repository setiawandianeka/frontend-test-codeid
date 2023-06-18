import { createAsyncThunk, current, createSlice} from "@reduxjs/toolkit";
import { apiClient } from "@/api"
import qs from 'qs';

export const getListContact = createAsyncThunk('contact/getListContact', async (payload, thunkAPI) => {
  try {
    const { data, status } = await apiClient({
      method: 'get',
      url: 'contact'
    })
    if (data) {
      return data
    } else {
      return {errMsg: "Failed with states:  "+status}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({errMsg: error.message})
  }
})

export const getDetailContact = createAsyncThunk('contact/getDetailContact', async ({ id }, thunkAPI) => {
  try {
    const { data, status } = await apiClient({
      method: 'get',
      url: `contact/${id}`
    })
    if (data) {
      return data
    } else {
      return {errMsg: "Failed with states:  "+status}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({errMsg: error.message})
  }
})

export const addNewContact = createAsyncThunk('contact/addNewContact', async (payload, thunkAPI) => {
  try {
    const { status } = await apiClient({
      method: 'post',
      url: 'contact',
      data: qs.stringify(payload)
    })
    if (status === 201) {
      return true
    } else {
      return {errMsg: "Failed with states:  "+status}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({errMsg: error.message})
  }
})

export const editContact = createAsyncThunk('contact/editContact', async ({ id, payload}, thunkAPI) => {
  try {
    const { status } = await apiClient({
      method: 'put',
      url: `contact/${id}`,
      data: payload
    })
    if (status === 201) {
      return true
    } else {
      return {errMsg: "Failed with states:  "+status}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({errMsg: error.message})
  }
})

export const deleteContactById = createAsyncThunk('contact/deleteContactById', async ({ id }, thunkAPI) => {
  try {
    const { status } = await apiClient({
      method: 'delete',
      url: `contact/${id}`
    })
    if (status === 201) {
      return true
    } else {
      return {errMsg: "Failed with states:  "+status}
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({errMsg: error.message})
  }
})

const initState = {
  isLoading: false,
  listContact: [],
  errMsg: null
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState: initState,
  reducers: {
    getListData: getListContact,
    setLoading(state, action) {
      state.isLoading = action.payload
    },
  },
  extraReducers: {
    [getListContact.pending]: (state, action) => {
      state.isLoading = true
    },
    [getListContact.fulfilled]: (state, action) => {
      state.isLoading = false
      state.listContact = action.payload.data ?? []
    },
    [getListContact.rejected]: (state, action) => {
      state.isLoading = false
      state = Object.assign(Object.assign({}, initState), {errMsg: action.payload.errMsg});
      state.errMsg = "ERROR: " + action.payload.errMsg
    },
    [getDetailContact.pending]: (state, action) => {
      state.isLoading = true
    },
    [getDetailContact.fulfilled]: (state, action) => {
      state.isLoading = false
    },
    [getDetailContact.rejected]: (state, action) => {
      state.isLoading = false
      state = Object.assign(Object.assign({}, initState), {errMsg: action.payload.errMsg});
      state.errMsg = "ERROR: " + action.payload.errMsg
    },
    [addNewContact.pending]: (state, action) => {
      state.isLoading = true
    },
    [addNewContact.fulfilled]: (state, action) => {
      state.isLoading = false
    },
    [addNewContact.rejected]: (state, action) => {
      state.isLoading = false
      state = Object.assign(Object.assign({}, initState), {errMsg: action.payload.errMsg});
      state.errMsg = "ERROR: " + action.payload.errMsg
    },
    [editContact.pending]: (state, action) => {
      state.isLoading = true
    },
    [editContact.fulfilled]: (state, action) => {
      state.isLoading = false
    },
    [editContact.rejected]: (state, action) => {
      state.isLoading = false
      state = Object.assign(Object.assign({}, initState), {errMsg: action.payload.errMsg});
      state.errMsg = "ERROR: " + action.payload.errMsg
    },
    [deleteContactById.pending]: (state, action) => {
      state.isLoading = true
    },
    [deleteContactById.fulfilled]: (state, action) => {
      state.isLoading = false
    },
    [deleteContactById.rejected]: (state, action) => {
      state.isLoading = false
      state = Object.assign(Object.assign({}, initState), {errMsg: action.payload.errMsg});
      state.errMsg = "ERROR: " + action.payload.errMsg
    },
  }
})

export const { setLoading } = contactSlice.actions
