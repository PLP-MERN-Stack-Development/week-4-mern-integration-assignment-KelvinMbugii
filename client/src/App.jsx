import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { PostsProvider } from './contexts/PostsContext';
import { CategoriesProvider } from './contexts/CategoriesContext';

import CategoryManager from  './components/Posts/categories/CategoryManager';


// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import NotFound from './pages/NotFound';

// Hooks
import { useAuthContext } from './contexts/AuthContext';

function PrivateRoute({ children }) {
  const { state } = useAuthContext();
  return state.user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PostsProvider>
          <CategoriesProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register" element={<Register />} />

              <Route path="/categories" element={<CategoryManager />} />

              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/posts/:id" element={<PostDetails />} />

              <Route path="*" element={<NotFound />} />

              <Route
                path="/posts/create"
                element={
                  <PrivateRoute>
                    <CreatePost />
                  </PrivateRoute>
                }
              />

              <Route
                path="/posts/:id/edit"
                element={
                  <PrivateRoute>
                    <EditPost />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </CategoriesProvider>
        </PostsProvider>
      </AuthProvider>
    </Router>
  );
}


