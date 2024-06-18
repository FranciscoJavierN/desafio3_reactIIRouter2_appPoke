import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Pokemones = () => {
    const [pokemones, setPokemones] = useState([]);
    const [pokemonSelected, setPokemonSelected] = useState("");
    const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
    const navigate = useNavigate();

    const getApi = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            const { results } = data;

            const pokemonesPromises = results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                const detallePokemon = await res.json();
                return {
                    id: detallePokemon.id,
                    name: detallePokemon.name,
                    img_showDownFrontDefault: detallePokemon.sprites.other['official-artwork'].front_default,
                };
            });

            const newPokemones = await Promise.all(pokemonesPromises);
            setPokemones(newPokemones);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const getPokemonDetails = async (pokemonName) => {
        const selectedPokemon = pokemones.find(pokemon => pokemon.name === pokemonName);
        setSelectedPokemonDetails(selectedPokemon);
    };

    const goToPokemonDetail = () => {
        if (pokemonSelected) navigate(`/pokemones/${pokemonSelected}`);
        else alert("Debe seleccionar un pokemon");
    };

    useEffect(() => {
        getApi();
    }, []);

    useEffect(() => {
        if (pokemonSelected) {
            getPokemonDetails(pokemonSelected);
        } else {
            setSelectedPokemonDetails(null);
        }
    }, [pokemonSelected]);

    return (
        <div className="mt-5 d-flex flex-column gap-3 align-items-center">
            <h1>Selecciona un Pokémon</h1>
            <DropdownButton title="Pokemones" variant="outline-dark"
                onSelect={(eventKey) => setPokemonSelected(eventKey)}>
                <Dropdown.Item disabled className="text-center">Elige un Pokémon</Dropdown.Item>
                {pokemones.map((pokemon) => (
                    <Dropdown.Item key={pokemon.id} eventKey={pokemon.name} className="text-center">
                        <img src={pokemon.img_showDownFrontDefault} alt={pokemon.name} />
                        <h3 className="namesList">{pokemon.name}</h3>
                    </Dropdown.Item>
                ))}
            </DropdownButton>

            {selectedPokemonDetails && (
                <div className="text-center text-capitalize">
                    <h2>{selectedPokemonDetails.name}</h2>
                    <img src={selectedPokemonDetails.img_showDownFrontDefault} alt={selectedPokemonDetails.name} />
                </div>
            )}

            <Button variant="dark" className="btn btn-dark"
                onClick={goToPokemonDetail}>Ver detalles</Button>
        </div>
    );
};

export default Pokemones;