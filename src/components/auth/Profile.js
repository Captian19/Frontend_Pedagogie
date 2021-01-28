import React,{useState} from "react"
import {useForm} from "react-hook-form";
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";

import {connect} from "react-redux"
import avatar from './../../assets/img/avatar.png';
import {modifyProfil} from "../../actions/auth";
 

const Profile = (props) => {
  const {register, handleSubmit} = useForm() 
  
  const onSubmit = data => {  
    let form_data=new FormData();
    form_data.append('photo',image.raw,image.raw.name);
    form_data.append('bio',data.bio);
    form_data.append('telephone',data.telephone);
    form_data.append('adresse',data.adresse);

    props.modifyProfil(form_data,props.user.id);
};  

  const [image,setImage]=useState({preview:"",raw:""});

  const handleImageChange=e=>{
    if(e.target.files.length){
      setImage({
        preview:URL.createObjectURL(e.target.files[0]),
        raw:e.target.files[0]
      });
    }
  };
 
  const fileStyle={
    display:'none'
  }

   

  return(
        <Row>
          <Col md="4">
            <div className="container shadow mb-2">
              <div className="row">
                <div className="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 col-12 profile-header"></div>
                    </div>
                    <div className="row user-detail">
                        <div className="col-lg-12 col-sm-12 col-12">
                           <img src={(image.preview)?(image.preview):avatar } alt="picture" class="rounded-circle img-thumbnail"/>
                            <h5 className="mt-2 mb-2">{props.user.first_name} {props.user.last_name}</h5>
                            <p><i className="fa fa-map-marker" aria-hidden="true"></i> {props.user.adresse}</p>

                            <hr /> 
                            <label htmlFor="picture" className="btn btn-success btn-sm">Modifier photo</label>
                            <input
                                  type="file"  
                                  accept="image/*"
                                  id="picture"
                                  name="photo"
                                  form="myform"
                                  style={fileStyle}
                                  onChange={handleImageChange}
                                  ref={register}
                                  />  
                            <hr />
                            <span>{props.user.bio}</span>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="container-fluid shadow py-2">
              <div className="row">
              <div className="col-12">
                <ul class="list-group">
                  {props.user.CurrentRoles.map(role => {
                    return <li class="list-group-item active">{role.role_type} {role.classe} {role.departement} <small className="float-right">{role.annee}</small></li>
                  })}
                  <hr></hr>
                  {props.user.AllRoles.map(role => {
                    return <li class="list-group-item">{role.role_type} {role.classe} {role.departement} <small className="float-right">{role.annee}</small></li>
                  })}
                </ul>
              </div>
              </div>
            </div>
            </Col>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Mon profil</h5>
                </CardHeader>
                <CardBody>
                  <Form id="myform" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Prénom</label>
                          <Input
                            defaultValue={props.user.first_name}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Nom
                          </label>
                          <Input
                            defaultValue={props.user.last_name}
                            disabled
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            type="text"
                            defaultValue={props.user.email}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="2">
                        <FormGroup>
                          <label>Sexe</label>
                          <Input
                            type="text"
                            defaultValue={props.user.sexe}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="5">
                        <FormGroup>
                          <label>Telephone</label>
                          <Input
                            defaultValue={props.user.telephone}
                            type="text"
                            name="telephone"
                            innerRef={register({required:true})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Adresse</label>
                          <Input
                            defaultValue={props.user.adresse}
                            name="adresse"
                            type="text"
                            innerRef={register({required:true})}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Bio</label>
                          <Input
                            cols="80"
                            defaultValue=""
                            rows="4"
                            type="textarea"
                            name="bio"
                            innerRef={register}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <button type="submit" className="btn btn-primary mt-2">Enregistrer</button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row> 
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps,{modifyProfil})(Profile)