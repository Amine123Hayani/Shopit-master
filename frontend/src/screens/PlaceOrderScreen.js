import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const addDecimals = number => (Math.round(number * 100) / 100).toFixed(2)
  const cart = useSelector(state => state.cart)
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )
  const {
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = cart
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  }, [success, history])
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: [...cartItems],
        shippingAddress: cart.shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    )
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address :</strong>
                {address} , {city} {postalCode} , {country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant='flush'>
                {cartItems.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  class='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
