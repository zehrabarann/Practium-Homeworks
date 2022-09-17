import Card from "../../components/Card"
import { Box, Button, Flex, Grid } from '@chakra-ui/react'
import { useInfiniteQuery } from "react-query"
import { fetchProductList } from "../../api"
import React from "react"


const Products = () => {
    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status, } = useInfiniteQuery('products', fetchProductList,
        {
            getNextPageParam: (lastGroup, allGroups) => {
                const morePageExist = lastGroup?.length === 12;

                if (!morePageExist) {
                    return;
                }

                return allGroups.length + 1;
            }
        }
    )

    if (status === "loading") return 'Loading...'

    if (status === "error") return 'An error has occurred: ' + error.message

    console.log("data", data)
    return (
        <>
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {data.pages.map((group, index) => {
                    return (
                        <React.Fragment key={index}>
                            {group.map((item) => {
                                return (
                                    <Box w="100" key={item._id}>
                                        <Card item={item} />
                                    </Box>
                                )
                            })}
                        </React.Fragment>
                    )
                })}
            </Grid>

            <Flex mt="10" justifyContent="center" >
                <Button
                    onClick={() => fetchNextPage()}
                    isLoading={isFetchingNextPage}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load More'
                            : 'Nothing more to load'}
                </Button>
            </Flex>
        </>
    )
}

export default Products