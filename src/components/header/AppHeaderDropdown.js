import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar9 from './../../assets/images/avatars/9.jpg'

import { ImagesURL } from '../../api'

import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  let user = localStorage.getItem('user');
  let navigate = useNavigate()
  if(!user){
    navigate('/login')
    return (
      <>
        Avval tizimga kiring!
      </>
    )
  }
  else{
    user = JSON.parse(user)
    return (
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={user.image?ImagesURL+user.image:avatar9} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem href={"#/users/"+user.username}>
            <CIcon icon={cilUser} className="me-2" />
            Profil
          </CDropdownItem>
          <CDropdownItem href={"#/users/"+user.username}>
            <CIcon icon={cilSettings} className="me-2" />
            sozlamalar
          </CDropdownItem>
          
          <CDropdownDivider />
          <CDropdownItem href="#/logout">
            <CIcon icon={cilLockLocked} className="me-2" />
            Tizimdan chiqish
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

export default AppHeaderDropdown
