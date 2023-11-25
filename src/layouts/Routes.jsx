import React from 'react'
import DashboardLayout from './DashboardLayout.jsx';
import Layout from './Layout.jsx';
import Home from '../components/web/home/Home.jsx';
import Categories from '../components/web/categories/Categories.jsx';
import DashboardHome from '../components/dashboard/home/Home.jsx';
import DashboardCategories from '../components/dashboard/categories/Categories.jsx';
import { createBrowserRouter } from 'react-router-dom';
import Register from '../components/web/register/Register.jsx';

export const router = createBrowserRouter([
    {
        path:'/dashboard',
        element:<DashboardLayout/>,
        
        children:[
            
            {
                path:'home',
                element:<DashboardHome/>
            },
            {
                path:'categories',
                element:<DashboardCategories/>
            },
            {
                path:'*',
                element:<h2>404 page not found --dashboard  </h2>
            }
        ]
        
    },
    {
        path:'/',
        element:<Layout/>,
        
        children:[
            {
                path:'register',
                element:<Register/>
            },
            {
            path:'home',
            element:<Home/>
        },
        {
            path:'categories',
            element:<Categories/>
        },
        {
            path:'*',
            element:<h2>404 page not found --user  </h2>
        }
    ]
    }
    
]);

