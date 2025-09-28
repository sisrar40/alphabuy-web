import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path, params) => {
    if (params && typeof params === "object") {
      const queryString = new URLSearchParams(params).toString();
      navigate(`${path}?${queryString}`);
    } else {
      navigate(path);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    navigateTo,
    goBack,
  };
};
