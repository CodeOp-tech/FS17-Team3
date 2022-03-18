import React, {useState, useEffect} from "react";
import Api from '../helpers/Api';

function OrderHistory({user}) {
    const [orders, setOrders] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    
    useEffect(() => {
        getOrders();
   }, []);

   const getOrders = async () => {
        if (user) {
             let userid = user.userid;
             let response = await Api.getContent(`/orders/user/${userid}`);
             if (response.ok) {
                  setOrders(response.data);
                  console.log(response.data);
             } else {
                  setErrorMsg(response.error);
             }
        }
   }; 
    
    return (
          <div className="container">
               <h1>Order History</h1>

                {orders.length > 0 
                ? orders.map(order =>  (
                
                    <div key={order.orderid}>
                        <h4>Order ID: {order.orderid}</h4>
                        <p>Order created: {order.orderdate}</p>

                        <table className="border">
                        <thead>
                            <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total Price</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {
                                order.orderItems.map(orderitem => (
                                    <tr>
                                    <td>{orderitem.productid}</td>
                                    <td>{orderitem.name}</td>
                                    <td>{orderitem.orderprice}</td>
                                    <td>{orderitem.orderquantity}</td>
                                    <td>{orderitem.orderprice*orderitem.orderquantity}</td>
                                    </tr>

                                ))
                            }
                        </tbody>
                        </table>

                        <p>Order total:</p>
                    </div>
                    
                    )
                    ) 
                : 
                <p>You haven't made any orders yet! </p>
                }

                <table></table>
               
          </div>
     );
}
export default OrderHistory;