import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: {
        email:'',
        token:'',
        firstName: '',
        lastName: '',
        userName: ''
    },
    status: 'idle',
    error: '',
}

export const userLogIn = createAsyncThunk(
    'user/logIn',
    async ({ email, password }, thunkApi) => {
        try{
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ email, password })
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Informations incorrectes !")
                }             
            }).then(data => {
                return data
            })
            const user = await getUserInfos(response.body.token)
            return { email: email, data: user.body, token: response.body.token }            
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const editUserName = createAsyncThunk(
    'user/editUserName',
    async ({ userName, token }, thunkApi) => {
        try{
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: 'PUT',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ userName })
            }).then(res => {
                if (res.ok) {
                    console.log(userName)
                    return res.json()
                }         
            })
            return response
        }catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

async function getUserInfos(token) {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(res => {
            if (res.ok) {
                return res.json()
            }            
        })
        return response 
}    

const userSlice = createSlice ({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userLogIn.fulfilled, (state, action) => {
            state.user = { email: action.payload.email, token: action.payload.token, firstName: action.payload.data.firstName, lastName: action.payload.data.lastName, userName: action.payload.data.userName }
            state.status = "success"
            state.error = "" 
        })
        .addCase(userLogIn.rejected, (state, action) => {
            state.status = "error"
            state.error = action.payload
        })
        .addCase('LOGOUT', (state) => {
            state.user = { token: '' }
            state.status = 'idle'
            state.error = ''
        })
        .addCase(editUserName.fulfilled, (state, action) => {
            let user = state.user
            user.userName = action.payload.body.userName
            state.user = user
        })
    }
})

export default userSlice.reducer