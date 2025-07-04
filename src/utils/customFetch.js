import { handleSessionLogout } from './logoutHandler';

const customFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  await handleSessionLogout(response); // Check for logout condition
  return response;
};

export default customFetch;
