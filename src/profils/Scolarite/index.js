import React, { Component } from "react"
import Sidebar from "./containers/sidebar"
import Header from "./containers/header";
import Footer from "./../../components/Footer/index"
import Content from "./containers/content"

class Scolarite extends Component {
    render(){
        return(
            <div className="c-app c-default-layout">
                <Sidebar/>
            <div className="c-wrapper">
                <Header/>
            <div className="c-body">
                <Content/>
            </div>
                <Footer/>
            </div>
            </div>
        )
    }
}

export default Scolarite