// //packages
// import React, { useState, useEffect, useContext, useRef } from "react"
// import { UserContext } from "../UserContext"
// import { ActivitiesContext } from "../ActivitiesContext"
// import { useNavigate } from "react-router-dom"


// function NewActivity() {

//   const { user } = useContext(UserContext)
//   const { activities, setActivities } = useContext(ActivityContext)

//   const [selectedImage, setSelectedImage] = useState(null)

//   const navigate = useNavigate()
//   const imageUpload = useRef()

//   const [title, setTitle] = useState("")
//   const [neighborhood, setNeighborhood] = useState("")
//   const [cost, setCost] = useState("")
//   const [address, setAddress] = useState("")
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [website, setWebsite] = useState("")
//   const [errors, setErrors] = useState([])


//   function handlePostSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', selectedImage)
//     formData.append('title', title)
//     formData.append('neighborhood', neighborhood)
//     formData.append('cost', cost)
//     formData.append('address', address)
//     formData.append('phoneNumber', phoneNumber)
//     formData.append('website', website)

//     console.log(formData)
//     fetch("/activities", {
//       method: "POST",
//       body: formData
//     })
//     window.location.href = "/activities"
//   }

//   return (
//     <div className="no-clue">
//       <div className="no-clue-2">
//         <form onSubmit={handlePostSubmit}>
//           <div className="no-clue-3">
//             <input type="file"
//               onChange={e => setSelectedImage(e.target.files[0])}
//               ref={imageUpload}
//               accept="image/png, image/jpeg"
//             />
//           </div>
//           <div>
//             <div>
//               <textarea
//                 placeholder="Add title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div>
//               <button type="submit">Post</button>
//             </div>
//             <div>
//               {errors?.map((err) => (
//                 <ul key={err}
//                   className=""
//                 >
//                   Error: {err}
//                 </ul>
//               ))}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default NewActivity;