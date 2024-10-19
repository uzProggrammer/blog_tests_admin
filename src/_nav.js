import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  // cilBell,
  // cilCalculator,
  // cilChartPie,
  // cilCursor,
  // cilDescription,
  // cilDrop,
  // cilNotes,
  // cilPuzzle,
  cilBook,
  // cilStar,
  cilUser,
  cilChart,
  cilBadge
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Bosh sahifa',
    to: '/dashboard',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Testlar',
  },
  {
    component: CNavItem,
    name: 'Testlar',
    to: '/tests',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Blok testlar',
    to: '/blog-tests',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Foydalanuvchilar',
  },
  {
    component: CNavItem,
    name: 'Foydalanuvchilar',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Guruhlar',
    to: '/groups',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Xabarlar',
  },
  {
    component: CNavItem,
    name: 'E\'tirozlar',
    to: '/feedbacks',
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
  },
  
]

export default _nav
