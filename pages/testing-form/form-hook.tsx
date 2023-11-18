import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface FormData {
    firstName: string;
    lastName: string;
};

const schema = yup.object({
    firstName: yup.string().required("First Name is required!")
}).required();

const FormHook: NextPage = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit = (data: FormData) => { console.log(data); }
  // firstName and lastName will have correct type
   return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input type="text" {...register("firstName")} />
        <p>{errors.firstName?.message}</p>
        <label>Last Name</label>
        <input type="text" {...register("lastName", { required: "Email Address is required" })} />
        {errors.lastName && <p role="alert">{errors.lastName?.message}</p>}
        <button>
        SetValue
        </button>
    </form>
   );
}

export default FormHook;