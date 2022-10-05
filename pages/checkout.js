import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/checkoutForm";
import Cart from "../components/cart";

function Checkout() {
   
  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51LhglXHjapj2jcCn2bKRnhrm0Z5XfPIngc07tnEK2Xp9EdE5m7pKfkJ0bzJbZFivEAqtlyQbJrcaptFp3H7pgPMk007ah1bQLI"
  );

  return (
    <Row>
      <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
        <h1 style={{ margin: 20 }}>Checkout</h1>
        <Cart/>
      </Col>
      <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
