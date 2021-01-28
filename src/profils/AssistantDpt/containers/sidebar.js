import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import { connect } from "react-redux";

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './menu'
import photo from "./../../../assets/img/ent5.png";
import photo2 from "./../../../assets/img/ent_mini.png";

import immersion from '../../Enseignant/containers/immersion'

const Sidebar = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.layout.sidebarShow)

  return (
    <CSidebar show={show}
    onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}>
      <CSidebarBrand className="d-md-down-none" to="/">
        <img src={photo} className="c-sidebar-brand-full" />
        <img src={photo2} className="c-sidebar-brand-minimized img-fluid" />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
         {props.role.find(
          (role) =>
            (role.role_type === "CHEF_DE_DEPARTEMENT" || role.role_type === "ASSISTANT_CHEF_DEPARTEMENT") &&
            role.departement == "GIT"
        ) && (
          <CCreateElement
            items={immersion}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle,
            }}
          />
        )}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

// export default React.memo(Sidebar)
const MapToState = (state) => ({
  role: state.auth.user.CurrentRoles,
  user: state.auth.user
});

export default connect(MapToState, null)(Sidebar);
