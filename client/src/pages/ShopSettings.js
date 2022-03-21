import React, {useState} from 'react';

const blank = {
    shopname: '',
    description: ''
};

const ShopSettings = (props) => {
    const [formData, setFormData] = useState(blank);
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        let updatedShop = {
            shopname: formData.shopname,
            description: formData.description
        }
        let route = `/sellers/${props.seller.sellerid}`;
         console.log(route, "route")
        props.updateShopCB(updatedShop, route);
        setFormData(blank);
      }
    
      function handleChange(event) {
        let { name, value } = event.target;
        setFormData(data => ({
          ...data,
          [name]: value
        }));
      }

      //handlesubmit for file upload form
      function handleUpload(event) { 
        event.preventDefault();
      
        let formData = new FormData();
        formData.append('myfile', file, file.name);

        props.uploadCb(formData);
        setFile(null);
        event.target.reset();
    }
    
      //handlechange for file upload form
      function handleFileChange(event) {
        setFile(event.target.files[0]);
      }

    return (
      <div>
      <form className="row" onSubmit={handleSubmit}>
          <div className="offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className="UpdateShopForm">
          <label className="form-label">Shop Name</label>
          <input type="text"
                 name="shopname"
                 value={formData.shopname}
                 className="form-control"
                 onChange={handleChange}
                />

          <label className="form-label">Shop Description</label>
          <input type="text"
                 name="description"
                 value={formData.description}
                 className="form-control"
                 onChange={handleChange}
                />
              </div>
  
              <div>
                <button type="submit" className="btn btn-primary formbutton">Update</button>
              </div>
  
              </div>
          </form>

          {/* <div className="UploadForm">
            <form onSubmit={handleUpload}>
              <label>
                File
              </label>
              <input
              type="file"
              value={picurl}
              onChange={handleFileChange}
              required
              />
              <button type="submit"></button>
            </form>
          </div> */}

          </div>
  )
}

export default ShopSettings;