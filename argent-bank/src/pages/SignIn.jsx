import Form from '../containers/Form'
import Header from '../containers/Header'

function SignIn() {
  return (
    <>
    <Header />
      <div className="form_container">
        <main className="main bg-dark"> 
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <Form />
          </section>
        </main>
      </div>
    </>
  );
}
  
export default SignIn