import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Dropdown from './DropDown';

//business owner details
const schema = yup
    .object({
        businessType: yup.string().required("Please select Your business type"),
        companyName: yup.string().required(),
        tinNo: yup.string().matches(/^\d{9}$/, 'TIN must be exactly 9 digits').required('TIN is required'),
        registrationDate: yup.string().required(),
        location: yup.string().required(),
    })
    .required()
    const BusinessTypeOptions = [
        { label: 'Retailer', value: 'retailer' },
        { label: 'Wholesale', value: 'wholesale' },
        { label: 'Manufacturer', value: 'manufacturer' }
    ];


export default function BusinessDetails({ onSubmit, onNext, visible }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const submitForm = (data) => {
        console.log(data);
        onSubmit(data);
        onNext();
    };


    return (
        <div className={`w-[95%] space-y-8 ${visible ? 'block' : 'hidden'}`}>
            <div>
                <form onSubmit={handleSubmit(submitForm)} className="mt-8 w-full border border-blue-500 rounded space-y-5" style={{ borderWidth: "2px" }}>
                    <div className="mt-0 bg-blue-200 h-14 border-b-4 px-10 flex items-center">
                        <p className="text-xl font-semibold text-blue-500">Business Details</p>
                    </div>
                    <div className="p-5 flex flex-col">
                        <p className="font-bold text-black text-xl">Business Details</p>
                        <div className="mt-5 ">
                            <label className="font-semibold">Business Type</label>
                            <Controller
                                name="businessType" 
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Dropdown
                                        options={BusinessTypeOptions}
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Select Business Type"
                                    />
                                )}
                            />

                            {/* <input {...register("businessType")} className="bg-white border border-grey-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
                            <p className="text-sm text-red-400">{errors.businessType?.message}</p>
                        </div>

                        <label className="font-semibold">Company Name</label>
                        <input {...register("companyName")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.companyName?.message}</p>
                        <label className="font-semibold">Tin Number</label>
                        <input {...register("tinNo")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.tinNo?.message}</p>
                        <label className="font-semibold">Registration Date</label>
                        <input {...register("registrationDate")} type='date' className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.registrationDate?.message}</p>
                        <p className="text-xl font-bold my-3">Business Location</p>
                        <label className="font-semibold">Location</label>
                        <input {...register("location")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.location?.message}</p>

                        <div className="flex justify-between items-end mt-5">
                            <input type="submit" className="py-1 px-6 bg-blue-500 text-white rounded-lg cursor-pointer" style={{ width: "200px" }} value="Next" />
                        </div>
                    </div>


                </form>
            </div>

        </div>
    )
}