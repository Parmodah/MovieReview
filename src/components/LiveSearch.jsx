import { forwardRef, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { commonInputClasses } from "../utils/theme";

const LiveSearch = ({
  value = "",
  placeholder = "",
  results = [],
  name,
  selectedResultStyle,
  resultContainerStyle,
  inputStyle,
  renderItem = null,
  onChange = null,
  onSelect = null,
}) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [defaultValue, setDefaultValue] = useState("");

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };
  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };
  const handleOnBlur = () => {
    closeSearch();
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    // move selection up and down
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }
    if (key === "Escape") return closeSearch();
    if (key === "Enter") return handleSelection(results[focusedIndex]);

    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + " border-2 rounded p-1 text-lg ";
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (results.length) return setDisplaySearch(true);
    setDisplaySearch(false);
  }, [results.length]);

  useEffect(() => {
    setDefaultValue(value);
  }, [value]);

  return (
    <div
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onBlur={handleOnBlur}
      className="relative"
    >
      <input
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={defaultValue}
        onChange={handleChange}
      />
      <SearchResults
        focusedIndex={focusedIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        renderItem={renderItem}
        selectedResultStyle={selectedResultStyle}
        resultContainerStyle={resultContainerStyle}
      />
    </div>
  );
};

const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  selectedResultStyle,
  resultContainerStyle,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible) return null;
  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 mt-1 overflow-auto custom-scroll-bar space-y-2">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };

        return (
          <ResultCard
            ref={index === focusedIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onMouseDown,
  } = props;
  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    );
  };

  return (
    <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});

export default LiveSearch;
