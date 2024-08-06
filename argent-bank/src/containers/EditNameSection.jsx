import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserName } from '../redux/reducers/userReducer';


export default function App() {

    const dispatch = useDispatch();
    const initialUserName = useSelector(state => state.user.user.userName);
    const userFirstName = useSelector(state => state.user.user.firstName);
    const userLastName = useSelector(state => state.user.user.lastName);
    const token = useSelector(state => state.user.user.token);


    const [isActive, setIsActive] = useState(false);
    const [titleText, setTitleText] = useState('Welcome back');
    const [point, setPoint] = useState('!');
    const [firstName, setFirstName] = useState(userFirstName);
    const [lastName, setLastName] = useState(userLastName);

    const handleClick = () => {
        setIsActive(current => !current);
        setTitleText('Edit user name');
        setPoint('');
    };

    const reverseClick = () => {
        setIsActive(current => !current);
        setTitleText('Welcome back');
        setPoint('!');
    };

  return (
    <div>
        <h1 className='userEdit_title' >{titleText}<br/>{firstName} {lastName} {point}</h1>
        <div className='userName'>
            <form 
                className='userName_form' 
                id="userNameEdit"
                style={{display: isActive ? 'flex' : 'none',}}
            >
                <div className="userName_input">
                    <label htmlFor="userName">User Name</label>
                    <input type="text" id="userName" value={initialUserName} disabled/>
                </div>
                <div className="userName_input">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName"  onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="userName_input">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="LastName"  onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className='userNameButton_wrapper'>
                    <button 
                        className="userName_button"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(editUserName({ lastName, firstName, token }))
                            dispatch(reverseClick)
                        }}
                    >
                        Save
                    </button>
                    <button 
                        className="userName_button"
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(reverseClick)
                        }}
                    >
                        Delete
                    </button>
                </div>
            </ form>
        </div>
        <button
            className="edit-button"
            style={{
            display: isActive ? 'none' : '',
            }}
            onClick={handleClick}
        >
            Edit Name
        </button>
    </div>
  );
}