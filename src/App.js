// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// import Nav from './Common/Nav';
import AllBlogs from './Pages/AllBlogs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesPage from './Pages/ServicesPage';
import CoursesPage from './Pages/CoursesPage';
import TeamPages from './Pages/TeamPages';
import Testimonialspage from './Pages/Testimonialspage';
import BlogDetailsPage from './Pages/BlogDetailsPage';
import CategoryDetailsPage from './Pages/CategoryDetailsPage';
import Reg from './Accounts/Reg';
import Login from './Accounts/Login';
import ContactUsPage from './Pages/ContactUsPage';
import HomePage from './Pages/HomePage';
import UpdatePasswordPage from './Pages/UpdatePasswordPage';
import { check_token } from './Redux/AuthSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';



function App() {

  const dispatch = useDispatch()

  const PrivateRoute = ({children})=>{
    const token = localStorage.getItem("token") || sessionStorage.getItem("token")
    return token!== null && token!== undefined && token!=="" ? (
      children
    ) : (
      <Navigate to="/login" />
    )
  }

  const PublicRoute = [
    {path : "/", component : <HomePage /> },
    {path : "/allservices", component : <ServicesPage /> },
    {path : "/teams", component : <TeamPages /> },
    {path : "/testimonials", component : <Testimonialspage /> },
    {path : "/reg", component : <Reg /> },
    {path : "/login", component : <Login /> },
    {path : "/contact", component : <ContactUsPage /> },
  ]

  const ProtectedRoute = [
    {path : "/allblogs", component : <AllBlogs /> },
    {path : "/allcourses", component : <CoursesPage /> },
    {path : "/blogdetails/:id", component : <BlogDetailsPage /> },
    {path : "/catgerorypost/:id", component : <CategoryDetailsPage /> },
    {path : "/updatepassword", component : <UpdatePasswordPage /> },

  ]
  
  // 6640abc5b6df563b98d0d2c0

  useEffect(() => {
    dispatch(check_token())
  }, [])



  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // theme="colored"
      />

      <Router>
        <Routes>
          {/* <Route path='/' element={<AllBlogs />} /> */}
          {
            PublicRoute.map((item,index)=>{
              return (
                
                  <Route key={index} path={item.path} element={item.component} />
                
              )
            })
          }
          {
            ProtectedRoute.map((item,index)=>{
              return (
                
                  <Route key={index} path={item.path} element={<PrivateRoute> {item.component} </PrivateRoute>} />
                
              )
            })
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;



