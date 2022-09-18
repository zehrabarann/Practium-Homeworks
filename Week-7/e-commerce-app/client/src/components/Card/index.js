import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Card = ({ item }) => {
    return (
        <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p="3">
            <Link to={`/product/${item._id}`}>
                <Image src={item.photos[0]} alt="products" loading='lazy' />
                <Box py='6'>
                    <Flex alignItems="center" justifyContent="space-between" mb="7px">
                    <Box fontWeight='bold' as='h3' lineHeight='tight'>
                        {item.title}
                    </Box>
                    <Box display='flex' alignItems='baseline' color="gray.500">
                        {moment(item.createdAt).format("DD/MM/YYYY")}
                    </Box>

                    </Flex>
                  
                    <Box className='products-desc'>
                        {item.description}
                    </Box>
                  
                    <Box mt="2" fontWeight="semibold" fontSize="20px">
                        {item.price}$
                    </Box>
                </Box>
            </Link>
            <Button colorScheme="teal"mb="5">Add to basket</Button>
        </Box>
    )
}

export default Card