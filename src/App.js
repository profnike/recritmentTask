import Users from './Pages/Users/Users';
import {Route,Routes} from 'react-router-dom';
import Edit from './Pages/Edit/Edit'
import Newuser from './Pages/Newuser/Newuser';

import './App.css';

function App() {
  return (
  
    <div className="App">
        <Routes >
          <Route exact path="/" element={<Users/>}/>
          <Route exact path="/edit/:id" element={<Edit/>}/>
          <Route exact path="/newuser" element={<Newuser/>}/>
        

         
    </Routes>
    </div>
  );
}

export default App;
