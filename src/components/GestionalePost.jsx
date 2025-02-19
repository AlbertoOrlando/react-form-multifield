// importiamo hook useState
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "@fontsource/roboto";

// dati iniziali
const articoli = [
    {
        id: 1,
        titolo: "Il mio primo articolo",
        autore: "Mario Rossi",
        contenuto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla officia non totam inventore itaque illo tempore repellendus. Tempore incidunt architecto consectetur ducimus. Esse ipsam voluptatum autem aut adipisci nam saepe.",
        categoria: "Scienza",
        available: true
    },
    {
        id: 2,
        titolo: "Un articolo interessante",
        autore: "Luisa Verdi",
        contenuto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla officia non totam inventore itaque illo tempore repellendus. Tempore incidunt architecto consectetur ducimus. Esse ipsam voluptatum autem aut adipisci nam saepe.",
        categoria: "Storia",
        available: true
    },
    {
        id: 3,
        titolo: "Un articolo divertente",
        autore: "Giuseppe Gialli",
        contenuto: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla officia non totam inventore itaque illo tempore repellendus. Tempore incidunt architecto consectetur ducimus. Esse ipsam voluptatum autem aut adipisci nam saepe.",
        categoria: "Umorismo",
        available: true
    }
];

//   oggetto azzeramento valori
const initialFormData = {
    titolo: "",
    autore: "",
    contenuto: "",
    categoria: "",
    available: false
}

// creazione GestionalePost
export default function GestionalePost() {

    // utilizzo useState per gestione dati (array articoli) 
    const [posts, setPosts] = useState(articoli);
    // utilizzo useState per gestione informazioni raccolte dai campi del form
    const [formData, setFormData] = useState(initialFormData);


    // funzione gestione informazione dei campi
    function manageFormData(e) {
        // gestione del value in base al tipo di input
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        // assegna tramite useState i valori degli input
        setFormData((currentFormData) => ({
            ...currentFormData, [e.target.name]: value,
        }));

    }

    // funzione invio dei dati del form
    function manageSubmit(e) {
        e.preventDefault();
        setPosts((currentPosts) => [...currentPosts, {
            id: currentPosts.length === 0 ? 1 : currentPosts[currentPosts.length - 1].id + 1, ...formData
        }])

        // resetto il form
        setFormData(initialFormData);
    }


    // funzione per rimuovere gli articoli
    const rimuoviPost = (idPost) => {
        // creiamo nuovo array senza il post che non cancelliamo
        const nuoviPosts = posts.filter((post) => post.id !== idPost)
        // lo sostituiamo
        setPosts(nuoviPosts)
    }

    // Render the component
    return (
        <>
            {/* Titolo principale della pagina */}
            <h1>Lista dei Posts</h1>
            {posts.length === 0 ? <p>Non ci sono posts</p> :
                <div className="posts_container">
                    {posts.map((post) => (
                        <div className="post" key={post.id}>
                            <span id="categoria">{post.categoria}</span>
                            <h2 id="titolo">{post.titolo}</h2>
                            <span id="autore">{post.autore}</span>
                            <p id="contenuto">{post.contenuto}</p>
                            <span id="icona"><FontAwesomeIcon icon={faTrashCan} onClick={() => rimuoviPost(post.id)
                            } /></span>
                            <span className={post.available ? "verify" : "notverify"} id="available">{post.available ? "Post certificato" : "Post da certificare"}</span>
                        </div>
                    ))}
                </div>
            }
            <form onSubmit={manageSubmit}>
                {/* valore categoria */}
                <div className="form_container">
                    <h3>Aggiungi un nuovo post</h3>
                    <input
                        name="categoria"
                        type="text"
                        value={formData.categoria}
                        placeholder="Categoria post"
                        onChange={manageFormData}
                        id="form_categoria"
                    />
                    {/* valore titolo */}
                    <input
                        name="titolo"
                        type="text"
                        value={formData.titolo}
                        placeholder="Titolo post"
                        onChange={manageFormData}
                        id="form_titolo"
                    />
                    {/* valore autore */}
                    <input
                        name="autore"
                        type="text"
                        value={formData.autore}
                        placeholder="Autore post"
                        onChange={manageFormData}
                        id="form_autore"
                    />
                    {/* valore contenuto */}
                    <textarea name="contenuto" value={formData.contenuto} onChange={manageFormData} placeholder="Contenuto post" id="form_contenuto"
                    ></textarea>
                    {/* pubblicazione */}
                    <div>
                        <label className="label" htmlFor="available">Pubblicato</label>
                        <input type="checkbox"
                            name="available"
                            checked={formData.available}
                            onChange={manageFormData}
                            id="available" />
                    </div>
                    <button>
                        Aggiungi Post
                    </button>
                </div>
            </form>
        </>
    )

}


