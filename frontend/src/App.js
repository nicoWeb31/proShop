import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';

import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
    return (
        <>
            <Header />

            <main className="py-3">
                <Container>
                    <h1>Welcome to proshop !!</h1>
                    <HomePage />
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default App;
