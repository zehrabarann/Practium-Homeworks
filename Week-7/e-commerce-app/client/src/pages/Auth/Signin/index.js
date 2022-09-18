import { Alert, Box, Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import {useFormik} from "formik"
import validationSchema from "./validations"
import { fetchLogin } from "../../../api"
import { useAuth } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"


const Signin = () => {

    const {login} = useAuth()
    const history = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,

        onSubmit: async(values, bag) => {
            try{
                const loginResponse = await fetchLogin({email: values.email, password: values.password});
                login(loginResponse)
                history("/profile")

                console.log(loginResponse)
            }catch(err) {
                bag.setErrors({general: err.response.data.message})

            }
        }
    })
    return (
        <div>
            <Flex alignItems='center' width='full' justifyContent='center'>
                <Box pt="10">
                    <Box textAlign='center'>
                        <Heading>Sign In</Heading>
                    </Box>
                    <Box my="5">
                        {
                            formik.errors.general && (
                                <Alert status="error">{formik.errors.general}</Alert>
                            )
                        }
                    </Box>
                    <Box py={5} textAlign="left">
                        <form onSubmit={formik.handleSubmit}>
                            <FormControl>
                                <FormLabel>E-mail</FormLabel>
                                <Input 
                                name="email" 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                values={formik.values.email}
                                isInvalid={formik.touched.email && formik.errors.email}
                                ></Input>
                            </FormControl>

                            <FormControl mt="5">
                                <FormLabel>Password</FormLabel>
                                <Input 
                                name="password" 
                                type="password"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                values={formik.values.password}
                                isInvalid={formik.touched.password && formik.errors.password}
                                ></Input>
                            </FormControl>
                            <Button mt="5" w="full" type="submit">Sign in</Button>
                        </form>
                    </Box>
                </Box>
            </Flex>
        </div>
    )
}

export default Signin