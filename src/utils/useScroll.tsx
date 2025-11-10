import { useNavigate, useLocation } from "react-router-dom";


export function useScrollToId() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string, route: string) => {
    if (location.pathname !== route) {
      navigate(route, { state: { scrollToId: id } });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "instant" });
    }
  };

  return scrollTo;
}

