import { useState } from 'react';

const usePasswordToggle = (): [boolean, () => void] => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return [showPassword, togglePasswordVisibility];
};

export default usePasswordToggle;
