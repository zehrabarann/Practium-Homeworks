import { Alert, Box, Button, Flex, FormControl, FormLabel, Image, Input, Link, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from "react";
import { postOrder } from "../../api";



const Basket = () => {
    const [address, setAddress] = useState();
    const { items, removeFromBasket, emptyBasket } = useBasket();
    console.log(items)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)

    const handleSubmitForm = async () => {
        const itemIds = items.map((item) => item._id)

        const input = {
            address,
            items: JSON.stringify(itemIds)
        }

        const response = await postOrder(input);
        emptyBasket();
        onClose();
    }

    //Toplama işlemi yapılabilmesi için
    //acc => o ana kadar ki toplanmış değer. ,0 ile sıfırdan başladığı anlamına gelir.
    const total = items.reduce((acc, obj) => acc + obj.price, 0)

    return (
        <div className="basket-products">{items.length < 1 && <Alert status="warning">You have not any items in your basket.</Alert>}
            <h2>Basket</h2>
            {items.length > 0 && <>
                <Flex>


                    <ul>
                        {items.map((item) => {
                            return (
                                <li key={item._id}>
                                    <Link to={`/product/${item._id}`}>
                                        <Flex>
                                            <Box mr="50px">
                                                <Image width={200} src={item.photos[0]} alt="basket item" loading="lazy" />
                                            </Box>
                                            <Box flexDirection="column" className="basket-name-price">
                                                <Box fontWeight="bold" fontSize="25px">
                                                    {item.title}
                                                </Box>
                                                <Box>
                                                    {item.price}$
                                                </Box>
                                            </Box>
                                        </Flex>
                                    </Link>
                                    <Box>
                                        <Button colorScheme="teal" onClick={() => removeFromBasket(item._id)}>Remove from basket</Button>
                                    </Box>

                                </li>
                            )
                        })}
                    </ul>
                    <Box flexDirection="column" w="30%" className="cart-summary" h="450px">



                        <h2 className="summary-title">Cart Summary</h2>
                        <Box display="flex" justifyContent="space-between" mb="5">
                            <Text fontSize="18px" fontWeight="400">Total:</Text>
                            <Text textDecoration="underline" fontSize="18px" fontWeight="500">{total}$</Text>
                        </Box>

                        <Box display="flex" justifyContent="space-between" mb="5">
                            <Text fontSize="18px" fontWeight="400">Cargo:</Text>
                            <Text textDecoration="underline" fontSize="18px" fontWeight="500">
                                {total > 1000 ? "Free Shipping" : "Shipping Fee: 30$"}
                            </Text>
                        </Box>
                        {/* <Box display="flex" justifyContent="space-between" mb="5">
                            {
                                items.map((item) => {
                                    return (
                                        <>
                                            <Box display="flex" justifyContent="space-between" mb="5" w="100%">
                                                <Text fontSize="18px" fontWeight="400">Tax:</Text>
                                                <Text textDecoration="underline" fontSize="18px" fontWeight="500">
                                                    {item.price * 0.01}$
                                                </Text>
                                            </Box>
                                        </>

                                    )
                                })
                            }
                        </Box> */}
                        <Button color="white" background="black" borderColor="black" _hover="black" mt="2" w="100%" onClick={onOpen} >Order</Button>
                    </Box>
                </Flex>

                <Modal
                    initialFocusRef={initialRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Order</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Textarea ref={initialRef} placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>}




        </div>


    )
}

export default Basket