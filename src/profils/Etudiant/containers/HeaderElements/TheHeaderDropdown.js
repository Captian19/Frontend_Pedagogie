import React, { Component } from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import avatar from './../../../../assets/img/avatar.png'
import {connect} from "react-redux"
import {logout} from "./../../../../actions/auth"

class TheHeaderDropdown extends Component{
  render(){
    return (
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={this.props.user.photo ? this.props.user.photo : avatar}
              className="c-avatar-img"
              alt={this.props.user.email}
            />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Compte</strong>
          </CDropdownItem>
          <CDropdownItem to="/admin/profil">
            <CIcon name="cil-user" className="mfe-2" />Profil
          </CDropdownItem>
          <CDropdownItem>
            <CIcon name="cil-settings" className="mfe-2" /> 
            Historique
          </CDropdownItem>
          <CDropdownItem divider />
          <CDropdownItem onClick={this.props.logout} >
            <CIcon name="cil-lock-locked" className="mfe-2"/> 
            Deconnexion
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps,{logout})(TheHeaderDropdown)
