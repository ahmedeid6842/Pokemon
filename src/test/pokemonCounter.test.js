// eslint-disable-next-line import/no-extraneous-dependencies
import { jest } from '@jest/globals';
import { pokemonCounter } from '../modules/renderPokemons';

describe('pokemonCounter', () => {
  let mockSampHeaderElement;

  beforeEach(() => {
    // Create a mock samp header element and set its initial text content
    mockSampHeaderElement = document.createElement('samp');
    mockSampHeaderElement.textContent = '0';
    // Replace the real samp header element with the mock element
    document.querySelector = jest.fn(() => mockSampHeaderElement);
  });

  afterEach(() => {
    // Restore the original implementation of document.querySelector()
    jest.restoreAllMocks();
  });

  test('should update the text content of the samp header element with the number of pokemons', () => {
    // Arrange
    const pokemons = [
      { name: 'Bulbasaur' },
      { name: 'Charmander' },
      { name: 'Squirtle' },
    ];

    // Act
    pokemonCounter(pokemons);

    // Assert
    expect(mockSampHeaderElement.textContent).toBe('3');
  });

  test('should set the text content of the samp header element to "0" if the list of pokemons is empty', () => {
    // Arrange
    const pokemons = [];

    // Act
    pokemonCounter(pokemons);

    // Assert
    expect(mockSampHeaderElement.textContent).toBe('0');
  });
});
