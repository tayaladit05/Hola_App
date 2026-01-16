import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/postService';
import { FaHeart, FaRegHeart, FaTrash, FaRegComment } from 'react-icons/fa';
import { toast } from 'react-toastify';

const PostCard = ({ post, onDelete, onUpdate }) => {
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.likes?.includes(user?.id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [deleting, setDeleting] = useState(false);

  const handleLike = async () => {
    try {
      const response = await postService.likePost(post._id);
      setLiked(!liked);
      setLikesCount(response.likesCount);
    } catch (error) {
      toast.error('Failed to like post');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeleting(true);
    try {
      await postService.deletePost(post._id);
      onDelete(post._id);
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const isOwnPost = user?.id === post.user?._id;

  return (
    <div className="bg-white border border-gray-300 rounded-sm">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5">
            <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
              {post.user?.profilePicture ? (
                <img
                  src={post.user.profilePicture}
                  alt={post.user.username}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-semibold text-gray-600">
                  {post.user?.username?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <span className="font-semibold text-sm">{post.user?.username}</span>
        </div>

        {isOwnPost && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-500 hover:text-red-700 disabled:opacity-50"
          >
            <FaTrash />
          </button>
        )}
      </div>

      {/* Post Image */}
      <img
        src={post.image}
        alt="Post"
        className="w-full object-cover"
        style={{ maxHeight: '600px' }}
      />

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center space-x-4 mb-2">
          <button onClick={handleLike} className="hover:text-gray-600">
            {liked ? (
              <FaHeart className="text-2xl text-red-500" />
            ) : (
              <FaRegHeart className="text-2xl" />
            )}
          </button>
          <FaRegComment className="text-2xl hover:text-gray-600 cursor-pointer" />
        </div>

        {/* Likes Count */}
        <div className="font-semibold text-sm mb-2">
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </div>

        {/* Caption */}
        {post.caption && (
          <div className="text-sm">
            <span className="font-semibold mr-2">{post.user?.username}</span>
            <span>{post.caption}</span>
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-gray-500 mt-2">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
