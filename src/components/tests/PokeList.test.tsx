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
      pokemonPage: {
        results: [
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
      },
      page: 1
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
          expect.objectContaining({ type: 'SET_PAGE' }),
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

  it('dispatches the fetchPokemonList action with a TRUE payload when the "Next" button is clicked', async () => {

    const nextButton = screen.getByTestId('next-button');
    fireEvent.click(nextButton);
   
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'SET_PAGE', payload: true }),
        ])
      );
    });
  });

  it('should have a disabled previous button if the page is equal to 1', () => {

    const previousButton = screen.getByTestId('previous-button');
    expect(previousButton).toHaveClass('text-gray-500');
   
  });

  it('should have an enabled previous button if the page number is more than 1', async () => {
    await waitFor(() => {
      store.getState().page = 2;
    });

    render(
      <Provider store={store}>
        <PokeList/>
      </Provider>
    );
  
    const previousButton = await screen.getAllByTestId('previous-button')[1];
    expect(previousButton).not.toHaveClass('text-gray-500');
   
  });

  it('should have a disabled next button if the page is equal to 11', async () => {

    await waitFor(() => {
      store.getState().page = 11;
    });

    render(
      <Provider store={store}>
        <PokeList/>
      </Provider>
    );
  
    const previousButton = await screen.getAllByTestId('next-button')[1];
    expect(previousButton).toHaveClass('text-gray-500');
   
  });

  it('dispatches the fetchPokemonList action with a FALSE payload when the "Previous" button is clicked', async () => {

    await waitFor(() => {
      store.getState().page = 2;
    });

    await waitFor(() => {
      render(
        <Provider store={store}>
          <PokeList/>
        </Provider>
      );
    });

    const previousButton = await screen.getAllByTestId('previous-button')[1];
    fireEvent.click(previousButton);
    
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'SET_PAGE', payload: false }),
        ])
      );
    });
  });

});
