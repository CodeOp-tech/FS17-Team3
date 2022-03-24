import React, { useState } from "react";
import UploadForm from "../components/UploadForm";

const blank = {
     shopname: "",
     description: "",
};

const ShopSettings = (props) => {
     const [formData, setFormData] = useState(blank);

     const handleSubmit = (event) => {
          event.preventDefault();
          let updatedShop = {
               shopname: formData.shopname,
               description: formData.description,
          };
          let route = `/sellers/${props.seller.sellerid}`;
          console.log(route, "route");
          props.updateShopCB(updatedShop, route);
          setFormData(blank);
     };

     function handleChange(event) {
          let { name, value } = event.target;
          setFormData((data) => ({
               ...data,
               [name]: value,
          }));
     }

     async function uploadProfile(fd) {
          let options = {
               method: "PATCH",
               body: fd,
          };

          try {
               let response = await fetch(
                    `sellers/profile/${props.seller.sellerid}`,
                    options
               );
               if (response.ok) {
                    let data = await response.json();
                    props.setProfileFile(data);
               } else {
                    console.log(
                         `Server error: ${response.status}: ${response.statusText}`
                    );
               }
          } catch (err) {
               console.log(`Network error:${err.message}`);
          }
     }

     async function uploadCover(fd) {
          let options = {
               method: "PATCH",
               body: fd,
          };

          try {
               let response = await fetch(
                    `sellers/cover/${props.seller.sellerid}`,
                    options
               );
               if (response.ok) {
                    let data = await response.json();
                    props.setCoverFile(data);
               } else {
                    console.log(
                         `Server error: ${response.status}: ${response.statusText}`
                    );
               }
          } catch (err) {
               console.log(`Network error:${err.message}`);
          }
     }

     return (
          <div>
               <form className="row" onSubmit={handleSubmit}>
                    <div className="offset-md-2 col-md-8 offset-lg-3 col-lg-6">
                         <div className="UpdateShopForm">
                              <label className="form-label">Shop Name</label>
                              <input
                                   type="text"
                                   name="shopname"
                                   value={formData.shopname}
                                   className="form-control"
                                   onChange={handleChange}
                              />

                              <label className="form-label">
                                   Shop Description
                              </label>
                              <input
                                   type="text"
                                   name="description"
                                   value={formData.description}
                                   className="form-control"
                                   onChange={handleChange}
                              />
                         </div>

                         <div>
                              <button
                                   type="submit"
                                   className="btn btn-primary formbutton"
                              >
                                   Update
                              </button>
                         </div>
                    </div>
               </form>

               <UploadForm
                    uploadProfileCb={(fd) => uploadProfile(fd)}
                    uploadCoverCb={(fd) => uploadCover(fd)}
               />
          </div>
     );
};

export default ShopSettings;
