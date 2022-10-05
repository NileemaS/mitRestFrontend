import {gql,useQuery} from '@apollo/client';
import { useContext} from 'react'
import Cookie from "js-cookie";
import AppContext from "./context"

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col} from "reactstrap";
  
function Dishes(){
  const apx = useContext(AppContext);
  
   
const GET_DISHES = gql`
query Restaurant($id: ID!) {
  restaurant(id: $id) {
    data {
      id
      attributes {
        name
        dishes {
          data {
            id
            attributes {
              name
              price
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

  const { loading, error, data } = useQuery(GET_DISHES, {
    variables: { id:  Cookie.get("restaurantID") },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  let restaurant = data.restaurant.data;

  if (restaurant.attributes.dishes.data.length > 0){

    return (
      <>
          {restaurant.attributes.dishes.data.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 150, width:150 }}
                  src={`http://localhost:1337${res.attributes.image.data.attributes.url}`}
                />
                <CardBody>
                  <CardTitle>{res.attributes.name}</CardTitle>
                  <CardText>{res.attributes.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button style={{ width: "60%" }} color="primary" 
                    onClick = {()=> apx.addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                  
                </div>
              </Card>
            </Col>
          ))}        
        </>
        )}
        else{
          return <h1> No Dishes</h1>
        }
    }
    export default Dishes