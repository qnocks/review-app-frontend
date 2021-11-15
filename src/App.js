import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './layout/Header';
import Review from './components/review/Review';
import Profile from "./components/profile/Profile";
import User from "./components/admin/User";

// npm install react-bootstrap bootstrap@5.1.3

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/profile' exact component={Profile} />
            <Route path='/reviews' exact component={Review} />
            <Route path='/users' exact component={User} />
        </div>
    </BrowserRouter>
  );
}

export default App;
