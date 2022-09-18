import { Alert, Box, Button, Image, Link, Text } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

const Basket = () => {
    const {items, removeFromBasket} = useBasket();
    console.log(items)
    //Toplama işlemi yapılabilmesi için
    //acc => o ana kadar ki toplanmış değer. ,0 ile sıfırdan başladığı anlamına gelir.
    const total = items.reduce((acc, obj) => acc + obj.price, 0)

    return(
        <div>{items.length < 1 && <Alert status="warning">You have not any items in your basket.</Alert>}
        
        {items.length > 0 && <>
        <ul>
            {items.map((item) => {
                return(
                    <li key={item._id}>
                        <Link to={`/product/${item._id}`}>
                            {item.title} {item.price}
                            <Image width={200} src={item.photos[0]} alt="basket item" loading="lazy"/>
                        </Link>

                        <Button colorScheme="teal" onClick={() => removeFromBasket(item._id)}>Remove from basket</Button>
                    </li>
                )
            })}
        </ul>
        <Box>
            <Text>Total: {total}</Text>
        </Box>
        </>}

      


        </div>

     
    )
}

export default Basket