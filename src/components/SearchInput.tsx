import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonList } from "../store/actions";
import { State } from "../store/reducers";

interface SearchInputProps {
  onChange: (event: any) => void;
}

function SearchInput(props: SearchInputProps) {
  const dispatch = useDispatch();

  const { pokemonList } = useSelector((state: State) => state);

  const [inputValue, setInputValue] = useState("");

  function handleInputChange(event: any) {
    event.persist();
    setInputValue(event.target.value.toUpperCase());
    props.onChange(event.target.value.toUpperCase());
    dispatch(filterPokemonList(pokemonList!, event.target.value.toUpperCase()));
  }

  return (
    <input
      className="lg:max-w-[350px] bg-transparent border-2 border-primary rounded-md py-2 pl-2 sm:pl-8
          focus:outline-none focus:border-accent"
      value={inputValue}
      type="text"
      placeholder="SEARCH..."
      onChange={handleInputChange}
    />
  );
}

export default SearchInput;
