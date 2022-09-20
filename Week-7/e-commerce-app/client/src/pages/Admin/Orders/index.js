import { Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useQuery } from "react-query"
import { fetchOrder } from "../../../api";

const Orders = () => {
    const { isLoading, isError, data, error } = useQuery("admin:orders", fetchOrder);

    if (isLoading)
        return <div>Loading...</div>
    
    if(isError)
    return <div>Error! {error.message}</div>

    console.log(data)

    return (
        <div>
            <Text fontSize="2xl">Orders</Text>

                <Table variant="simple">
                    <TableCaption>
                        <Thead>
                            <Tr>
                                <Th>User</Th>
                                <Th>Address</Th>
                                <Th>Items</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.map((item) => {
                                    return(
                                        <Tr key={item._id}>
                                            <Td>{item.user.email}</Td>
                                            <Td>{item.adress}</Td>
                                            <Td>{item.items.length}</Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Tbody>
                    </TableCaption>
                </Table>


        </div>
    )
}

export default Orders