import { Card } from "react-bootstrap";

const PokemonCard = ({ pokemon }) => {
    const { name, stats, src, types } = pokemon;
    return (
        <Card
            style={{ width: "34rem" }}
            className="mt-5 mx-auto flex-row p-2"
        >
            <Card.Img
                height="300"
                variant="top"
                src={src}
            />
            <Card.Body>
                <Card.Title className="fw-bold text-capitalize">{name}</Card.Title>
                <ul className="text-left">
                    <Card.Text>
                        {stats?.map((stat, i) => (
                            <li key={i}>
                                {stat.name}: {stat.base}
                            </li>
                        ))}
                    </Card.Text>
                </ul>
                <Card.Text className="text-secondary">{types}</Card.Text>
            </Card.Body>
        </Card>
    );
};
export default PokemonCard;