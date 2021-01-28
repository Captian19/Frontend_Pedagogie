import React, { Component } from 'react'
import SearchResults from 'react-filter-search';
import Select from 'react-select';
import axios from 'axios';
import './livreStyle.css'
import {Animated} from "react-animated-css";
import { connect } from "react-redux";


export class Livres extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            value:'',
            number_of_item: 24,
            filtered_data: [],
            options: [],
            is_inscrit_scolarite: true, //S'il l'etudiant est inscrit
            is_inscrit_bibliotheque: true,
            emprunt_size_equal_to_two: false,
            emprunts:[],
            emprunt_id: [],
            emprunts_data: [],
            no_emprunt: true,    //S'il ya pas d'emprut en cours,
            idEmpruntPresent: false,
            is_load: true,
            load_save_emprunt: false,
            current_author: ""

        }
        this.getLastEmprunt(this.props.user.email)

        
    }

    options = [];

    componentWillMount(){
        const response = axios.get("http://localhost:8000/livre/");
        console.log(response);
        response.then((res)=>{
            //console.log(res.data.results)
            this.setState({
                data: res.data.results,
                filtered_data: res.data.results
            })
            
            var cur_options = [{value:"Toutes catégories",label:"Toutes catégories"}];
           
            res.data.results.forEach(element => {
                axios
                    .get(`http://localhost:8000/categorie/?id=${element.categorie[0]}`)
                    .then((res)=>{
                        cur_options.push({
                            value: res.data.results[0].nom,
                            label: res.data.results[0].nom
                        }) 
                    })
                
            });
            

            this.setState({
                options: cur_options,
                is_load: false
            
            })
            
        })


        
    }

    handleSelectChangeCategory = async (event) =>{
        if(event.value === "Toutes catégories"){
            const { data } = this.state;
            this.setState({
                filtered_data: data
            })
        }else{
            console.log(event.value)
            var id_category;
            const response = axios.get(`http://localhost:8000/categorie/?nom=${event.value}`)
            response.then((res)=>{
                console.log(res.data.results[0].id)
                var filtered_data = [];
                this.state.filtered_data.forEach((element)=>{
                    element.categorie.forEach((id_cat)=>{
                        if(id_cat === res.data.results[0].id){
                            filtered_data.push(element);
                        }
                    })
                })
                this.setState({
                    filtered_data: filtered_data
                },()=>{})
            })
            
        }

    }

    

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    emprunts = [];

    

    onClickEmprunter = async (event,id_doc) =>{
        event.preventDefault();
       if(this.emprunts.length < 2){
            console.log(id_doc)
            this.emprunts.push(id_doc);
            
            this.emprunts = this.emprunts.filter((data,index)=>{
                return this.emprunts.indexOf(data) === index;
            })
            
            
            console.log(this.emprunts)
            this.setState({
                emprunts: this.emprunts
            },()=>{
                
            })

            var current_empt_data = [];
            this.emprunts.forEach((element)=>{
                axios
                    .get(`http://localhost:8000/livre/?id=${element}`)
                    .then((res)=>{
                        current_empt_data.push(res.data.results[0])
                        this.setState({
                            emprunts_data: current_empt_data
                        },()=>{

                        })
                    })
            })
       }else{
           this.setState({
               emprunt_size_equal_to_two: true
           },()=>{

           })
       }
    }

    onClickAnnnulerSelect = (event,id_doc) =>{
        event.preventDefault();
        //console.log(id_doc);
        var index ;
        var arr = [];
       for(var i=0; i< this.emprunts.length ; i++){
            if(this.emprunts[i]===id_doc){
                index = i;
            }
       }

       console.log("index "+index);
       var arr_final =[]
       var arr = [];
       if(this.emprunts.length ===2){
            if(index ===0){
                arr_final.push(this.state.emprunts_data[1])
                arr.push(this.emprunts[1])
            }else if(index==1){
                arr_final.push(this.state.emprunts_data[0])
                arr.push(this.emprunts[0])

            }

            this.emprunts = arr;
            this.setState({
                emprunts_data: arr_final,
                emprunt_size_equal_to_two: false
            },()=>{
                console.log(this.emprunts)
                console.log(this.state.emprunts_data)
            })
            
       }else if(this.emprunts.length ===1){
        this.emprunts = arr_final;
        this.setState({
            emprunts_data: arr_final,
            emprunt_size_equal_to_two: false

        },()=>{
            console.log(this.emprunts);
            console.log(this.state.emprunts_data)
        })
       

       }
       

    }

    onSaveEmprunt = async (event)=>{
        const response = await axios.get(`http://localhost:8000/etudiant_b/?email=${this.props.user.email}`);

             const data = {
                email_emprunteur: this.props.user.email,
                type_emprunteur: "etudiant",
                nom_complet_emprunteur: response.data.results[0].nom_complet,
                date_emprunt: Date.now(),
                etat: "en_attente",
                liste_livres: this.emprunts
                
            };
            console.log(data);
            axios
            .post("http://localhost:8000/emprunt/",data,{
                headers: {
                    'Content-Type': 'application/json'
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            })
            .then(()=>{
                document.location.reload(true);
            })
    }

    getLastEmprunt= async (email)=>{
        const response = await axios.get(`http://localhost:8000/emprunt/?email_emprunteur=${email}`);
        console.log(response.data.results.lastItem);
        
        if(response.data.results.length !==0){
            if(response.data.results.lastItem.etat === "en_attente"){
                this.setState({
                    no_emprunt: false
                })
            }
        }
    }

    onClickAnnulerEmprunt = async (event,email)=>{
        this.setState({
            idEmpruntPresent: true,
            load_save_emprunt: true
        })
        const response = await axios.get(`http://localhost:8000/emprunt/?email_emprunteur=${email}`);
        const id = response.data.results.lastItem.id;
        console.log(id);
        axios
            .delete(`http://localhost:8000/emprunt/${id}/`)
            .then(()=>{
                console.log("Element supprime avec succes");
                document.location.reload(true);
                
            })
    }

    onClickView = async (event,id)=>{
        // event.preventDefault();
        // console.log("id is:"+id);
        // const response = await axios.get(`http://localhost:8000/livre/?id=${id}`)
        // var auteurs = "";
        // console.log(response)

        // response.data.results[0].liste_auteurs.forEach((element)=>{
        //     // auteurs += " --- " + element
        //     // this.setState({
        //     //     current_author: auteurs
        //     // })
        //     // console.log(element)
        //     axios.get(``)
        // })
       
    }

    render() {

        if(this.state.is_load){
            return (
                <div className="row justify-content-center">
                    <div class="spinner-grow" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }

        if(!this.state.is_inscrit_scolarite){
            return (
                <div>
                    <div className="container text-center">
                        <p className="text-primary h4">Veuillez-vous inscrire au niveau de la scolarité</p>
                    </div>
                </div>
            )
        }

        if(!this.state.is_inscrit_bibliotheque){
            return (
                <div>
                    <div className="container text-center">
                        <p className="text-primary h4">Veuillez-vous inscrire au niveau de la bibliothéque</p>
                    </div>
                </div>
            )
        }

        if(!this.state.no_emprunt){
            return (
                <div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center">
                                <p className="text-dark h4">Vous avez un emprunt en cours</p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div >
                                <button className="btn btn-outline-dark" onClick={(event)=>{this.onClickAnnulerEmprunt(event,this.props.user.email)}}>
                                    Annuler l'emprunt
                                    {(!this.state.load_save_emprunt)?
                                                <div></div>:
                                                <div class="spinner-border spinner-border-sm" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                </div>
                                             }
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }


        const { filtered_data, value } = this.state;

        return (
            <div>
              {/* {this.props.user.email} */}

               {this.emprunts.length > 0 &&
                    <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                     <button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">
                        Panier
                    </button>
                    </Animated>
                   
                }


                <div className="container">
                        <div className="row m-5">
                            <div className="col-md-8 col-sm-6 col-lg-8 col-12">
                                <input type="text" value={value} onChange={this.handleChange}  className="form-control" id="inputCity" placeholder="Rechercher un livre"/>
                            </div>

                            <div className="col-md-4 col-sm-6 col-lg-4 col-12">
                                    <Select options={this.state.options} onChange = { this.handleSelectChangeCategory } />
                            </div>
                        
                        </div>

                    <div >
                            <SearchResults
                                value={value}
                                data={filtered_data}
                                renderResults={results => (
                                <div className="row justify-content-center">
                                    {results.slice(0,this.state.number_of_item).map(el => (
                                    
                                        <div className="col-md-4 col-sm-6 col-lg-3 col-6 my-3">
                                            <div className="card cardSize shadow">
                                                    <div className="inner">
                                                        <a  type="button"  data-toggle="modal" data-target={"#exampleModal"+el.id} onClick = {(event)=>{this.onClickView(event,el.id)}}>
                                                            <img className="cardImgTop" src={el.photo_couverture} alt="Image"/>
                                                        </a>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="divSize">
                                                            <p className="card-text">{ el.titre_propre }</p>
                                                        </div>
                                                    </div>
                                            </div>
                                            {/* Modal */}
                          
                                                <div className="modal fade" id={"exampleModal"+el.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">{ el.titre_propre }</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
            
                                                        {/* Modal Body */}
                                                        <div className="row">
                                                                <div className="col-md-4">
                                                                        <img className="img-fluid rounded card-img-top" src={el.photo_couverture} />
                                                                </div>
                                                                <div className="col-md-8">
                                                                        <div className="row">
                                                                            <div className="mx-3 col-md-12">
                                                                            <p className="text-primary"> Auteur(s):<b> {this.state.current_author} </b></p>
                                                                            </div>
                                                                            <div className="mx-3 col-md-12">
                                                                             <p className="text-primary"> Edition:<b> {el.editeur}</b></p>
                                                                            </div>
                                                                            <div className="mx-3 col-md-12">
                                                                             <p className="text-primary"> Année édition:<b> {el.annee_edition}</b></p>
                                                                            </div>
                                                                            <div className="mx-3 col-md-12">
                                                                                <p className="text-primary"> ISBN: <b>{el.isbn}</b></p>
                                                                            </div>
                                                                            <div className="mx-3 col-md-12">
                                                                                <p className="text-primary"> Stock:<b>{el.stock}</b></p>
                                                                            </div>
                                                                            <div className="mx-3 col-md-12">
                                                                                <p className="text-primary"> Code emplacement:<b> {el.code_emplacement}</b></p>
                                                                            </div>
                                                                             
                                                                        </div>
                                                                </div>
                                                            </div>

                                                            {/* Description */}
                                                                <div className="row">
                                                                    <div id="accordion">
                                                                        <div class="card">
                                                                            <div class="card-header" id="headingOne">
                                                                            <h5 class="mb-0">
                                                                                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                                Description
                                                                                </button>
                                                                            </h5>
                                                                            </div>

                                                                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                                            <div class="card-body">
                                                                                {el.description}
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            {/* End description */}
                                                        {/* End modal body */}
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                            {(this.state.emprunt_size_equal_to_two)
                                                                ?<div></div>:
                                                                <button className="btn btn-success" onClick = {(event)=>{this.onClickEmprunter(event,el.id)}} data-dismiss="modal">Emprunter</button>
                                                            }
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            {/* End Modal */}
                                        </div>
                                        
                                    
                                    ))}
                                </div>
                                )}
                            />

                            
                    </div>
                </div>
                {/* Liste emprunts */}
                
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                        {this.state.emprunts_data.map((item,index)=>(
                                         <div key={index}>
                                              <div className="row justify-content-between">
                                                    <div className="col-*-6">
                                                        <p className="text-primary">{item.titre_propre}</p>
                                                    </div>
                                                    <div className="col-*-6">
                                                        <button className="btn btn-light" onClick = {(event)=>{this.onClickAnnnulerSelect(event,item.id)}} data-dismiss="modal">X</button>
                                                    </div>
                                              </div>
                                         </div>
                                     ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-light" data-dismiss="modal" onClick={ (event)=>{ this.onSaveEmprunt(event) } }>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
                {/* Liste emprunts */}
            </div>
          );
    }
}



const mapStateToProps = state => ({
    user: state.auth.user
  })
export default connect(mapStateToProps,null)(Livres);