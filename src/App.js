import React from "react";
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './layout/Header';
import ReviewList from './components/review/ReviewList';
import Review from "./components/review/Review";
import Profile from "./components/profile/Profile";
import User from "./components/admin/User";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthVerify from "./services/auth/authVerify";
import AuthService from "./services/auth/AuthService";
import EventBus from "./services/auth/EventBus";
import ProfileForm from "./components/profile/ProfileForm";
import ReviewForm from "./components/review/ReviewForm";

// npm install react-bootstrap bootstrap@5.1.3

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.logout = this.logout.bind(this);
//
//         this.state = {
//             showAdminBoard: false,
//             currentUser: undefined,
//         };
//     }
//
//     componentDidMount() {
//         const user = AuthService.getCurrentUser();
//
//         if (user) {
//             this.setState({
//                 currentUser: user,
//                 showAdminBoard: user.roles.includes("ROLE_ADMIN"),
//             });
//         }
//
//         eventBus.on("logout", () => {
//             this.logout();
//         });
//     }
//
//     componentWillUnmount() {
//         eventBus.remove("logout");
//     }
//
//     logout() {
//         AuthService.logout();
//         this.setState({
//             showAdminBoard: false,
//             currentUser: undefined,
//         });
//     }
//
//     render() {
//         const { currentUser, showAdminBoard } = this.state;
//
//         return (
//             <BrowserRouter>
//                 <div className="App">
//                     <Header />
//                     <Route path='/' exact component={Home} />
//                     <Route path="/login" exact component={Login} />
//                     <Route path="/register" exact component={Register} />
//                     <Route path='/profile' exact component={Profile} />
//                     <Route path='/reviews' exact component={ReviewList} />
//                     <Route path='/users' exact component={User} />
//                 </div>
//             </BrowserRouter>
//         );
//     }
// }

class App extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            authenticated: false
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                authenticated: false
            });
        }

        EventBus.on("logout", () => {
            this.logout();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logout() {
        AuthService.logout();
        this.setState({
            authenticated: false
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Route path='/' exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                    <Route path='/profile' exact component={Profile} />
                    <Route path='/profile/:id/edit' exact component={ProfileForm} />
                    <Route path='/profile/:profile_id/reviews' exact component={ReviewForm} />
                    <Route path='/reviews' exact component={ReviewList} />
                    <Route path='/reviews/:id' exact component={Review} />
                    <Route path='/reviews/:reviewId/edit' exact component={ReviewForm} />
                    <Route path='/users' exact component={User} />
                </div>
                <AuthVerify logout={this.logout}/>
            </BrowserRouter>
        )
    }
}

// function App() {
//   return (
//     <BrowserRouter>
//         <div className="App">
//             <Header />
//             <Route path='/' exact component={Home} />
//             <Route path="/login" exact component={Login} />
//             <Route path="/register" exact component={Register} />
//             <Route path='/profile' exact component={Profile} />
//             <Route path='/reviews' exact component={ReviewList} />
//             <Route path='/reviews/:id' exact component={Review} />
//             <Route path='/users' exact component={User} />
//         </div>
//     </BrowserRouter>
//   );
// }

export default App;
