import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UsersPage from './pages/UsersPage';
import UserEditPage from './pages/UserEditPage';
import ProductsList from './pages/ProductsList';
import ProductEditPage from './pages/ProductEditPage';

function App() {
    return (
        <Router>
            <Header />

            <main className="py-3">
                <Container>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/product/:id" component={ProductsPage} />
                    <Route path="/shipping" component={ShippingPage} />
                    <Route path="/orders/:id" component={OrderPage} />
                    <Route path="/admin/userslist" component={UsersPage} />
                    <Route path="/admin/user/:id/edit" component={UserEditPage} />
                    <Route path="/admin/productslist" component={ProductsList} />
                    <Route path="/admin/product/:id/edit" component={ProductEditPage} />
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/placeorder" component={PlaceOrderPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/profile" component={ProfilePage} />

                    {/* ? optionnel */}
                    <Route path="/cart/:id?" component={CartPage} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
