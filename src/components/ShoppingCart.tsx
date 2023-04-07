import { Offcanvas, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { formatCurrency } from '../utils/formatCurrency'
import { CartItem } from './CartItem'
import items from '../data/items.json'

export function ShoppingCart() {
  const { closeCart, cartIsOpen, cartItems } = useShoppingCart()

  return (
    <Offcanvas
      show={cartIsOpen}
      placement='end'
      onHide={closeCart}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => <CartItem key={item.id} {...item} />)}
        </Stack>
        <div className="fw-bold justify-content-end">
          Total {formatCurrency(cartItems.reduce((acc, cur) => {
            const item = items.find(it => it.id === cur.id)
            return acc + (item?.price || 0) * cur.quantity
          }, 0))}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
