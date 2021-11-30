import Todofeature from './feature/Todo/pages';
import AlbumFeature from './feature/Album/pages';
import './App.css'
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import coursesApi from './api/coursesApi';
import CounterTest from './feature/Counter';
import Header from './components/Header';
import ProductFeature from './feature/Product';



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
      </Switch>

      <h1>Footer</h1>
    </div>
  );
}

export default App;
