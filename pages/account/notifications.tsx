import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import DynaFormControl from '../../Components/Reusable/Forms/DynaFormControl';
import buyerNotificationForm from '../../Services/formsdata/buyer_notification_form';
import sellerNotificationForm from '../../Services/formsdata/formSellerCreation';
import AccountLayout from './AccountLayout';
const Notifications: NextPage = () => {

    const headerProps = {pageTitle: 'Account notifications',pageDescription: 'Hi, this is a account notifications of bidder user'};

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<any>();

    const formCreation = buyerNotificationForm;
    const formSellerCreation = sellerNotificationForm;

    const onSubmit = async (data: any) => {
        console.log(data);
    }

    const onSellerSubmit = async (data: any) => {
        console.log(data);
    }

    return (
        <AccountLayout headerProps={headerProps}>
            <div className="p-4">
                <div className="w-full pb-[18px] mb-[18px] border-b border-[#D7D7D7]">
                    <span className="text-[24px] text-[600] text-[#1E2A78]">Bidder Notifications</span>
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            {formCreation.map((formData: any) => (
                                <div key={formData.formName} className="py-2">
                                    <DynaFormControl register={register} errors={errors} type={formData.type} formName={formData.formName} subLabel={formData.subLabel} formLabel={formData.formLabel} defaultChecked={formData.defaultChecked}></DynaFormControl>
                                </div>
                            ))}
                        </div>
                        <div className='mt-3 pt-2'>
                            <button type="submit" className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal">
                                <>Submit Now</>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full">
                    <span className="text-[24px] text-[600] text-[#1E2A78]">Seller Notifications</span>
                    <form method="POST" onSubmit={handleSubmit(onSellerSubmit)}>
                        <div>
                            {formSellerCreation.map((formData: any) => (
                                <div key={formData.formName} className="py-2">
                                    <DynaFormControl register={register} errors={errors} type={formData.type} formName={formData.formName} subLabel={formData.subLabel} formLabel={formData.formLabel} defaultChecked={formData.defaultChecked}></DynaFormControl>
                                </div>
                            ))}
                        </div>
                        <div className='mt-4 pt-4'>
                            <button type="submit" className="cursor-pointer hover:bg-primary-color hover:text-white text-[#FFFFFF] bg-[#1E2A78] rounded-[6px] px-[46px] py-[10px] font-normal">
                                <>Submit Now</>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AccountLayout>
   );
}

export default Notifications;