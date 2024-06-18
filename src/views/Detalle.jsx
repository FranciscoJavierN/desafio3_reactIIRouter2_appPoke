import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

const Detalle = () => {
    const { name } = useParams();

    const [pokemon, setPokemon] = useState({});

    const url = "https://pokeapi.co/api/v2/pokemon";

    const getPokemon = async (name) => {
        const res = await fetch(`${url}/${name}`);
        const data = await res.json();
        // console.log("data: ",data)
        const src = data.sprites.other["official-artwork"].front_default;
        const stats = data.stats.map((stat) => ({
            name: stat.stat.name,
            base: stat.base_stat,
        }));
        const types = data.types.map(({ type }) => type.name).join("  ");
        setPokemon({ name, stats, src, types });
    };

    useEffect(() => {
        getPokemon(name);
    }, [name]);

    return <PokemonCard pokemon={pokemon} />;
};
export default Detalle;