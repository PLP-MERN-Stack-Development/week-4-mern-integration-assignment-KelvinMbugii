import { usePostsContext } from '../contexts/PostsContext';
import { postService } from '../services/api';

export default function useCreatePost() {
  const { dispatch } = usePostsContext();

  const createPost = async (postData) => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await postService.createPost(postData);
      dispatch({ type: 'ADD_POST', payload: data }); 
      return { success: true, post: data.post };
    } catch (error) {
      dispatch({ type: 'ERROR', error: error.message });
      return { success: false, error: error.message };
    }
  };

  return { createPost };
}
