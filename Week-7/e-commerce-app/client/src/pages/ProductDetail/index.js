import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { fetchProduct } from "../../api"
import moment from "moment"
import ImageGallery from 'react-image-gallery';

const ProductDetail = () => {

    const { product_id } = useParams()

    const { isLoading, isError, data } = useQuery(['product', product_id], () => {
        return fetchProduct(product_id)
    })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error!</div>;
    }

    console.log(data);

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
                    <Button background="blue" color="white" mt="20px">Add to basket</Button>
                </Box>
            </Flex>
        </div>
    )
}

export default ProductDetail