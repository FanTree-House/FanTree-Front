// src/context/AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

/*const initialState = {
    user: null,
    userRole: null,
};*/

const initialState = {
    user: JSON.parse(localStorage.getItem('user'))?.user || null,
    userRole: JSON.parse(localStorage.getItem('user'))?.userRole || null,
};

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                userRole: action.payload.userRole,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                userRole: null,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

export function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuthState는 AuthProvider 내에서 사용해야 합니다.');
    }
    return context;
}

export function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error('useAuthDispatch는 AuthProvider 내에서 사용해야 합니다.');
    }
    return context;
}