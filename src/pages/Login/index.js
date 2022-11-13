import './login.css'
import { useNavigate } from 'react-router-dom';
import { Input } from "../../components/Input"
import { useState } from 'react';
import { auth } from '../../services/firebaseConection';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const Login = ()=>{

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();

        if(email ==='' || password ===''){
            alert("Preencha todos os campos!!")
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            navigate("/admin", { replace:true })
        }).catch((error)=>{
            alert('Erro ao tentar fazer login ')
        })
    }



    return(
        <div className="container container-login">
            <h1>Faça seu Login</h1>
            <form className="form" onSubmit={handleLogin}>
                <Input
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder='Digite seu email'
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)} //pegando o valor do input atraves do evento
                />

                <Input
                type="password"
                name="password"
                id="password"
                placeholder="Digite sua senha..."
                value={password}
                onChange={ (e)=> setPassword(e.target.value)}/>
                <button type="submit" className="btn">Acessar</button>

            </form>
        </div>
    )
}