
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link, useLocation } from "react-router-dom";
import CardList from "./components/CardList";
import PokeList from "./components/PokeList";

function App() {

  const [myButtonShadow, setMyButtonShadow] = useState('shadow-black');
  const [buttonColor, setButtonColor] = useState('bg-[#263238]');
  const [listButtonShadow, setListButtonShadow] = useState('shadow-white');
  const [listButtonColor, setListButtonColor] = useState('bg-[#50636d]');
  const [bottomText, setBottomText] = useState('My Pokemons');

  // const location = useLocation();

  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     setBottomText("My Pokemons");
  //   } else if (location.pathname === "/list") {
  //     setBottomText("Pokemon List");
  //   }
  // }, [location]);
  
  function toggleMyButton() {
      setMyButtonShadow('shadow-black');
      setButtonColor('bg-[#263238]');
      setListButtonShadow('shadow-white');
      setListButtonColor('bg-[#50636d]');
      setBottomText('My Pokemons');
  }

  function toggleListButton() {
      setMyButtonShadow('shadow-white');
      setButtonColor('bg-[#50636d]');
      setListButtonShadow('shadow-black');
      setListButtonColor('bg-[#263238]');
      setBottomText('Pokemon List');
  }

  return (
      <BrowserRouter>
        <div className='flex h-screen justify-center items-center bg-[#303030]'>
            <div className='bg-frame relative bg-cover w-[640px] h-[360px] flex flex-col 
                            items-center px-8 py-10'>
              <h3 className='font-visitor text-white'>Pokedex v1.3</h3>
              <div className='w-full h-full scrollbar'>
                <Routes>
                  <Route path="/" element={<CardList/>}/>
                  <Route path="/list" element={<PokeList/>}/>
                </Routes>
              </div>
              <h3 className='font-visitor text-white -mb-4'>{bottomText}</h3>
              <Link to="/" className={`flex justify-center items-center absolute -bottom-6 right-44 w-16 h-16 
              rounded-full border-2 border-[#FA8B00] shadow-inner transition-all
              ease-in-out
              ${myButtonShadow} ${buttonColor}`} onClick={toggleMyButton}>
                <img className="w-3/4" src="https://cdn.icon-icons.com/icons2/896/PNG/512/pokemon_go_play_game_cinema_film_movie_icon-icons.com_69163.png" alt="" />
              </Link>
              <Link to="/list" className={`flex justify-center items-center absolute -bottom-6 left-44 w-16 h-16 
              rounded-full border-2 border-[#FA8B00] shadow-inner transition-all
              ease-in-out
              ${listButtonShadow} ${listButtonColor}`} onClick={toggleListButton}>
                <img className="w-3/4" src="https://cdn.icon-icons.com/icons2/851/PNG/512/Pokedex_tool_icon-icons.com_67529.png" alt="" />
              </Link>
            </div>
           
        </div>
      </BrowserRouter>
  )
}

export default App
