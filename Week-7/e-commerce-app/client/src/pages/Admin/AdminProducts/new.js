import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FieldArray, Formik } from "formik";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
import { fetchProduct, postProduct, updateProduct } from "../../../api";
import validationSchema from "./validations"

const NewProduct = () => {
    const queryClient = useQueryClient()

    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:products")
    })
    const handleSubmit = async (values, bag) => {
        message.loading({content: "Loading..." , key: "product_update"});

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
        }

        newProductMutation.mutate(newValues, {
            onSuccess: ()  => {
                console.log("success")

                message.success({
                    content: "The product successfully update",
                    key: "product_update",
                    duration: 2
                })
            }

        })

   
    }

    return (
        <div>
            <Text fontSize="2xl">New Product</Text>

            <Formik initialValues={{
                title: "",
                description: "",
                price: "",
                photos: [],
            }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >

                {
                    ({ handleSubmit, touched, errors, handleChange, handleBlur, values, isSubmitting }) => (
                        <>
                            <Box>
                                <Box my="5" textAlign="left">
                                    <form onSubmit={handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Title:</FormLabel>
                                            <Input
                                                name="title"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && errors.title}
                                            />
                                            {touched.title && errors.title && <Text color="red.500">{errors.title}</Text>}
                                        </FormControl>
                                        <FormControl mt="5">
                                            <FormLabel>Description:</FormLabel>
                                            <TextArea
                                                name="description"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                                disabled={isSubmitting}
                                                isInvalid={touched.description && errors.description}
                                            />
                                            {touched.description && errors.description && <Text color="red.500">{errors.description}</Text>}
                                        </FormControl>
                                        <FormControl mt="5">
                                            <FormLabel>Price:</FormLabel>
                                            <Input
                                                name="price"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.price}
                                                disabled={isSubmitting}
                                                isInvalid={touched.title && errors.title}
                                            />
                                            {touched.price && errors.price && <Text color="red.500">{errors.price}</Text>}

                                        </FormControl>
                                        <FormControl mt="5">
                                            <FormLabel>Photos:</FormLabel>
                                            <FieldArray
                                                name="photos"
                                                render={(arrayHelpers) => (
                                                    <div>
                                                        {
                                                            values.photos && values.photos.map((photo, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <Input
                                                                            name={`photos.${index}`}
                                                                            value={photo}
                                                                            disabled={isSubmitting}
                                                                            onChange={handleChange}
                                                                            w="3xl"
                                                                        />

                                                                        <Button
                                                                            colorScheme="red"
                                                                            type="button"
                                                                            onClick={() => arrayHelpers.remove(index)}
                                                                        >Remove</Button>

                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                        <Button mt="5" onClick={() => arrayHelpers.push("")}>Add a photo</Button>
                                                    </div>

                                                )}
                                            ></FieldArray>
                                        </FormControl>

                                        <Button mt="5" width="full" isLoading={isSubmitting} type="submit">Save</Button>

                                    </form>

                                </Box>
                            </Box>
                        </>
                    )
                }

            </Formik>
        </div>
    )
}

export default NewProduct