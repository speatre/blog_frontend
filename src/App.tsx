import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import CreatePost from '@/pages/CreatePost';
import PostDetail from '@/pages/PostDetail';
import Navbar from '@/components/Navbar';

function App() {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
