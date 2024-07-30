import '../index.css';
import Account from '../components/Account';
import UserHeader from '../containers/UserHeader';
import EditNameSection from '../containers/EditNameSection';
import SignIn from './SignIn';

import { useSelector } from 'react-redux';

const AccountsData = [
    {
        title: 'Argent Bank Checking (x8349)',
        amount: '$2,082.79',
        description: 'Available Balance'
    },
    {
        title: 'Argent Bank Savings (x6712)',
        amount: '$10,928.42',
        description: 'Available Balance'
    },
    {
        title: 'Argent Bank Credit Card (x8349)',
        amount: '$184.30',
        description: 'Current Balance'
    }
]

function User() {

  const token = useSelector(state => state.user.user.token);

  if (token === ''){
    return (
      <SignIn/>
    )
  }

  return (
    <>
      <UserHeader />
      <div className="user_container">
        <main className="main bg-dark">
          <div className="header">
            <EditNameSection />
          </div>
          <h2 className="sr-only">Accounts</h2>
            { AccountsData.map(account => (
              <Account 
                key= { account.title }
                title= { account.title }
                amount= { account.amount }
                description= { account.description }
              />
            ))}
        </main>
      </div>
    </>
    
  );
}
  
export default User