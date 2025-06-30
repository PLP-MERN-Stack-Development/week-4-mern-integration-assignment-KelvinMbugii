import { createContext, useReducer, useContext } from 'react';

const CategoriesContext = createContext();

const initialState = { categories: [], loading: false, error: null };

function categoriesReducer (state, action){
    switch (action.type) {
        case 'SET_CATEGORIES':
          return { ...state, categories: action.payload, loading: false, error: null };
    
        case 'SET_LOADING':
          return { ...state, loading: true, error: null };
    
        case 'SET_ERROR':
          return { ...state, loading: false, error: action.payload };
    
        default:
          return state;
      }
}

export function CategoriesProvider ({ children }){
    const [state, dispatch] = useReducer(categoriesReducer, initialState);
    return (
        <CategoriesContext.Provider value = {{state, dispatch}}>
            {children}
        </CategoriesContext.Provider>
    );
}

export const useCategoriesContext = () => useContext(CategoriesContext);