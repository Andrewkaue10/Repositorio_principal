import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const [pokemon, setPokemon] = useState<any | null>(null);
  const [error, setError] = useState('');

  const fetchPokemon = async () => {
    if (!searchText.trim()) return;

    try {
      setError('');
      setPokemon(null);

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`);

      if (!response.ok) {
        setError('Pokémon não encontrado!');
        return;
      }

      const data = await response.json();
      setPokemon(data);
      Keyboard.dismiss();
    } catch (err) {
      setError('Erro ao buscar Pokémon!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Pokémon</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do Pokémon"
        value={searchText}
        onChangeText={setSearchText}
      />

      <TouchableOpacity style={styles.button} onPress={fetchPokemon}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {pokemon && (
        <View style={styles.card}>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text style={styles.pokeName}>{pokemon.name.toUpperCase()}</Text>
          <Text style={styles.type}>
            Tipo: {pokemon.types.map((t: any) => t.type.name).join(', ')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ff0000',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '75%',
    elevation: 4
  },
  image: {
    width: 120,
    height: 120,
  },
  pokeName: {
    fontSize: 22,
    marginTop: 10,
    fontWeight: 'bold',
  },
  type: {
    fontSize: 18,
    marginTop: 6,
    color: '#555',
  },
  error: {
    marginTop: 12,
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
