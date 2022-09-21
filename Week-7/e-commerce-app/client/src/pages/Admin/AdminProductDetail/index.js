import { Box, Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FieldArray, Formik } from "formik";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { fetchProduct, updateProduct } from "../../../api";
import validationSchema from "./validations"

const AdminProductDetail = () => {
    const { product_id } = useParams();

    const { isLoading, isError, data, error } = useQuery([
        "admin:product",
        product_id],
        () => fetchProduct(product_id)
    )
    if (isLoading)
        return <div>Loading...</div>

    if (isError)
        return <div>Error! {error.message}</div>

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: "product_update" })

        try {
            await updateProduct(values, product_id)

            message.success({
                content: "The product successfully updated.",
                key: "product_update",
                duration: 2,
            })

        } catch (err) {
            message.error("The product dos not updated.")
        }
    }

    return (
        <div>
            <Text fontSize="2xl">Edit</Text>

            <Formik initialValues={{
                title: data.title,
                description: data.description,
                price: data.price,
                photos: data.photos,
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

                                        <Button mt="5" width="full" isLoading={isSubmitting} type="submit">Update</Button>

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

export default AdminProductDetail