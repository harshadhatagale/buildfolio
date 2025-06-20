'use client'
import React from 'react'
import { Provider } from 'react-redux'
import store from '@/app/store'
export default function PreviewLayout({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
