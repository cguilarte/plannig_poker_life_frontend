import * as yup from "yup";
import { schemaUpdateProfile } from "./validateSchema";


export type FormDataUpdateProfile = yup.InferType<typeof schemaUpdateProfile>;
