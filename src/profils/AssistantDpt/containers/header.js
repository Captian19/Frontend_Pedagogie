import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {connect} from "react-redux";
// routes config
import routes from './../routes'

import { 
  TheHeaderDropdown,
}  from './HeaderElements/index'

const Header = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.layout.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none">
        <h5>ESPACE NUMERIQUE DE TRAVAIL</h5>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
        <CHeaderNavLink><b><CIcon name="cil-user" height={15}/> Assistant Chef Département</b></CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <span className="py-2">{props.user.first_name} {props.user.last_name}</span>
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/assistant-departement/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard"/>&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" to="/assistant-departement/profil">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Mon profil
            </CLink>
          </div>
      </CSubheader>
    </CHeader>
  )
}

const mapStateTopProps = state => ({
  user:state.auth.user
})

export default connect(mapStateTopProps,null)(Header)
