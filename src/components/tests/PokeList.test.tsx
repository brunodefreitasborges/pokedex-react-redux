import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore, { MockStore } from 'redux-mock-store';
import PokeList from '../PokeList';


const mockStore = configureMockStore([thunk]);

describe('PokeList Component', () => {
  let store: MockStore;

  beforeEach(() => {
    store = mockStore({
      selectedPokemon: null,
      filteredPokemonList: [],
      pokemonList: [
          {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/25/'
          },
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/'
          }
        ],
        next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
        previous: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
      });
    render(
      <Provider store={store}>
        <PokeList/>
      </Provider>
    );
  });

  afterEach(() => {
    store.clearActions();
  });

  it("should dispatch fetchPokemonList action on mount", async () => {

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'SET_LOADING_LIST' }),
          expect.objectContaining({ type: 'SET_POKEMON_LIST' }),
          expect.objectContaining({ type: 'SET_LOADING_LIST' })
        ])
      );
    });
  });

  it('renders a list of Pokemon names', () => {
    const pokemonNames = screen.getAllByRole('listitem').map((el) => el.textContent);
    expect(pokemonNames).toEqual(['PIKACHU', 'BULBASAUR']);
  });

  it("should dispatch fetchPokemon when a list item is clicked", async () => {

    const pokemonName = screen.getByTestId('pokemon-pikachu');
    fireEvent.click(pokemonName);
   
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'SELECT_POKEMON' }),
        ])
      );
    });
  });
});
