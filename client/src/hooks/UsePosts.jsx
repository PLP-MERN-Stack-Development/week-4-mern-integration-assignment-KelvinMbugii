import { useContext } from 'react';
import { postService } from '../services/api';
import { usePostsContext } from '../contexts/PostsContext';

export default function usePosts(){
    const { state, dispatch } = usePostsContext();

    const fetchPosts = async () => {
        dispatch({ type: 'LOADING' });
        try{
            const data = await postService.getAllPosts();
            dispatch({ type: 'SET_POSTS', posts: data.posts });
        }catch(error){
            dispatch({ type: 'ERROR', error: error.message });
        }
    };


return{ ...state, fetchPosts};

}