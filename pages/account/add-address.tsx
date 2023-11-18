import { NextPage } from 'next';
import AccountLayout from './AccountLayout';
import { useForm } from 'react-hook-form';
import { buyeraddress } from '../../utils/models/buyeraddress';
import DynaFormControl from '../../Components/Reusable/Forms/DynaFormControl';
import { getAPIUrl } from '../../lib/useLocalStorage';
import { toast, ToastContainer } from 'react-toastify';

const AddAddress: NextPage = () => {
    const headerProps = {pageTitle: 'Hi Bidder : Add Address',pageDescription: 'User add address'};
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<buyeraddress>();
    const mainApiUrl = getAPIUrl() || process.env.API_URL;

    const formCreation: any = [
        {
            type: "text",
            formName: "first_name",
            formLabel: "First Name",
            validation: { required: "First Name is required!" }
        },
        {
            type: "text",
            formName: "last_name",
            formLabel: "Last Name",
            validation: { required: "Last Name is required!" }
        },
        {
            type: "text",
            formName: "mobile_number",
            formLabel: "Mobile Number",
            validation: { required: "Mobile Number is required!", pattern: { value: /^[0-9]{10}$/i, message: "Invalid Contact No, It should have 10 digits."}}
        },
        {
            type: "text",
            formName: "country",
            formLabel: "Country",
            validation: { required: "Country is required!" }
        },
        {
            type: "text",
            formName: "state",
            formLabel: "State",
            validation: { required: "State is required!" }
        },
        {
            type: "text",
            formName: "city",
            formLabel: "City",
            validation: { required: "City is required!" }
        },
        {
            type: "text",
            formName: "address_one",
            formLabel: "Address line 1",
            validation: { required: "Address line 1 is required!" }
        },
        {
            type: "text",
            formName: "address_two",
            formLabel: "Address line 2",
            validation: { required: "Address line 2 is required!" }
        },
        {
            type: "text",
            formName: "building",
            formLabel: "Apt / Suite / Building",
            validation: { required: "Apt / Suite / Building is required!" }
        },
        {
            type: "text",
            formName: "pin_code",
            formLabel: "Postal Code",
            validation: { required: "Postal Code is required!" }
        }
    ]
    const onSubmit = async (data: buyeraddress) => {
        try {
            const addressRespo = await fetch(mainApiUrl+"user/user-address", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });
            const addressJson = await addressRespo.json();
            if(addressRespo.ok){
                toast.success(addressJson.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
        }
        catch(errors) {
            toast.error(errors.message, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
        }
    }

   return (
    <AccountLayout headerProps={headerProps}>
        <ToastContainer />
        <div className="container-fluid px-8 border-b-2 border-[#D7D7D7]">
            <div className="row">
                <div className="flex flex-wrap">
                    <div className="w-1/2 h-[70px] text-[30px] text-[600] pt-[10px]">
                        <p>Add Address</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="user-info">
            <div className="p-8">
                <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="overflow-hidden sm:rounded-md">
                        <div className="bg-white">
                            <div className="grid grid-cols-3 gap-6 mb-3">
                                {formCreation.map((formData: any) => (
                                    <div key={formData.formName}>
                                        <DynaFormControl register={register} errors={errors} type={formData.type} formName={formData.formName} formLabel={formData.formLabel} validation={formData.validation}></DynaFormControl>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-4 pt-4 text-center'>
                                <button type="submit" className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal">
                                    <>Submit Now</>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </AccountLayout>
   );
}

export default AddAddress;