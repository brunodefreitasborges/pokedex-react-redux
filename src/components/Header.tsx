
function Header() {
    return (
        <div data-testid="header" className="h-16 bg-primary flex justify-center items-center gap-2">
            <img src="/assets/pokeball.png" alt="pokeball image" />
            <h1 className="sm:text-xl">PokeDex v.2.1</h1>
            <img src="/assets/pokeball.png" alt="pokeball image" />
        </div>
    )
}

export default Header