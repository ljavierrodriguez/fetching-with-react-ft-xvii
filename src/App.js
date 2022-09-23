import React, { useEffect, useState } from 'react';
import CharacterCard from './components/characterCard';
import Loading from './components/loading';
import * as config from './config';
import { getFetch } from './libs';

/* 
const ComponentA = () => {

    useEffect(() => {
        // componentDidMount
        console.log('Hola, Componente Cargado...')

        return () => {
            // componentWillUnmount
            console.log('Chao, Componente Eliminado...')

        }
    }, [])

    return (
        <h1>Component A</h1>
    )
} */

const App = () => {

    const [characters, setCharacters] = useState(null);

    //const [show, setShow] = useState(false);

    useEffect(() => {
        // componentDidMount

        getCharacters(config.URL_CHARACTERS)

        return () => {
            // componentWillUnmount


        }
    }, [])


    /* useEffect(() => {
        console.log("Show ha sido modificado");
    }, [show]) */

    const getCharacters = (url, options = {
        method: 'GET', // GET, POST, PUT, DELETE
        headers: {
            'Content-Type': 'application/json', // MIME
        }
    }) => {
        getFetch(url, options)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) => {
                console.log(response);
                setCharacters(response);
            })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Rick and Morty</h1>
                        {/* {show && <ComponentA />}
                        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button> */}
                    </div>

                    <div className="col-md-12 d-flex justify-content-around py-3">
                        <button className="btn btn-primary" onClick={() => {
                            if(characters.info.prev !== null) {
                                getCharacters(characters.info.prev);
                            } else {
                                getCharacters(config.URL_CHARACTERS + "?page=" + characters.info.pages);
                            }
                        }} >
                            Prev
                        </button>
                        
                        <button className="btn btn-primary" onClick={() => {
                            if(characters.info.next !== null) {
                                getCharacters(characters.info.next);
                            } else {
                                getCharacters(config.URL_CHARACTERS);
                            }
                        }}>
                            Next
                        </button>
                    </div>
                </div>
                <div className="row">
                    {
                        !!characters &&
                            characters.results.length > 0 ?
                            characters.results.map((character) => {
                                return (
                                    <div className="col-md-6 col-sm-6 col-12" key={character.id}>
                                        <CharacterCard {...character} />
                                    </div>
                                )
                            }) :
                            (
                                <div className="col-md-12 text-center">
                                    <Loading />
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default App;
