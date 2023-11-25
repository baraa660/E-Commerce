import React from 'react'
import {router} from './layouts/Routes.jsx' 
import { RouterProvider } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

