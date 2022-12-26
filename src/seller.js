
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Registration from "./components/Registration";
//  import Login from "./components/Login";
// import MyProfile from "./components/MyProfile";
// import ProtectedRoutes, { ProtectedLogin } from "./components/ProtectedRoutes";
// // import loginpage from "./components/reactBootstrap/loginpage";
// import { Toaster } from "react-hot-toast";
// import CompanyData from "./components/CompanyData";
// import ResetPassword from "./Opearations/ResetPassword";
// import VerifyMail from "./Opearations/VerifyMail";
// import ProductList from "./Product/ProductList";
// import AddProductModal from "./Product/AddProductModal";
// import GetSingleProduct from "./Product/GetSingleProduct";

// export default function seller(){
// return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/auth/login" />} />


//         <Route element={<ProtectedRoutes />}>
//           <Route path="myProfile" element={<MyProfile />} />
//           <Route path="companyData" element={<CompanyData />} />
//           <Route path="/auth/verify-email" element={<VerifyMail />} />

//           <Route path="product">
//             <Route path="list" element={<ProductList />} />
//             <Route path="addProduct" element= {<AddProductModal />} />
//             <Route path="getProduct" element={<GetSingleProduct />} />
//           </Route>

//         </Route>

//         <Route element={<ProtectedLogin />}>

//           <Route path="auth">
//             <Route path="registration" element={<Registration />} />
//             <Route path="login" element={<Login />} />
//             <Route path="/auth/reset-password" element={<ResetPassword />} />

//           </Route>


//         </Route>


//         <Route path="*" element={<div> <h1 style={{textAlign:"center"}}>Wrong Component rendered</h1></div>} />
//       </Routes>
//     <Toaster position="top-center" reverseOrder={false} />
//     </BrowserRouter>

//     // <div>
//     //   <loginpage />
//     // </div>

//   );
// }