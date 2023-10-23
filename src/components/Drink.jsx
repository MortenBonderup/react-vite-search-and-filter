// RMK
export default function Drink({ drink }) {
    /*const navigate = useNavigate();*/

    // Deler ingredienserne i en liste
    const ingredienserListe = drink.ingredienser.map((ingrediens, index) => (
        <li key={index}>{ingrediens}</li>
    ));

    // Deler metoden i separate <p> elementer
    const metodeAfsnit = drink.metode.map((afsnit, index) => (
        <li key={index}>{afsnit}</li>
    ));

    console.log(drink.billede);

    // RMK & SD
    return (
        <section className="op-wrap" style={{ width: "200px", border: "1px solid black" }}>

            <img className="opimg" src={drink.billede} alt="Billede af drink" style={{ width: "200px" }} />
            <div className="fixedMargin">
                <div className="opheader">
                    <h2>{drink.navn}</h2>
                    <div className="op-like">
                        FavoriteRoundedIcon
                    </div>
                </div>
                <h3>Ingredienser</h3>
                <div className="items">
                    <ul className="items">{ingredienserListe}</ul>
                </div>
                <h3>Fremgangsmåde</h3>
                <div className="howto">
                    <ul>{metodeAfsnit}</ul>
                </div>
                <h3>Bedømmelse</h3>
                ****
            </div>
        </section>
    );
}