import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MobilePokeCard from '../MobilePokeCard';

const mockStore = configureStore([]);

describe('MobilePokeCard', () => {
  let store;
  
  beforeEach(() => {
    const initialState = {
      selectedPokemon: {
        name: 'Pikachu',
        types: [{ type: { name: 'electric' } }],
        weight: 60,
        height: 80,
        abilities: [{ ability: { name: 'static' } }],
        stats: [
          { base_stat: 35, stat: { name: 'hp' } },
          { base_stat: 55, stat: { name: 'attack' } },
          { base_stat: 90, stat: { name: 'defense' } },
          { base_stat: 50, stat: { name: 'special-attack' } },
          { base_stat: 40, stat: { name: 'special-defense' } },
          { base_stat: 50, stat: { name: 'speed' } },
        ],
        sprites: { front_default: '/assets/pokeball.png' },
      },
      isLoading: false,
    };
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MobilePokeCard />
      </Provider>
    );
  });

  it('should have a name matching the state object', () => {
    const cardName = screen.getByTestId('card-name');
    expect(cardName.textContent).toBe('Pikachu');
  });

  it('should have a weight matching the state object', () => {
    const cardWeight = screen.getByTestId('card-weight');
    expect(cardWeight.textContent).toBe('60kg');
  });

  it('should have a height matching the state object', () => {
    const cardHeight = screen.getByTestId('card-height');
    expect(cardHeight.textContent).toBe('800cm');
  });

  it('should have a sprite src matching the state object', () => {
    const cardSprite = screen.getByTestId('card-sprite');
    expect(cardSprite).toHaveAttribute('src', '/assets/pokeball.png');
  });

  it('should have types matching the state object', () => {
    const cardTypes = screen.getAllByTestId('card-type');
    expect(cardTypes).toHaveLength(1);
    expect(cardTypes[0].textContent).toBe('ELECTRIC');
  });

  it('should have abilities matching the state object', () => {
    const cardAbilities = screen.getAllByTestId('card-ability');
    expect(cardAbilities).toHaveLength(1);
    expect(cardAbilities[0].textContent).toBe('Static');
  });

  it('should have stats matching the state object', () => {
    const cardStats = screen.getAllByTestId('card-stat');
    expect(cardStats).toHaveLength(6);
    expect(cardStats[0].textContent).toBe('HP:35');
    expect(cardStats[1].textContent).toBe('ATTACK:55');
    expect(cardStats[2].textContent).toBe('DEFENSE:90');
    expect(cardStats[3].textContent).toBe('SPECIAL-ATTACK:50');
    expect(cardStats[4].textContent).toBe('SPECIAL-DEFENSE:40');
    expect(cardStats[5].textContent).toBe('SPEED:50');
  });

  
});
