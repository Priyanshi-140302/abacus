// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../assets/images/abacusLogo.png';

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     password: '',
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [formErrors, setFormErrors] = useState({});

//   // Handle text input change
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setFormErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   // Handle image upload
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64Image = reader.result;
//       setImagePreview(base64Image);
//       localStorage.setItem('faceImage', base64Image); // ✅ store face reference
//     };
//     reader.readAsDataURL(file);
//   };

//   // Validate inputs
//   const validate = () => {
//     const errors = {};
//     if (!formData.name.trim()) errors.name = 'Name is required';
//     if (!formData.username.trim()) errors.username = 'Email is required';
//     if (!formData.password.trim()) errors.password = 'Password is required';
//     if (!imagePreview) errors.image = 'Face image is required';

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     alert('Signup successful! Now use face recognition to log in.');
//     navigate('/face-recoginition');
//   };

//   return (
//     <div className="main-container login-page">
//       <div className="container-fluid">
//         <div className="container">
//           <div className="row">
//             <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto pt-5">
//               <div className="text-center">
//                 <img src={Logo} alt="Logo" className="my-5" />
//                 <h1 className="text-white mb-4">Sign Up</h1>
//                 <div className="text-start">
//                   <form onSubmit={handleSubmit}>
//                     {/* Name */}
//                     <div className="mb-3">
//                       <input
//                         type="text"
//                         name="name"
//                         className="form-control form-control-lg text-white bg-transparent border-0 border-bottom shadow-none rounded-0"
//                         placeholder="Full Name"
//                         value={formData.name}
//                         onChange={handleInput}
//                       />
//                       {formErrors.name && (
//                         <small className="text-danger">{formErrors.name}</small>
//                       )}
//                     </div>

//                     {/* Email */}
//                     <div className="mb-3">
//                       <input
//                         type="email"
//                         name="username"
//                         className="form-control form-control-lg text-white bg-transparent border-0 border-bottom shadow-none rounded-0"
//                         placeholder="Email"
//                         value={formData.username}
//                         onChange={handleInput}
//                       />
//                       {formErrors.username && (
//                         <small className="text-danger">{formErrors.username}</small>
//                       )}
//                     </div>

//                     {/* Password */}
//                     <div className="mb-3 position-relative">
//                       <input
//                         type={showPassword ? 'text' : 'password'}
//                         name="password"
//                         className="form-control form-control-lg text-white bg-transparent border-0 border-bottom shadow-none rounded-0"
//                         placeholder="Password"
//                         value={formData.password}
//                         onChange={handleInput}
//                       />
//                       <button
//                         type="button"
//                         className="border-0 bg-transparent position-absolute top-0 end-0"
//                         onClick={() => setShowPassword((prev) => !prev)}
//                       >
//                         <i
//                           className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-white`}
//                           style={{ margin: '15px' }}
//                         ></i>
//                       </button>
//                       {formErrors.password && (
//                         <small className="text-danger">{formErrors.password}</small>
//                       )}
//                     </div>

//                     {/* Image Upload */}
//                     <div className="mb-3">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="form-control"
//                         onChange={handleFileChange}
//                       />
//                       {formErrors.image && (
//                         <small className="text-danger">{formErrors.image}</small>
//                       )}
//                       {imagePreview && (
//                         <div className="mt-2">
//                           <img
//                             src={imagePreview}
//                             alt="Preview"
//                             width="100"
//                             height="100"
//                             className="rounded border"
//                           />
//                         </div>
//                       )}
//                     </div>

//                     {/* Submit */}
//                     <button
//                       type="submit"
//                       className="btn btn-login btn-lg w-100 rounded-pill fw-semibold mb-4"
//                     >
//                       Register
//                     </button>

//                     <p className="text-white text-center">
//                       Already registered? <a href="/login">Login here</a>
//                     </p>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>  
//     </div>
//   );
// };

// export default Signup;
