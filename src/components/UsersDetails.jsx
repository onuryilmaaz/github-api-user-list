import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UsersDetails = () => {
  const { login } = useParams(); // URL'den login değerini al
  const [user, setUser] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${login}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null); // Hata durumunda kullanıcıyı null yap
    }
  }, [login]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user === null) return <div className="text-center text-red-500">User not found or error occurred.</div>;

  if (!user) return <div className="text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="w-32 h-32 rounded-full border-4 border-blue-500"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">{user.login}</h1>
          <p className="text-xl text-gray-600 mt-1">{user.name || 'No name provided'}</p>
          <p className="text-md text-gray-500 mt-1">{user.bio || 'No bio available'}</p>
          <p className="text-md text-gray-500 mt-1">
            <span className="font-semibold">Location:</span> {user.location || 'Not specified'}
          </p>
          <p className="text-md text-gray-500 mt-1">
            <span className="font-semibold">Company:</span> {user.company || 'Not provided'}
          </p>
          <p className="text-md text-gray-500 mt-1">
            <span className="font-semibold">Blog:</span> <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{user.blog || 'Not available'}</a>
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700">Public Repos</h2>
            <p className="text-3xl font-bold text-gray-900">{user.public_repos}</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700">Followers</h2>
            <p className="text-3xl font-bold text-gray-900">{user.followers}</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700">Following</h2>
            <p className="text-3xl font-bold text-gray-900">{user.following}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Additional Info</h2>
        <ul className="space-y-2">
          {user.email && (
            <li className="text-md text-gray-600">
              <span className="font-semibold">Email:</span> {user.email}
            </li>
          )}
          {user.twitter_username && (
            <li className="text-md text-gray-600">
              <span className="font-semibold">Twitter:</span> <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@{user.twitter_username}</a>
            </li>
          )}
          {user.public_gists && (
            <li className="text-md text-gray-600">
              <span className="font-semibold">Public Gists:</span> {user.public_gists}
            </li>
          )}
          {user.created_at && (
            <li className="text-md text-gray-600">
              <span className="font-semibold">Joined:</span> {new Date(user.created_at).toLocaleDateString()}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UsersDetails;
