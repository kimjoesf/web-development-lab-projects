 
import './App.css';
import NewLearnerOffer from './components/NewLearnerOffer';
import Header from './components/Header';
import Poster from './components/Poster';
import CareerSkillsBanner from './components/CareerSkillsBanner';
import AIEraPoster from './components/AIEraPoster';
import BottomSlider from './components/BottomSlider';
 

function App() {
  return (
    <div className="App" style={{width:"full",height:"100vh" ,display:"flex", alignItems:"center", flexDirection:"column", overflowY:"auto", scrollBehavior:"smooth"}}>
      <NewLearnerOffer/>
      <Header/>
      <Poster bg={"/assets/poster.png"}/>
      <CareerSkillsBanner/>
      <AIEraPoster/>
      <BottomSlider/>
      <img src='/companies.png' style={{width:"100%",marginTop:60, marginBottom:50}}/>
    </div>
  );
}

export default App;
