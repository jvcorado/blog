import './admin.css'
import { Input } from "../../components/Input"
import { Header } from '../../components/Header';
//import { MdAddLink } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';


import { useState, useEffect } from 'react';
import { db } from '../../services/firebaseConection';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from 'firebase/firestore';

export const Admin = ()=>{

    const [titleInput, setTitleInput] = useState("");
    const [msgInput, setMsgInput] = useState("");
    const [autorInput, setAutorInput] = useState("");
  
    const [posts, setPosts] = useState([])

    useEffect(()=>{

    const postsRef = collection(db, 'posts')
    const queryRef = query(postsRef, orderBy("created", "desc"))

    const unsub = onSnapshot(queryRef, (snapshot)=>{
        let postagem = [];

        snapshot.forEach((doc)=>{
            postagem.push(
                {
                   id:doc.id,
                   title:doc.data().title,
                   msg:doc.data().msg,
                   autor:doc.data().autor
                }
            )
        })

            setPosts(postagem);
        })

    },[])

    async function handleRegister(e){
        e.preventDefault();

        if(titleInput === "" || msgInput === "" || autorInput === ""){
            alert("Preencha todos os campos!")
            //toast.warn("Preencha todos os campos!")
            return;
        }

        addDoc(collection(db,"posts"), {
            title:titleInput,
            msg:msgInput,
            autor:autorInput,
            created: new Date(),
        })
        .then(()=>{
            setTitleInput("")
            setAutorInput("")
            setMsgInput("")
            console.log('Post criado com sucesso')
        })
        .catch((error)=>{
            console.log('ERRO AO REGISTRAR Postagem ' + error)
            //toast.error("Ops erro ao salvar link")
        })// criando id aleatorio, definindo a colecao com o bd e o nome dela
    }

    async function handleDeleleteLink(id){
        const docRef = doc(db, 'posts', id)
        await deleteDoc(docRef)
    }

    return(
        <div className="container">
            <Header></Header>
            <form className="form" onSubmit={handleRegister}>
                <h1>Nova Postagem</h1>   
                <Input
                    type="text"
                    name="title"
                    id="title"
                    value={titleInput}
                    onChange={(e)=> setTitleInput(e.target.value)}
                    placeholder="Titulo"
                />
                <textarea 
                    className="msg"
                    name="msg" 
                    id="mgs" 
                    cols="30" 
                    rows="10" 
                    value={msgInput}
                    onChange={(e)=> setMsgInput(e.target.value)}
                    placeholder="Texto">
                </textarea>

                <Input
                    type="text"
                    name="autor"
                    id="autor"
                    value={autorInput}
                    onChange={(e)=> setAutorInput(e.target.value)}
                    placeholder="Autor"
                />


                {titleInput !== '' &&(
                    <div className="preview">
                       <section className="post-area">
                           <h1 className="title-post">{titleInput}</h1>
                           <p className="text-post">{msgInput}</p>
                           <span className="autor-post">{autorInput}</span>
                       </section>
                   </div>
                )}
                <button type="submit" className="btn">Publicar</button>

                <h2 className='title'>
                    Minhas Postagens
                </h2>

                {posts.map((item,index) => (
                    <section 
                        key={index}
                        className="post-area">
                            <h1 className="title-post">{item.title}</h1>
                            <p className="text-post">{item.msg}</p>
                            <span className="autor-post">{item.autor}</span>
                            <div>
                                <button 
                                    className='btn-delete' 
                                    onClick={() => handleDeleleteLink(item.id)}>
                                            <FiTrash2 size={18} color="white"></FiTrash2>
                                </button>
                            </div>
                    </section>
                ))}
            </form>
        </div>
    )
}