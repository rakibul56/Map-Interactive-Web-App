
const SearchBar = ({ searchQuery, setSearchQuery }) => {

 

  return (
    <div className="flex flex-row w-full">
      <div>
        <input
          type="text"
          className="p-1 mx-auto rounded w-auto md:w-96"
          placeholder=" Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <button
          //onClick={setFavorite}
          className=" m-1 p-1 bg-red-500 text-white"
        >
          Set Favorite
        </button>
        <button
          //onClick={useCurrentLocation}
          className=" m-1 p-1 bg-red-500 text-white"
        >
          Set Current Location
        </button> */}
      </div>
    </div>
  );
};

export default SearchBar;
