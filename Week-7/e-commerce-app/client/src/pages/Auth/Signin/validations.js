import * as yup from "yup"

const validations = yup.object().shape({
    email: yup
    .string()
    .email("Geçerli bir email girin.")
    .required("Zorunlu alan."),

    password: yup
    .string()
    .min(8, "Parolanız en az 8 karakter içermelidir.")
    .required(),
})

export default validations