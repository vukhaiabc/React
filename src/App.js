import { Route, Switch } from 'react-router';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AlbumFeature from './feature/Album/pages';
import CartFeature from './feature/Cart';
import CounterTest from './feature/Counter';
import ProductFeature from './feature/Product';
import Todofeature from './feature/Todo/pages';


function App() {
  
  // useEffect(()=>{
  //   const fetchCourses = async ()=>{
  //     const listCourses = await coursesApi.getAll();
  //     console.log(listCourses)
  //   } 
  //   fetchCourses()
  // },[]);
  return (
    <div className="App">
      <Header></Header>

      <Switch>
        <Route path='/todos' component={Todofeature} />
        <Route path='/albums' component={AlbumFeature} />
        <Route path='/counter' component= {CounterTest} />
        <Route path='/product' component= {ProductFeature} />
        <Route path='/cart' component= {CartFeature} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
