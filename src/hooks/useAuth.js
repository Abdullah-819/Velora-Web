import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, register, logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

/**
 * useAuth Hook
 * Centralizes authentication logic and state.
 * 
 * @returns {Object} - Auth state and methods.
 */
function useAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    const result = await dispatch(login(credentials));
    if (login.fulfilled.match(result)) {
      navigate(credentials.role === 'admin' ? '/admin-dashboard' : '/messenger');
    }
    return result;
  };

  const handleRegister = async (data) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      navigate('/messenger');
    }
    return result;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return {
    user,
    status,
    error,
    isLoading: status === 'loading',
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}

export default useAuth;
