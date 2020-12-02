import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/productPage'

function App() {
    return (
        <Router>
            <Header />

            <main className="py-3">
                <Container>
                    <Route  exact path="/" component={HomePage} />
                    <Route path="/product/:id" component={ProductsPage} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
