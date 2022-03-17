import React, { useState } from 'react';
import Api from "../helpers/Api";
import UpdateShopForm from '../components/UpdateShopForm';


function UpdateShopDetails(props) {
    const [errorMsg, setErrorMsg] = useState("");

    const handleUpdateShop = async (newShopData) => {
        let response = await Api.updateSellerData('/:sellerid', newShopData);
        if (response.ok) {
          console.log("Shop details successfully updated!")
        }
        else {
          setErrorMsg(response.error)
        }
      }  



    return (
        <div>
            <h1>Update Shop Details</h1>
            <UpdateShopForm /> 
            </div>
    );
}

export default UpdateShopDetails;