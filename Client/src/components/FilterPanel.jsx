import { useEffect, useState } from "react";
//import PropTypes from "prop-types";

const FilterPanel = ({ update }) => {
  const filterOptions = [
    "Schools",
    "Kindergartens",
    "SocialWork",
    "Youthservice",
    "All",
  ];

  const colorMapping = {
    Schools: "bg-blue-500",
    Kindergartens: "bg-green-500",
    SocialWork: "bg-red-600",
    Youthservice: "bg-yellow-200",
    All: "bg-purple-500",
  };
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Handle filter selection
  const handleFilterChange = (filter) => {
    setSelectedFilters((prevSelectedFilters) => {
      let newSelectedFilters;

      if (filter === "All") {
        // If "All" is selected and it's already selected, deselect all
        if (prevSelectedFilters.includes("All")) {
          newSelectedFilters = [];
        } else {
          // Otherwise, select all filters
          newSelectedFilters = [
            "Schools",
            "Kindergartens",
            "SocialWork",
            "Youthservice",
            "All",
          ];
        }
      } else {
        if (prevSelectedFilters.includes(filter)) {
          // If the filter is already selected, deselect it
          newSelectedFilters = prevSelectedFilters.filter(
            (item) => item !== filter
          );
        } else {
          // Add the new filter to the list
          newSelectedFilters = [...prevSelectedFilters, filter];
        }
        // If "All" was selected and now a specific filter is deselected, remove "All"
        if (newSelectedFilters.includes("All")) {
          newSelectedFilters = newSelectedFilters.filter(
            (item) => item !== "All"
          );
        }
        // If all specific filters are selected, add "All"
        if (newSelectedFilters.length === filterOptions.length - 1) {
          newSelectedFilters.push("All");
        }
      }
      // Log the new selected filters
      console.log("Selected Filters:", newSelectedFilters);

      //update(newSelectedFilters);

      return newSelectedFilters;
    });

    // const updated = [...filter, selectedFilters]
    // setSelectedFilters(updated);

    // const updatedFilters = selectedFilters.includes(filter)
    //  selectedFilters.filter((f) => f !== filter)
    //   : [...selectedFilters, filter];
    // console.log("updated",updatedFilters);
    // setSelectedFilters(updatedFilters);
    // console.log("easir",selectedFilters);
    //onFilterChange(updatedFilters);
  };

  useEffect(() => {
    // When selectedFilters state changes, call the update function
    update(selectedFilters);
  }, [selectedFilters, update]);

  return (
    <div className="p-2 flex flex-grow-0 space-x-4 bg-white shadow-md mx-auto  ">
      <h2 className="text-base  justify-center font-bold m-2">
        Filter by Category
      </h2>
      <div className="flex flex-wrap  ">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`m-0.5 p-0.5 border rounded ${
              selectedFilters.includes(filter)
                ? colorMapping[filter]
                : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* {selectedFilters} */}
    </div>
  );
};

export default FilterPanel;
