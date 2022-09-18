import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchProduct } from "../../api"
import moment from "moment"
import ImageGallery from 'react-image-gallery';
import { useBasket } from "../../contexts/BasketContext"


const ProductDetail = () => {
    const { product_id } = useParams()
    const { addToBasket, items } = useBasket();

    const { isLoading, isError, data } = useQuery(['product', product_id], () => {
        return fetchProduct(product_id)
    })

    if (isLoading) {
        return <div className="detail-loading">Loading...</div>;
    }

    if (isError) {
        return <div>Error!</div>;
    }

    console.log(data);


    const findBasketItem = items.find((item) => item._id === product_id)
    const images = data.photos.map((url) => ({ original: url }))

    return (
        <div>
            <Flex>
                <Box margin="10" w="40%">
                    <ImageGallery items={images} showThumbnails={false} showPlayButton={false} />
                </Box>

                <Box margin="10" w="60%">
                    <Text as="h2" fontSize="2xl" fontWeight="bold">{data.title}</Text>
                    <Text color="gray.600">{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
                    <Text mt="10px" color="gray.500">{data.description}</Text>
                    <Button colorScheme={findBasketItem ? "teal" : "telegram"} mt="20px" onClick={() => addToBasket(data, findBasketItem)}>
                        {
                            findBasketItem ? "Remove from basket" : "Add to Basket"
                        }
                    </Button>
                </Box>
            </Flex>
        </div>
    )
}

export default ProductDetail