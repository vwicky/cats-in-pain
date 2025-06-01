// src/hooks/useUserPrompts.js
import { useQuery } from '@tanstack/react-query'

const fetchUserPrompts = async (userId, token) => {
  const response = await fetch(`http://localhost:5000/sprompts/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user prompts');
  }

  return await response.json();
};

export const useUserPrompts = (userId) => {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['userPrompts', userId],
    queryFn: () => fetchUserPrompts(userId, token),
    enabled: !!userId && !!token,
  });
};
