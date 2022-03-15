import React, {useState, useEffect} from 'react';
import Api from '../helpers/Api';

const ProductDisplay = ({user}) => {
    const [errorMsg, setErrorMsg] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCart();
      }, []);
    
      const getCart = async () => {
          let userid = user.userid;
          let response = await Api.getContent(`/cart/${userid}`);
          if (response.ok) {
            setCart(response.data);
          }
          else {
            setErrorMsg(response.error)
          }
        };    
    
    const increaseOrderCount = async (id, current) => {
        let patched = {
            productid: id,
            quantity: current+1
        }
        let response = await Api.patchContent(`/cart/${user.userid}`, patched);
        if (response.ok) {
        setCart(response.data)
        }
        else {
        setErrorMsg(response.error)
      }
    }
    
      const decreaseOrderCount = async (id, current) => {
        if (current === 1) {
            deleteFromCart(id)
        }
        else {
            let patched = {
                productid: id,
                quantity: current-1
            }
            let response = await Api.patchContent(`/cart/${user.userid}`, patched);
            if (response.ok) {
            setCart(response.data)
            }
            else {
            setErrorMsg(response.error)
          }
        }
    }

    const deleteFromCart = async (productid) => {
        let response = await Api.deleteContent(`/cart/${user.userid}/${productid}`);
            if (response.ok) {
            setCart(response.data)
            }
            else {
            setErrorMsg(response.error)
            }
    }

    return (
    <section className="container">
        {cart.map(cartitem => (
            <div 
            key={cartitem.productid}
            className="d-flex mb-3 bg-light p-2">
            
            <img className="checkoutImg" src={cartitem.imgurl} />
            <div className="text-dark d-flex">
                <div className="d-flex flex-column align-items-start">
                <h5>{cartitem.name}</h5>
                <p className="text-start fs-6">{cartitem.description}</p>
                </div>
                <div className="d-flex align-items-center justify-content-center"><button onClick={e => increaseOrderCount(cartitem.productid, cartitem.quantity)}> + </button>{cartitem.quantity} <button onClick={e => decreaseOrderCount(cartitem.productid, cartitem.quantity)}>-</button></div>
            </div>

            </div>
        ))}
    </section>
    )
}

export default ProductDisplay