import Banner from '../containers/Banner'
import Features from '../containers/Features'
import Header from '../containers/Header'


function Home() {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Features />
      </main>
    </>
  );
}
  
export default Home