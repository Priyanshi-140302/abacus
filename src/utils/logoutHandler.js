// utils/logoutHandler.js
export const handleSessionLogout = async (response) => {
  try {
    const cloned = response.clone();
    const data = await cloned.json();

    if (response.status === 401 && data?.message === 'Logged in elsewhere') {
      sessionStorage.clear();
      window.location.href = '/';
    }
  } catch (err) {
    // Safe fallback
    console.warn('Error checking session logout condition', err);
  }

  return response;
};
