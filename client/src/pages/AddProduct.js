import React, {useState} from 'react';

const blank = {
    name: '',
    description: '',
    imgurl: '',
    category: '',
    price: '',
    listedby: '',
};

function AddProduct(props) {
    const [formData, setFormData] = useState(blank);
    
      function handleChange(e) {
        let { name, value } = e.target;
        setFormData(data => ({
          ...data,
          [name]: value
        }));
      }

      function handleSubmit(e) {
        e.preventDefault();
        let newProductObject = {
            name: formData.name,
            description: formData.description,
            imgurl: formData.imgurl,
            category: formData.category,
            price: formData.price*100,
            listedby: props.seller.sellerid
        }
        let route = `/products/`;
         console.log(route, "route")
        props.addProductCB(newProductObject, route);
        setFormData(blank);
      }

    return (
        <div>
            <h2>Add Product</h2>

        <form className="row" onSubmit={handleSubmit}>
        <div className="offset-md-2 col-md-8 offset-lg-3 col-lg-6">
        <div className="AddProductForm">
        <label className="form-label">Product Name</label>
        <input type="text"
               name="name"
               value={formData.name}
               className="form-control"
               onChange={handleChange}
              />

        <label className="form-label">Description</label>
        <input type="text"
               name="description"
               value={formData.description}
               className="form-control"
               onChange={handleChange}
              />

        <label className="form-label">Image URL</label>
        <input type="text"
               name="imgurl"
               value={formData.imgurl}
               className="form-control"
               onChange={handleChange}
              />

        <label className="form-label">Category</label>
        <input type="text"
               name="category"
               value={formData.category}
               className="form-control"
               onChange={handleChange}
              />

        <label className="form-label">Price</label>
        <input type="number"
               name="price"
               value={formData.price}
               className="form-control"
               onChange={handleChange}
              />

            </div>

            <div>
              <button type="submit" className="btn btn-primary formbutton">Add</button>
            </div>

            </div>
        </form>

        </div>
  )
}

export default AddProduct;