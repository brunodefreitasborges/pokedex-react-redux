import Header from "./components/Header"
import Pokelist from "./components/PokeList"

function App() {
  return (
    <>
      <Header/>
      <div className="h-[calc(100vh_-_64px)] bg-background flex justify-start items-center
      custom-border px-3 md:px-8 pt-4 pb-8">
         <Pokelist/>
      </div>    
    </>
  )
}

export default App
