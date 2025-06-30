import { createContext, useReducer, useContext } from 'react';

const initialState = { posts: [], loading: false, error: null };

const PostsContext = createContext({
  state: initialState,
  dispatch: () => {},
});


function postsReducer (state, action){
    switch (action.type) {
        case 'SET_POSTS':
          return { ...state, posts: action.payload, loading: false, error: null };
    
        case 'SET_LOADING':
          return { ...state, loading: true, error: null };
    
        case 'SET_ERROR':
          return { ...state, loading: false, error: action.payload };
    
        case 'ADD_POST':
          return { ...state, posts: [action.payload, ...state.posts] };
    
        case 'DELETE_POST':
          return {
            ...state,
            posts: state.posts.filter((post) => post._id !== action.payload),
    };
    default:
        return state;
  }

}

export function PostsProvider ({ children }){
    const [state, dispatch] = useReducer(postsReducer, initialState);
    return (
        <PostsContext.Provider value = {{state, dispatch}}>
            {children}
        </PostsContext.Provider>
    );
}

export const usePostsContext = () => useContext(PostsContext);