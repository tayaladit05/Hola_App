import { useState, useEffect } from 'react';
import { postService } from '../services/postService';
import { toast } from 'react-toastify';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import Navbar from '../components/Navbar';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const data = await postService.getFeed();
      setPosts(data.posts || []);
    } catch (error) {
      toast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost.post, ...posts]);
    setShowCreatePost(false);
    toast.success('Post created successfully!');
  };

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCreatePost={() => setShowCreatePost(true)} />
      
      <div className="max-w-2xl mx-auto pt-20 pb-10 px-4">
        {/* Create Post Modal */}
        {showCreatePost && (
          <CreatePost
            onClose={() => setShowCreatePost(false)}
            onPostCreated={handlePostCreated}
          />
        )}

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No posts yet</p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="bg-instagram-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
            >
              Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onDelete={handlePostDeleted}
                onUpdate={fetchFeed}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
