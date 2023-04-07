import { Button, Stack } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
import items from '../data/items.json'
import { formatCurrency } from '../utils/formatCurrency'

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem(props: CartItemProps) {
  const { id, quantity } = props
  const { removeFromCart } = useShoppingCart()
  const item = items.find((it) => it.id === id)
  const imgSrc = require(`../assets${item?.imgUrl}`)

  if (item === null) return null

  return (
    <Stack
      direction='horizontal'
      gap={2}
      className='d-flex align-items-center'
    >
      {item !== null && (
        <>
          <img
            src={imgSrc}
            style={{ width: '125px', height: '75px', objectFit: 'cover' }}
          />
          <div className='me-auto'>
            <div>
              {item!.name}{' '}
              {quantity >= 1 && (
                <span
                  className='text-muted'
                  style={{ fontSize: '.65rem' }}
                >
                  {quantity === 1 ? `${quantity} item` : `${quantity} items`}
                </span>
              )}
            </div>
            <div
              className='text-muted'
              style={{ fontSize: '.75rem' }}
            >
              {formatCurrency(item!.price * quantity)}
            </div>
          </div>
          <Button variant='outline-danger' size='sm' onClick={() => removeFromCart(item!.id)}>&times;</Button>
        </>
      )}
    </Stack>
  )
}
