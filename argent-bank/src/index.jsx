import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Footer from './containers/Footer';
import '.'

import store from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} >
            <React.StrictMode>
                <Router>
                        <Routes>
                            <Route path="" element={<Home />} exact />
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/user" element={<User />} />
                        </Routes>
                    <Footer />
                </Router>
            </React.StrictMode>
        </PersistGate>
    </Provider>
);