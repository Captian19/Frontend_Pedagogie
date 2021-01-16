
import React, { Component } from 'react'
import axios from 'axios'

export class SingleBook extends Component {
    constructor(props){
        super(props)
        this.state = {
            data_from_book: [],
            data_from_document:[],
            auteurs: ""
        }
        var myDate ="";
       
        const id = parseInt(this.props.match.params.id)
        console.log(id)
        this.getInitDataFromBook(this.props.match.params.id)
        
        
    }

    getInitDataFromBook = async (id)=>{
        const data1 = await (await axios.get(`http://localhost:8000/livre/${id}/`)).data
        this.setState({
            data_from_book: data1
        })
        this.getInitDataFromDocument(parseInt(data1.document))
        
        //console.log(this.state.data_from_book)
    }

    getInitDataFromDocument = async (id_document) =>{
        const data2 = await (await axios.get(`http://localhost:8000/document/${id_document}/`))
        //console.log(data2.data);
        this.setState({
            data_from_document: data2.data
        })
        try{
            this.myDate = this.state.data_from_document.date_publication.toString().split("T")[0]
        }catch{
            console.log("error")
        }
        
        //console.log(this.state.data_from_document.liste_auteurs)
        
        //console.log(this.state.auteurs)
        await this.getAuteurs().
                                then((res)=>{
                                    console.log(res)
                                    try{
                                        var auteurs_list = "";
                                        var i =0;
                                        res.forEach(element => {
                                            //console.log(typeof(element)) 
                                            axios
                                            .get(`http://localhost:8000/auteur/${element}/`)
                                            .then((response)=>{
                                                //console.log(response.data.nom_complet)
                                                auteurs_list += " - "+ response.data.nom_complet;
                                                i++;
                                            })
                                            .then(()=>{
                                                 console.log(auteurs_list)
                                                 this.setState({
                                                    auteurs: auteurs_list
                                                 })
                                            })
                                         });
                                    }catch(err){
                                        console.error(err);
                                    }
                                })
        
    }

    async getAuteurs(){
        return this.state.data_from_document.liste_auteurs
    }



    



    render() {
        return (
            <div>
                <div className="container">
                    <div className="row m-5">
                        <div className="col-md-4">
                            <img src={this.state.data_from_book.url_photo_couverture} className="img-fluid" />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-12 h2">
                                    {this.state.data_from_document.titre}
                                </div>                                    
                                <div className="row">
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Auteur(s):<b> {this.state.auteurs}</b></p>
                                    </div>
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Type:<b> {this.state.data_from_document.type}</b></p>
                                    </div>
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Edition:<b> {this.state.data_from_book.maison_edition}</b></p>
                                    </div>
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Code barre: <b>{this.state.data_from_book.code_barre}</b></p>
                                    </div>
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Stock:<b>{this.state.data_from_book.stock}</b></p>
                                    </div>
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Code emplacement:<b> {this.state.data_from_document.code_emplacement}</b></p>
                                    </div>
                                    <div className="mx-3 col-md-12">
                                       <p className="text-secondary"> Mis en ligne le <b> {this.myDate}</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleBook
