import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = { Auth: [], loading: false, error: null };

function authReducer (state, action){
    switch (action.type) {
        case 'LOGIN':
          return { ...state, user: action.payload, loading: false, error: null };
    
        case 'LOGOUT':
          return { ...state, user: null, loading: false, error: null };
    
        case 'SET_LOADING':
          return { ...state, loading: true, error: null };
    
        case 'SET_ERROR':
          return { ...state, loading: false, error: action.payload };
    
        default:
          return state;
      }
}

export function AuthProvider ({ children }){
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value = {{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);