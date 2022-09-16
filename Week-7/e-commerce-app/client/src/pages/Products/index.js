import Card from "../../components/Card"
import { Grid } from '@chakra-ui/react'


const Products = () => {
    return (
        <>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                <Card />
            </Grid>
        </>
    )
}

export default Products