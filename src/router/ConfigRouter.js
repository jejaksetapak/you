import React, { Component } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import NavbarComponent from '../component/NavbarComponent';
import BrandFormList from '../page/brand/BrandFormList';
import BrandPage from '../page/BrandPage';
import HomePage from '../page/HomePage';
import InsurancePage from '../page/insurance/InsurancePage';


export default class ConfigRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavbarComponent />
                <main className='main-content'>
                    <Routes>
                    <Route path='/' element={<HomePage/>} exact />
                    <Route path='/brand-no-img' element={<BrandPage/>} />
                    <Route path='/brand' element={<BrandFormList/>} />
                    <Route path='/insurance' element={<InsurancePage/>} />
                    </Routes>
                </main>
            </BrowserRouter>
        )
    }
}