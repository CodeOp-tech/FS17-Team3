import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

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
<div>
<img className="shopCover" src={selectedShop.coverurl}></img>
<img className="sellerPic" src={selectedShop.picurl}></img>
    <ul>
        <li>{selectedShop.shopname}</li>
        <li>{selectedShop.description}</li>
    </ul>
</div>
 )
}

export default Shopfront;




// // GET one seller
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