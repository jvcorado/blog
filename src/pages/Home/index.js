import './home.css'

import { useNavigate } from 'react-router-dom';


import { useState, useEffect } from 'react';

import { db } from '../../services/firebaseConection';
import {
    getDocs,
    collection,
    query,
    orderBy,
    doc,
    getDoc

} from 'firebase/firestore';
import { Logo } from '../../components/Logo';

export const Home = ()=>{

    const [posts, setPosts] = useState([])

    const navigate = useNavigate();

    function telaLogin(){
        navigate("/login", {replace:true})
    }

    useEffect(()=>{

        function loadPosts(){
            const postRef = collection(db , 'posts')
            const queryRef = query(postRef, orderBy('created', 'desc'))

            getDocs(queryRef)
            .then( (snapshot)=>{
                let postagem = [];

                snapshot.forEach((doc)=>{
                    postagem.push(
                        {
                            id:doc.id,
                            title: doc.data().title,
                            msg:doc.data().msg,
                            autor:doc.data().autor
                        }
                    )
                })

                setPosts(postagem)
            })

        }

        loadPosts();

    },[])

    return(
        <div className="container">
            <Logo/>
            <h1 className='title'>Publicações Recentes</h1>
            <main className="postagem">

                {posts.map((item) =>(
                    <section 
                    key={item.id}
                    className="post-area">
                        <h1 className="title-post">{item.title}</h1>
                        <p className="text-post">{item.msg}</p>
                        <span className="autor-post">{item.autor}</span>
                    </section>
                ))}
    
            </main>
        </div>
    )
}