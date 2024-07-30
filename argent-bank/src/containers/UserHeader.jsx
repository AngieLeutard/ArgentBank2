import { Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


import argentBankLogo from '../assets/argentBankLogo.png';
import '../../src/index.css';

export const UserHeader = () => {

    const dispatch = useDispatch()
    const userName = useSelector(state => state.user.user.userName)
    console.log(userName)
    const navigate = useNavigate()

    const clearToken = (e) => {
        e.preventDefault()
        dispatch({type: 'LOGOUT'});
        navigate('/sign-in')
      };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={ argentBankLogo } alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link className="main-nav-item" to="/user" >
                    <i className="fa fa-user-circle"></i>
                    { userName }
                </Link>
                <Link 
                    className="main-nav-item"
                    onClick={clearToken}
                >
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </nav>
    )
}

export default UserHeader