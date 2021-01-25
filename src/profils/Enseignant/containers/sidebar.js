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

import CIcon from '@coreui/icons-react'
import photo from "./../../../assets/img/ent5.png";
import photo2 from "./../../../assets/img/ent_mini.png";
// sidebar nav config
import navigation from './menu'

const Sidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

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
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default Sidebar
