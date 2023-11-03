import { useState, useEffect } from "react";
import classes from "./App.module.css";

function App() {
  const [list, setList] = useState<IItem[]>([
    { key: 1, value: "Lorem ipsum dolor sit amet." },
    { key: 2, value: "Consectetur adipiscing elit. Nulla convallis." },
    { key: 3, value: "Pellentesque pharetra, dolor odio sagittis." },
    { key: 4, value: "Nunc sit amet dolor vitae." },
    { key: 5, value: "Vestibulum sit amet vehicula justo." },
    { key: 6, value: "Pellentesque ac pharetra lectus." },
    { key: 7, value: "Cras tristique ante a neque." },
    { key: 8, value: "Vivamus eu arcu in enim." },
    { key: 9, value: "Aenean varius mi eu mi." },
    { key: 10, value: "Morbi ac enim vel ipsum." },
    { key: 11, value: "Sed vel felis non augue." },
    { key: 12, value: "Praesent convallis, purus a bibendum." },
    { key: 13, value: "Duis auctor metus id eros." },
    { key: 14, value: "Quisque ac quam non ex." },
    { key: 15, value: "Vivamus eget ligula non risus." },
    { key: 16, value: "Nullam dapibus, ex a eleifend." },
    { key: 17, value: "Fusce auctor bibendum sapien, id." },
    { key: 18, value: "Suspendisse et lacus in est." },
    { key: 19, value: "Sed id erat sit amet." },
    { key: 20, value: "In eget elit eu tortor." },
  ]);

  const [savedSearches, setSavedSearches] = useState<ISavedSearches[]>(() => {
    const storedCheckboxes = JSON.parse(
      localStorage.getItem("savedsearches") || "null"
    );
    return storedCheckboxes || [];
  });

  const [searchInput, setSearchInput] = useState("");

  const itemsToShown = (text: string) => {
    const filteredBySavedSearches = list.filter((item: IItem) => {
      for (const search of savedSearches) {
        if (search.value && !item.value.includes(search.key)) {
          return false;
        }
      }
      return true;
    });
    const items = filteredBySavedSearches.filter((item: IItem) => {
      return item.value.includes(text);
    });
    return items.map((item: IItem) => {
      return (
        <div>
          {item.key}: {item.value}
        </div>
      );
    });
  };

  const addClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    for (const search of savedSearches) {
      if (searchInput === search.key) return;
    }
    setSavedSearches([...savedSearches, { key: searchInput, value: false }]);
    setSearchInput("");
  };

  const handleCheckboxChange = (savedSearcheName: string) => {
    setSavedSearches((prevState) =>
      prevState.map((checkbox) => {
        if (checkbox.key === savedSearcheName) {
          return { ...checkbox, value: !checkbox.value };
        }
        return checkbox;
      })
    );
  };

  const deleteSearchesHandler = () => {
    localStorage.clear();
    setSavedSearches([]);
  };

  useEffect(() => {
    localStorage.setItem("savedsearches", JSON.stringify(savedSearches));
  }, [savedSearches]);

  return (
    <div className={classes.App}>
      <input
        type="text"
        onChange={(event) => setSearchInput(event?.target.value)}
        value={searchInput}
      />
      <button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          addClickHandler(event)
        }
      >
        ADD
      </button>
      <br />
      {savedSearches.map((search: ISavedSearches) => {
        return (
          <label key={search.key}>
            <input
              type="checkbox"
              checked={search.value}
              onChange={() => handleCheckboxChange(search.key)}
            />
            {search.key}
          </label>
        );
      })}
      {savedSearches.length !== 0 ? (
        <button onClick={deleteSearchesHandler}>
          Delete All Saved Searches
        </button>
      ) : null}

      {itemsToShown(searchInput)}
    </div>
  );
}

interface IItem {
  key: number;
  value: string;
}

interface ISavedSearches {
  key: string;
  value: boolean;
}

export default App;
