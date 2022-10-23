import { useState } from "react";
import { createContext } from "react";
import { useNotification } from "../hooks";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchProvider = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const { updateNotification } = useNotification();

  const search = async (method, query, updateFun) => {
    const { error, results } = await method(query);
    if (error) return updateNotification("error", error);

    if (!results.length) {
      setResults([]);
      updateFun && updateFun([]);
      return setResultNotFound(true);
    }

    setResultNotFound(false);
    setResults(results);
    updateFun && updateFun([...results]);
  };

  const debounceFrunc = debounce(search, 300);

  const handleSearch = (method, query, updateFun) => {
    setSearching(true);
    if (!query.trim()) {
      updateFun && updateFun([]);
      return resetSearch();
    }

    debounceFrunc(method, query, updateFun);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, resetSearch, searching, results, resultNotFound }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
