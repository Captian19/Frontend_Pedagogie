import React, { Component } from "react"
import {useForm} from "react-hook-form";
import {
    Button,
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
import avatar from './../../../assets/img/avatar.png'

const Profile = (props) => {
  const {updateProfil, handleSubmit} = useForm()

  const onSubmitPhoto = data => {
    console.log(data);
  }

  return(
        <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Mon profil</h5>
                </CardHeader>
                <CardBody>
                  <Form>
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
                            ref={updateProfil}
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
                            type="text"
                            ref={updateProfil}
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
                            ref={updateProfil}

                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <button className="btn btn-primary mt-2">Enregistrer</button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
            <div class="container shadow">
              <div class="row">
                <div class="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 col-12 profile-header"></div>
                    </div>
                    <div class="row user-detail">
                        <div class="col-lg-12 col-sm-12 col-12">
                            <img src={avatar} class="rounded-circle img-thumbnail" />
                            <h5 className="mt-2 mb-2">{props.user.first_name} {props.user.last_name}</h5>
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i> {props.user.adresse}</p>

                            <hr />
                            <a href="#" class="btn btn-success btn-sm">Modifier Photo</a>

                            <hr />
                            <span>{props.user.bio}</span>
                        </div>
                    </div>
                    <div class="row user-social-detail">
                        <div class="col-lg-12 col-sm-12 col-12">
                            <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            </Col>
          </Row> 
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps,null)(Profile)