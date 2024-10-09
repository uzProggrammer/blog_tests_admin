import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
