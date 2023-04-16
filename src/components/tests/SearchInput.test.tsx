import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import configureMockStore, { MockStore } from "redux-mock-store";
import SearchInput from "../SearchInput";

const mockStore = configureMockStore([thunk]);

describe("SearchInput", () => {
  let store: MockStore;
  let onChangeMock: jest.Mock<any, any, any>;

  beforeEach(() => {
    store = mockStore({
      pokemonList: [
        { name: "bulbasaur" },
        { name: "charmander" },
        { name: "squirtle" },
      ],
    });
    store.clearActions();
    onChangeMock = jest.fn();
  });

  it("renders the input element", () => {
    render(
      <Provider store={store}>
        <SearchInput onChange={onChangeMock} />
      </Provider>
    );
    expect(screen.getByPlaceholderText("SEARCH...")).toBeInTheDocument();
  });

  it("calls the onChange prop when input changes", () => {
    render(
      <Provider store={store}>
        <SearchInput onChange={onChangeMock} />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText("SEARCH..."), {
      target: { value: "char" },
    });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith("CHAR");
  });

  it("dispatches filterPokemonList action when input changes", async () => {
    render(
      <Provider store={store}>
        <SearchInput onChange={onChangeMock} />
      </Provider>
    );
    fireEvent.change(screen.getByPlaceholderText("SEARCH..."), {
      target: { value: "squ" },
    });
    
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'SET_LOADING_LIST' }),
          expect.objectContaining({ type: 'SET_FILTERED_POKEMON_LIST' }),
          expect.objectContaining({ type: 'SET_LOADING_LIST' })
        ])
      );
    });
  });

});
