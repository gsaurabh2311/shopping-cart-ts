import {Button, Card} from 'react-bootstrap'
import {formatCurrency} from '../utilities/formatCurrency'
import { useShoppingCart } from '../context/ShoppingCartContext'

type StoreItemProps = {
    id: number
    name: string
    price: number
    imgUrl: string
}

export function StoreItem ({id, name, price, imgUrl} : StoreItemProps) {
    const { getItemQuantity, incrementCartQuantity, decrementCartQuantity, removeFromCart} = useShoppingCart();
    const quantity:number = getItemQuantity(id);
    return (
        <Card className="h-100">
            <Card.Img 
                src={imgUrl}
                variant="top"
                height= "200px"
                style = {{ objectFit: "cover"}}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => incrementCartQuantity(id)}>+ Add To Cart</Button>
                    ) : (
                        <div className="d-flex flex-column align-items-center" style={{gap: "0.5rem"}} >
                            <div className="d-flex flex-row">
                                <Button onClick={() => decrementCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart 
                                </div>
                                
                        <Button onClick={() => incrementCartQuantity(id)}>+</Button>
                        </div>     
                        <div className="d-flex align-items-center justify-content-center" style={{gap: "0.5rem"}}></div>
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}
