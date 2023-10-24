import { useEffect, useState } from "react";
import Drink from "../components/Drink";

//RMK
export default function AboutPage() {
    // Her opretter jeg to tilstandsvariabler ved hjælp af "useState".
    //"drinks" bruges til at lagre listen over drinks, og "isDrinks" bruges til at kontrollere, om der er drinks at vise.
    const [drinks, setDrinks] = useState([]);
    const [isDrinks, setIsDrinks] = useState(true);
    const [skyggeDrinksListe, setSkyggeDrinksListe] = useState([]);
    const [soegeOrdsListe, setSoegeOrdsListe] = useState([]);

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


    function haandterCheckboks(e) {
        const checkboksStatus= e.currentTarget.checked; // er true(checked) eller false(ikke checked)
        const soegeord = e.currentTarget.getAttribute("data-soegeord"); // gemmer på søgeordet
        if (checkboksStatus) {
            soegeOrdsListe.push(soegeord); // Indsætter søgeordet på søgeordslisten
        } else {
            const indeks = soegeOrdsListe.indexOf(soegeord); // Finder søgeordets position på søgeordslisten
            soegeOrdsListe.splice(indeks, 1); // Fjerner søgeordet fra søgeordslisten
        }

        setSoegeOrdsListe(soegeOrdsListe);
    }



    function haandterAktiver(e) {
        e.preventDefault();
        
        // setSkyggeDrinksListe(drinks);
        setIsDrinks(true);

        let temp = [];
        let soegeResultatListe = drinks;

       
        for (const soegeord of soegeOrdsListe) {
            temp = soegeResultatListe.filter((drink) => {
                const s1=drink.navn.toLowerCase().includes(soegeord.toLowerCase()); // Søg i drink navn
                const s2=drink.ingredienser.find(ingrediens => ingrediens.toLowerCase().includes(soegeord.toLowerCase())); // Søg blandt ingredienser
                return s1 || s2; // Hvis enten s1 eller s2 er sand, så eksisterer søgeordet i drink navn eller ingredienser
            })
           
            soegeResultatListe = temp;
        }

        if (skyggeDrinksListe.length === 0) {  // Er der ingen drinks som matcher , så er der ingen drinks at vise
            setIsDrinks(false);
        } else {
            setSkyggeDrinksListe(soegeResultatListe);
        }
    }



    //Hvis "isDrinks" er "true", vises en liste af drinks vha. "map" funktionen, ellers vises en besked om, at der ikke er noget at vise.
    return (
        <article className="page">
            <form onSubmit={haandterAktiver}>
                <label>Vodka<input type="checkbox" defaultChecked={false} data-soegeord="vodka" onChange={haandterCheckboks} /></label>
                <label>Isterninger<input type="checkbox" defaultChecked={false} data-soegeord="isterning" onChange={haandterCheckboks} /></label>
                <label>Sirup<input type="checkbox" defaultChecked={false} data-soegeord="sirup" onChange={haandterCheckboks} /></label>
                <button type="submit">Aktiver</button>
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

