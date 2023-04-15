import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../store/actions";

interface Props {
  handleOpenModal: () => void;
}

function SearchInput(props: Props) {

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  
  function handleInputChange(event: any) {
    setInputValue(event.target.value);
  }

  function handleSubmit() {
    if(!inputValue) return;
    dispatch(searchPokemon(inputValue));
    props.handleOpenModal(); 
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
       <input className="bg-transparent border-2 border-primary rounded-md py-2 px-2
          focus:outline-none focus:border-accent"
          type="text" placeholder="Search..." onChange={handleInputChange} 
          onSubmit={handleSubmit} onKeyPress={handleKeyPress} />
  )
}

export default SearchInput