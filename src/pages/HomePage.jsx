import { useEffect, useState } from "react";
import Drink from "../components/Drink";

//RMK
export default function HomePage() {
    // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
    //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
    const [drinks, setDrinks] = useState([]);
    const [isDrinks, setIsDrinks] = useState(true);
    const [soegeTekst, setSoegeTekst] = useState("");
    const [skyggeDrinksListe, setSkyggeDrinksListe] = useState([]);

    useEffect(() => {
        async function getDrinks() {
            //Der defineres en URL til at hente drinks-data fra vores Firebase-database.
            const url =
                "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks.json";

            //Her bruges "fetch" til hente drinks-data fra vores Firebase-database og konvertere dem til JSON-format.
            const response = await fetch(url);
            const data = await response.json();

            //Hvis der er data tilgængelig, laves dataerne til et array og opdaterer "drinks" til at indeholde denne liste af drinks.
            if (data !== null) {
                const drinksArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setDrinks(drinksArray);
                setSkyggeDrinksListe(drinksArray);
            }

            //Hvis der ikke er nogen data tilgængelig, opdateres "isDrinks" til "false" for at vise en meddelelse om, at der ikke er noget at vise.
            else {
                setIsDrinks(false);
            }
        }
        getDrinks();
    }, []);


    function reset() {
        setSkyggeDrinksListe(drinks);
        setSoegeTekst("");
        setIsDrinks(false);
    }


    function haandterSubmit(e) {
        e.preventDefault();
        let soegeResultat = drinks.filter((drink) => {
            const s1=drink.navn.toLowerCase().includes(soegeTekst.toLowerCase()); // Søg i drink navn
            const s2=drink.ingredienser.find(ingrediens => ingrediens.toLowerCase().includes(soegeTekst.toLowerCase())); // Søg blandt ingredienser
            return s1 || s2; // Hvis enten s1 eller s2 er sand, så eksisterer søgeteksten i drink navn eller ingredienser
        }) 

        if (soegeResultat.length === 0) {  // Er der ingen drinks som matcher søgetekst, så er der ingen drinks at vise
            setIsDrinks(false);
        } else {
            setIsDrinks(true);
            setSkyggeDrinksListe(soegeResultat); // Sæt skyggelisten lig med resultat af søgning
        }
    }


    //Hvis "isDrinks" er "true", vises en liste af drinks vha. "map" funktionen, ellers vises en besked om, at der ikke er noget at vise.
    return (
        <article className="page">
            <form onSubmit={haandterSubmit}><input type="search" required value={soegeTekst} onChange={e => setSoegeTekst(e.target.value)} />
                <button type="submit">Søg</button>
                <button type="button" onClick={reset}>Reset</button>
            </form>
            {isDrinks ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                    {skyggeDrinksListe.map((drink) => (
                        <Drink key={drink.id} drink={drink} />
                    ))}
                </div>
            ) : (
                <p>Nothing to show</p>
            )}
        </article>
    );
}