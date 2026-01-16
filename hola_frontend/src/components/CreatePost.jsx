import { useState } from 'react';
import { postService } from '../services/postService';
import { toast } from 'react-toastify';
import { FaTimes, FaImage } from 'react-icons/fa';

const CreatePost = ({ onClose, onPostCreated }) => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [useUrl, setUseUrl] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageUrl && !imageFile) {
      toast.error('Please provide an image');
      return;
    }

    setLoading(true);

    try {
      let postData;

      if (useUrl) {
        // Use image URL method
        postData = {
          caption,
          imageUrl,
        };
      } else {
        // Use base64 method
        postData = {
          caption,
          imageUrl: imagePreview, // Send base64 string
        };
      }

      const response = await postService.createPost(postData);
      onPostCreated(response);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Image Upload Method Toggle */}
          <div className="flex items-center space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setUseUrl(true)}
              className={`px-4 py-2 rounded-lg ${
                useUrl
                  ? 'bg-instagram-blue text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Image URL
            </button>
            <button
              type="button"
              onClick={() => setUseUrl(false)}
              className={`px-4 py-2 rounded-lg ${
                !useUrl
                  ? 'bg-instagram-blue text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Upload File
            </button>
          </div>

          {/* Image Input */}
          {useUrl ? (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-instagram-blue"
                required={useUrl}
              />
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="mt-2 max-h-60 rounded-lg"
                  onError={() => toast.error('Invalid image URL')}
                />
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold mb-2">
                Upload Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-instagram-blue cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                  required={!useUrl}
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-60 mx-auto rounded-lg"
                    />
                  ) : (
                    <div>
                      <FaImage className="text-6xl text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Click to upload image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Caption (Optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              rows={4}
              maxLength={2200}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-instagram-blue resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              {caption.length}/2200 characters
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-instagram-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Post...' : 'Share Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
