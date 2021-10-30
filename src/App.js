import Todofeature from './feature/Todo/pages';
import AlbumFeature from './feature/Album/pages';
import './App.css'
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <h1>Header</h1>
      <ul>
        <li><NavLink to='/todos' activeClassName='menu-item-active' >Todo</NavLink></li>
        <li><NavLink to='/albums' activeClassName='menu-item-active'>Album</NavLink></li>   
        <hr />
      </ul>

      <Switch>
        <Route path='/todos' component={Todofeature} />
        <Route path='/albums' component={AlbumFeature} />
      </Switch>

      <h1>Footer</h1>
    </div>
  );
}

export default App;
