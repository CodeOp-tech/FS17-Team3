import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import './Shopfront.css';

function Shopfront(props) {

  const [selectedShop, setSelectedShop] = useState({});
  let {sellerid} = useParams();

  useEffect(() => {
    getSelectedShop(sellerid);
  }, []);

  const getSelectedShop = async sellerid => {
    try {
      let response = await fetch(`/sellers/${sellerid}`);
      if (response.ok) {
        let selectedShop = await response.json();
        setSelectedShop(selectedShop);
        console.log(selectedShop)
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  };

 return (
<div className="shopfront">

  <div className="profile-cover">
    <img className="profile-cover-img" src={selectedShop.coverurl} alt="cover photo"></img>
    <img className="profile-seller-img" src={selectedShop.picurl} alt="profile photo"></img>
 </div>

 <div className="profile-info">
 <h2 className="shop-name">{selectedShop.shopname}</h2>
    <p className="shop-desc">{selectedShop.description}</p>
</div>

</div>
 )
}

export default Shopfront;




// GET one seller
// router.get('/:sellerid', ensureSameSeller, async function(req, res, next) {
//     let {sellerid} = req.params;
//     let sql = 'SELECT * FROM sellers WHERE sellerid = ' + sellerid;
  
//     try {
//       let results = await db(sql);
//       let seller = results.data[0];
//       delete seller.password;
//       res.send(seller);
//     } catch (err) {
//       res.status(500).send({error: err.message});
//     }
//   }); 