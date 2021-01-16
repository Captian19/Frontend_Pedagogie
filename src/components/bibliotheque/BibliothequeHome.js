import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export class BibliothequeHome extends Component {
    constructor(props){
        super(props)
        this.state = {
            etudiant_mail: "tmouhamet@ept.sn", //Mail de l'eleve a recuperr
            is_inscrit_scolarite: true, //S'il l'etudiant est inscrit
            is_inscrit_bibliotheque: true,  //S'il l'etudiant est inscrit dans la biblio
            etudiant_data:[], //Donnes de l'etudiant
            no_emprunt: true,    //S'il ya pas d'emprut en cours,
            
            //Livre
            input: "",
            type_document:"livre",
            data: [],
            clean_data:[],
            redirect: null,
            one_data:[],
            data_from_book: [],
            data_from_document:[],
            auteurs: "",
            is_loading: true,
            //emprunts:[], //Stocke les emprunts
            array_emprunt_select:[],
            emprunt_size_equal_to_two: false, //Pour verifier si le nombre de livres selectionnes est inferieur a 2
            data_emprunt_selected: [],
            data_document_selected:[],
            idEmpruntPresent: false,
            load_save_emprunt: false
            
        }
        this.getLastEmprunt(this.state.etudiant_mail)
        var myDate ="";
            axios
            .get("http://localhost:9200/bibliotheque/livre_document/_search/?size=12")
            .then((res)=>{
                //data: res.data.hits.hits
                this.setState({
                    data: res.data.hits.hits    

                })
            var data_with_good_url = []
            var i =0
            res.data.hits.hits.forEach(element => {
                axios
                    .get(`http://localhost:8000/livre/${element._source.id}/`)
                    .then((res)=>{
                        var livre_object = {
                            id: element._source.id,
                            titre_document: element._source.document,
                            stock: element._source.stock,
                            maison_edition: element._source.maison_edition,
                            code_barre:element._source.code_barre,
                            data: res.data
                        }
                        data_with_good_url[i] = livre_object ;
                        i++;

                    })
                    .then(()=>{
                        this.setState({
                            clean_data: data_with_good_url
                        })
                    })
            })
            this.setState({
                is_loading: false
            })
            
        })

    }

    /////For single view
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
                                    //console.log(res)
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
                                                 //console.log(auteurs_list)
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


    /////End single view

    handleInputChange = (event)  =>{
        this.setState({
            input: event.target.value
        })
        //console.log(this.state.input)
        const type_document = "livre"
        axios
        .get(`http://localhost:9200/bibliotheque/livre_document/_search?size=20&q=${event.target.value}~4`)
        .then((res)=>{
            this.setState({
                data: res.data.hits.hits    
            })
            //console.log(res.data.hits.hits)
            //console.log(this.state.data)
            var data_with_good_url = []
            var i =0
            res.data.hits.hits.forEach(element => {

                axios
                    .get(`http://localhost:8000/livre/${element._source.id}/`)
                    .then((res)=>{
                        //console.log(res.data)
                        var livre_object = {
                            id: element._source.id,
                            titre_document: element._source.document,
                            stock: element._source.stock,
                            maison_edition: element._source.maison_edition,
                            code_barre:element._source.code_barre,
                            data: res.data
                        }
                        data_with_good_url[i] = livre_object ;
                        //console.log(data_with_good_url)
                        //console.log(element)

                        i++
                        
                    })
                    .then(()=>{
                        this.setState({
                            clean_data: data_with_good_url
                        })
                    })
            });
         

        })

    }

    onClickMore = (event,id_doc) =>{
        this.getInitDataFromBook(id_doc);
    }

   
    ////////////////////////Emprunt////////////////////////   
    id_emprunt_selected_array = []; //Stock les ids cliques
    onClickEmprunter = async (event,id_doc) =>{
        event.preventDefault();
        //console.log(id_doc);     
        this.id_emprunt_selected_array.push(id_doc);
        console.log(this.id_emprunt_selected_array);
        
        //Eviter une duplication
        const resultArr = this.id_emprunt_selected_array.filter((data,index)=>{
            return this.id_emprunt_selected_array.indexOf(data) === index;
          })

          //On met a jour l'array
          this.setState({
              array_emprunt_select: resultArr,
              idEmpruntPresent: true
              
          })
        //Recuperation des donnees correspondates
        var data_selected = []; //contient les donnees
        var data_document= []; //Donnees completes
          resultArr.forEach((current_id)=>{
            const response = axios.get(`http://localhost:8000/livre/${current_id}/`);
            response.then((res)=>{
                //console.log(res.data);
                axios
                     .get(`http://localhost:8000/document/${res.data.document}/`)
                     .then((res2)=>{
                         data_document.push(res2.data)
                         this.setState({
                            data_document_selected: data_document
                         })
                     })
            })
            
          })
          //console.log(data_selected);
        if(resultArr.length>=2 ){
            //On desactive les boutons emprunts
            this.setState({
                emprunt_size_equal_to_two: true
            })
            //console.log(this.state.data_document_selected)  

        }
        console.log(this.state.data_document_selected);
    }

    dataSelected = [];
    onClickAnnnulerSelect = (event,id_doc) =>{
        event.preventDefault();
        console.log(id_doc);
        //console.log(this.state.data_document_selected);
        //var current_data = this.state.data_document_selected;
        var current_data = this.state.data_document_selected;
        var final_data = [];
        var id_selectd = [];
        current_data.forEach((element)=>{
            if(element.id === id_doc){

                if(current_data.length ==2){
                    if(current_data.indexOf(element)===0){
                        if(this.id_emprunt_selected_array.indexOf(element.id)==0){
                            id_selectd.push(this.id_emprunt_selected_array[1])
                            this.id_emprunt_selected_array = [];
                            this.id_emprunt_selected_array = id_selectd;
                            // console.log(this.id_emprunt_selected_array);
                        }else if( this.id_emprunt_selected_array.indexOf(element.id)==1 ){
                            id_selectd.push(this.id_emprunt_selected_array[0])
                            this.id_emprunt_selected_array = [];
                            this.id_emprunt_selected_array = id_selectd;
                            // console.log(this.id_emprunt_selected_array);
                        }
                        final_data.push(current_data[1]);
                        this.setState({
                            data_document_selected: final_data,
                            emprunt_size_equal_to_two:false 
                        })
                    }else if(current_data.indexOf(element==1)){
                        if(this.id_emprunt_selected_array.indexOf(element.id)==1){
                            id_selectd.push(this.id_emprunt_selected_array[0])
                            this.id_emprunt_selected_array = id_selectd;
                            console.log(this.id_emprunt_selected_array);

                        }else if(this.id_emprunt_selected_array.indexOf(element.id)==0){
                            id_selectd.push(this.id_emprunt_selected_array[1])
                            this.id_emprunt_selected_array = id_selectd;
                            console.log(this.id_emprunt_selected_array);

                        }
                        
                        final_data.push(current_data[0]);
                        this.setState({
                            data_document_selected: final_data,
                            emprunt_size_equal_to_two:false 
                        })
                    }
                }else if(current_data.length===1){
                    final_data= [];
                    this.id_emprunt_selected_array = [];
                    this.setState({
                        data_document_selected: final_data,
                        emprunt_size_equal_to_two:false 
                    })
                }

                

            }
        })
        //console.log(this.id_emprunt_selected_array);
        //console.log(this.state.data_document_selected);
       
    }

    onSaveEmprunt = async (event)=>{
        event.preventDefault();
        //Load spinner
        this.setState({
            load_save_emprunt: true
        })
        console.log(this.state.data_document_selected);
        console.log(this.id_emprunt_selected_array);
        //Get user data
        const response = await axios.get(`http://localhost:8000/etudiant_b/?email=${this.state.etudiant_mail}`);
            //console.log(response.data.results[0].nom_complet);

                 const data = {
                    email_emprunteur: this.state.etudiant_mail,
                    type_emprunteur: "etudiant",
                    nom_complet_emprunteur: response.data.results[0].nom_complet,
                    date_emprunt: Date.now(),
                    liste_livres: this.id_emprunt_selected_array,
                    etat: "en_attente"
                };

                console.log(data);
                //console.log(this.id_emprunt_selected_array)

                axios
                    .post("http://localhost:8000/emprunt/",data,{
                        headers: {
                            'Content-Type': 'application/json'
                        }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                    })
                    .then(()=>{
                        document.location.reload(true);
                    })
                    
                   
                this.id_emprunt_selected_array = [];
                // this.setState({
                //     no_emprunt: false
                // })
            //})



        //axios.post("http://localhost:8000/emprunt/",)
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
            idEmpruntPresent: true
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

    render() {
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
                                <button className="btn btn-outline-dark" onClick={(event)=>{this.onClickAnnulerEmprunt(event,this.state.etudiant_mail)}}>
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

        return (
            <div>
                {/* Selected emprunt */}
                <div className="row justify-content-between">
                    
                            <div className="col-*-4 m-2">
                                <div><p className="h4 text-muted">livres sélectionnés: {this.state.data_document_selected.length}</p></div>
                            </div>
                            <div className="col-*-4 m-2">
                                <button className="btn btn-secondary" type="button" data-toggle="modal" data-target="#exampleModals">Panier</button>
                            </div>
    
                </div>
                {/* End selected emprunt */}
                <div></div>
                <div className="container">
                     {/* <form className="m-5" onSubmit={this.submitForm}> */}
                  <div className="form-row justify-content-center">
                      <div className="form-group col-md-7 ">
                          <input type="text" value={this.state.input} onChange={this.handleInputChange}  className="form-control" id="inputCity" placeholder="Rechercher un livre"/>
                      </div>
                     
                  </div>
                  <div className="row justify-content-center">
                      {(this.state.is_loading)?<div className="spinner-grow" role="status"><span class="sr-only">Loading...</span></div>
                        :<div></div>}
                  </div>
                {/* </form>   */}

                <div className="container">
                    <div className="row justify-content-center">
                    {this.state.clean_data.map((item, index) => (
                       <div key={index} onClick={this.clickDiv} className=" zoom col-6 col-sm-4 col-md-3 col-lg-2 col-xl-2 p-4 shadow-lg mb-5 bg-white rounded">
                          {/* <h3>{item._source.id}</h3>
                          <h3>{item._source.titre}</h3> */}
                            <div className="row">
                                <img className="img-fluid rounded card-img-top" src={item.data.url_photo_couverture} />
                            </div>
                            <div className="row textDiv">
                                <p className="text-muted font-weight-bold text-uppercase py-4">{ item.titre_document }</p>
                        </div>
                        <div className="row mt-auto">
                              {/* button modal */}
                         <button type="button"  className="btn btn-secondary" onClick = {(event)=>{this.onClickMore(event,item.id)}} data-toggle="modal" data-target={"#exampleModal"+item.id}>
                                    Détails
                                </button>
                            {/* End button modal */}
                        </div>
                {/* Modal */}
                            <div>                
                                <div className="modal fade" id={"exampleModal"+item.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel"><p className="text-small"> { item.titre_document } </p></h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                        <div className="col-md-4">
                                                <img className="img-fluid rounded card-img-top" src={item.data.url_photo_couverture} />
                                            </div>
                                            <div className="col-md-8">
                                                    <div className="row">
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Auteur(s):<b> {this.state.auteurs}</b></p>
                                                        </div>
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Type:<b> {this.state.data_from_document.type}</b></p>
                                                        </div>
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Edition:<b> {this.state.data_from_book.maison_edition}</b></p>
                                                        </div>
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Code barre: <b>{this.state.data_from_book.code_barre}</b></p>
                                                        </div>
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Stock:<b>{this.state.data_from_book.stock}</b></p>
                                                        </div>
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Code emplacement:<b> {this.state.data_from_document.code_emplacement}</b></p>
                                                        </div>
                                                        <div className="mx-3 col-md-12">
                                                        <p className="text-primary"> Mis en ligne le <b> {this.myDate}</b></p>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div className="modal-footer">
                                        {(this.state.emprunt_size_equal_to_two)
                                        ?<div></div>:
                                        <button className="btn btn-success" onClick = {(event)=>{this.onClickEmprunter(event,item.id)}} data-dismiss="modal">Emprunter</button>
                                        }
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
               {/* End Modal */}
                    
                       </div>
                       
                  ))}
                    </div>
                </div>

                </div>
                {/* Modal for panier */}
                <div>   
                    <div class="modal fade" id="exampleModals" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabels" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabels">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="container">
                                     {this.state.data_document_selected.map((item,index)=>(
                                         <div key={index}>
                                              <div className="row justify-content-between">
                                                    <div className="col-*-6">
                                                        <p className="text-primary">{item.titre}</p>
                                                    </div>
                                                    <div className="col-*-6">
                                                        <button className="btn btn-secondary" onClick = {(event)=>{this.onClickAnnnulerSelect(event,item.id)}} data-dismiss="modal">X</button>
                                                    </div>
                                              </div>
                                         </div>
                                     ))}
                            </div>
                          
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            {(!this.state.idEmpruntPresent)
                                        ?<div></div>:
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={ (event)=>{ this.onSaveEmprunt(event) } }>
                                            Save changes
                                            {(!this.state.load_save_emprunt)?
                                                <div></div>:
                                                <div class="spinner-border spinner-border-sm" role="status">
                                                        <span class="sr-only">Loading...</span>
                                                </div>
                                             }
                                                
                                            </button>
                                        }
                                    
                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* End modal for panier */}
            </div>
        )
    }
}

export default BibliothequeHome


//Aimer, l