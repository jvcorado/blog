import './header.css';
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConection';
import { signOut } from 'firebase/auth';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Header = ()=>{
    
    async function handleLogout(){
        await signOut(auth)
    }

    return (
        <header className="admin-header">
            <nav className='nav-header'>
                <button onClick={handleLogout}>
                    <BiLogOut size={28} color="#DB2629"/>
                </button>
                <Link to="/">
                    Postagens
                </Link>
            </nav>
        </header>
    );
    
}