import { useContext } from "react";
import { AppContext } from "../pages/_app";
export const useLanguage = ({ es, en }) => {
  const { language } = useContext(AppContext);
  const text = language === "es" ? es : en;
  return {
    text,
    language,
  };
};
