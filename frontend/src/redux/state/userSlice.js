import {
    createAsyncThunk,
    createSlice,
    createSelector,
} from '@reduxjs/toolkit';

import { RequestStatus } from '../../helper/common';
import { addDetailsReq, deleteDetailsReq, getDetailsReq, loginReq } from '../service/userService';

const initialState = {
    loginStatus: RequestStatus.NotStarted,
    token: '',
    empaddStatus: RequestStatus.NotStarted,
    empgetStatus: RequestStatus.NotStarted,
    empdeleteStatus: RequestStatus.NotStarted,
    empData: []
};

export const login = createAsyncThunk(
    'user/login',
    async (data) => loginReq(data)
);

export const addDetails = createAsyncThunk(
    'user/adddetails',
    async (data) => addDetailsReq(data)
);

export const getDetails = createAsyncThunk(
    'user/getdetails',
    async (data) => getDetailsReq(data)
);

export const deleteDetails = createAsyncThunk(
    'user/deletedetails',
    async (data) => deleteDetailsReq(data)
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
        .addCase(login.pending, (state) =>
        {
            state.loginStatus = RequestStatus.InProgress;
        })
        .addCase(login.fulfilled, (state, action) =>
        {
            const { Token } = action.payload;
            localStorage.setItem('token', Token)
            state.loginStatus = RequestStatus.Success;
            state.token = Token;
        })
        .addCase(login.rejected, (state) =>
        {
            state.loginStatus = RequestStatus.Failure;
        })
        .addCase(addDetails.pending, (state) =>
        {
            state.empaddStatus = RequestStatus.InProgress;
        })
        .addCase(addDetails.fulfilled, (state, action) =>
        {
            state.empaddStatus = RequestStatus.Success;
        })
        .addCase(addDetails.rejected, (state) =>
        {
            state.empaddStatus = RequestStatus.Failure;
        })
        .addCase(getDetails.pending, (state) =>
        {
            state.empgetStatus = RequestStatus.InProgress;
        })
        .addCase(getDetails.fulfilled, (state, action) =>
        {
            state.empgetStatus = RequestStatus.Success;
            state.empData = action.payload;
        })
        .addCase(getDetails.rejected, (state) =>
        {
            state.empgetStatus = RequestStatus.Failure;
        })
        .addCase(deleteDetails.pending, (state) =>
        {
            state.empdeleteStatus = RequestStatus.InProgress;
        })
        .addCase(deleteDetails.fulfilled, (state, action) =>
        {
            state.empdeleteStatus = RequestStatus.Success;
        })
        .addCase(deleteDetails.rejected, (state) =>
        {
            state.empdeleteStatus = RequestStatus.Failure;
        })
    },
});

function selectState(state)
{
    return state.user;
}

export const selectLoginStatus = createSelector(
    selectState,
    state => state.loginStatus
);

export const selectUserToken = createSelector(
    selectState,
    state => state.token
);

export const selectEmpaddStatus = createSelector(
    selectState,
    state => state.empaddStatus
);

export const selectEmpgetStatus = createSelector(
    selectState,
    state => state.empgetStatus
);

export const selectEmpdeleteStatus = createSelector(
    selectState,
    state => state.empdeleteStatus
);

export const selectEmpDetails = createSelector(
    selectState,
    state => state.empData
);

export default userSlice.reducer;
