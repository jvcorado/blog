import './error.css'
import { Link } from 'react-router-dom'

export const Error = ()=>{
    return(
        <div className='error'>
            <h1>Página não encontrada!</h1>
            <p>Está página que está procurando não existe</p>
            <Link className='link' to="/">
                Voltar para página Home
            </Link>
        </div>
    )
}