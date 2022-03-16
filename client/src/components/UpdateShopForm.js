import React, {useState} from 'react'

// get seller from local storage.

const blank = {
    shopname: " "
};

function UpdateShopForm(props) {
    const [formData, setFormData] = useState(blank);

    function handleSubmit(event) {
      event.preventDefault();
    //   props.updateShopDataCb(formData);
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
            </div>

            <div>
              <button type="submit" className="btn btn-primary formbutton">Update</button>
            </div>

            </div>
        </form>
        </div>
  )
}

export default UpdateShopForm;


