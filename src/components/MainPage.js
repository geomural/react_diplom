import React from 'react'
import Banner from './Banner'
import Catalog from './Catalog/Catalog'
import PageFooter from './PageFooter'
import PageHeader from './PageHeader'
import TopSales from './TopSales'

export default function MainPage() {
    return (
        <div>
            <PageHeader/>
            <Banner/>
            <TopSales/>
            <Catalog/>
            <PageFooter/>
        </div>
    )
}
