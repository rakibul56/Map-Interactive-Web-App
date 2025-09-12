import SearchBar from "../components/Search";
import FilterOptions from "../components/FilterPanel";
import Map from "../components/Map";
import { useState } from "react";

const MapPage = () => {

  const [set, update] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);


  // const handleFilterChange = (newSelectedFilters) => {
  //    setSelectedFilters(newSelectedFilters);
  //    console.log("Filters in parent component:", newSelectedFilters);
  // }

  // const [searchQuery, setSearchQuery] = useState("");
  // const [filter, setFilter] = useState("");
  // console.log("mappage filter:",filter);

  console.log(set,"set:::::::::")

  return (
    <div className="w-full flex flex-col">
      <div className="p-2 bg-blue-500 text-black flex justify-between items-center">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery }/>
      </div>
      <div>
        <FilterOptions update={update} />
      </div>
      <div className="flex-grow md:w-auto md:h-auto">
        <Map category={set} />
      </div>
    </div>
  );
};



export default MapPage;
