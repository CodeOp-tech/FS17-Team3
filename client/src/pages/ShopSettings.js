import React, {useState} from 'react';

const blank = {
    shopname: '',
    description: ''
};

const ShopSettings = (props) => { //need to include the sql helper?
    const [formData, setFormData] = useState(blank);

    const handleSubmit = (event) => {
        event.preventDefault();
        let updatedShop = {
            shopname: formData.shopname,
            description: formData.description
        }
        let route = `/sellers/${props.seller.sellerid}`;
         // was /sellerid before but then added /sellers
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
          </div>
  )
}

export default ShopSettings;