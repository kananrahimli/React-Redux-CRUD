import ListItem from "./components/ListItem";
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom'
import Details from "./components/Details";
import AddListItem from "./components/AddListItem";
import PutListItem from "./components/PutListItem";
import './index.css'
function App() {

  return (
    <div className="d-flex jsutify-content-center align-items-center" style={{minHeight:'100vh'}}>
       <div className="ui raised very padded text container segment ">
      {/* HEADER */}

      <Router>
        <Switch>
           <Route exact path='/'>
             <ListItem></ListItem>
           </Route>
           <Route exact path='/posts/:id'>
             <Details></Details>
           </Route>
           <Route exact path='/add-item'>
             <AddListItem></AddListItem>
           </Route>
           <Route exact path='/posts/:id/edit'>
             <PutListItem></PutListItem>
           </Route>
        </Switch>
      </Router>
     
    </div>
    </div>
   
  );
}

export default App;
