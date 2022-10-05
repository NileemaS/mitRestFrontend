import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge } from "reactstrap";
import AppContext from "./context"
import Link from "next/link"
import Cookie from "js-cookie";

function Cart() {
  let getUser = Cookie.get("user");
  let isAuthenticated = getUser !== undefined? true : false;
  let {cart,addItem,removeItem} = useContext(AppContext);
  console.log(`in CART: ${JSON.stringify(cart)}`)
  var items = cart == undefined ? null : cart ;
  //const router = useRouter();
  

  function renderItems() {

    if (items !== null) {
      var itemList = cart.items.map((item) => {
        if (item.quantity > 0) {
          return (
            <div
              className="items-one"
              style={{ marginBottom: 15 }}
              key={item.id}
            >
              <div>
                <span id="item-price">&nbsp; ${item.attributes.price}</span>
                <span id="item-name">&nbsp; {item.attributes.name}</span>
              </div>
              <div>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 15,
                    marginRight: 5,
                    marginLeft: 10,
                  }}
                  onClick={() => addItem(item)}
                  color="link"
                >
                  +
                </Button>
                <Button
                  style={{
                    height: 25,
                    padding: 0,
                    width: 15,
                    marginRight: 10,
                  }}
                  onClick={() => removeItem(item)}
                  color="link"
                >
                  -
                </Button>
                <span style={{ marginLeft: 5 }} id="item-quantity">
                  {item.quantity}x
                </span>
              </div>
            </div>
          );
        }
      });
      return itemList;
    }
    else {
      return (<div></div>);
    }
  }
const checkoutItems = ()=>{  

  return (
    <div>
      <Badge style={{ width: 200, padding: 10 }} >
        <h5 style={{ fontWeight: 100, color: "white" }}>Total:</h5>
        <h3> { items !== null ? cart.total : 0 }  </h3> 
      </Badge>
      {}
          <Link href="/checkout/">
            <Button style={{ width: "60%" }} color="primary"
             disabled = {!isAuthenticated}>
              <a>Order</a>
            </Button>
          </Link>
    </div>
  )}

// return Cart
  return (
    <div>
      <h1> Cart</h1>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Your Order</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>
            {renderItems()}
          </div>
          <div>
            {checkoutItems()}
          </div>
          
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}
export default Cart;

