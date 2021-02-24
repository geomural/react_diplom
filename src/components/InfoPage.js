import React from 'react'
import Banner from './Banner'
import PageFooter from './PageFooter'
import PageHeader from './PageHeader'

export default function InfoPage(props) {
    return (
        <div>
            <PageHeader/>
            <Banner/>
            {props.children}
            <PageFooter/>
        </div>
    )
}
