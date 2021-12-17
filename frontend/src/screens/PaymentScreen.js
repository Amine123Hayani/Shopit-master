import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress) history.push('/shipping')
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = e => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h2>Payment Method</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethode'
                value='PayPal'
                checked
                onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default PaymentScreen
