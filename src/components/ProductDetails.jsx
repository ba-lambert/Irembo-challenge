import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Dropdown from "./DropDown"
import { useState } from "react"

//business owner details
const schema = yup
    .object({
        purposeImportation: yup.string().required("Please select purpose of importation"),

        specifyPurposeImportation: yup.string().when('applicantCitizenship', {
            is: (value) => value === 'other',
        then: (schema) => schema.required('Passport number is required for foreign citizens.'),
        otherwise: (schema) => schema,}),
        productCategory: yup.string().required(),
        productName: yup.string().required(),
        weight: yup.string().required(),
        descriptionOfProducts: yup.string().required("Please Select Your Nationality"),
        unitMeasurement: yup.string().required(),
        quantity: yup.number().positive().required("This field is required-Please provide a number greater than zero").positive(),
    })
    .required()
const unitMeasurementOptions = [
    { label: 'kgs', value: 'kgs' },
    { label: 'tones', value: 'tones' }
];

const Purposeofimportation = [
    { label: 'direct sale', value: 'directsale' },
    { label: 'personal use', value: 'personaluse' },
    { label: 'trial use', value: 'TrialUse' },
    { label: 'other', value: 'Other' }
];


export default function ProductDetails({ onSubmit, onNext, visible }) {
    const [purpose, setPurpose] = useState("");
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handlePurposeChange = (selectedValue) => {
        console.log(selectedValue); // Check the selected value
        setPurpose(selectedValue);
    };
    
    const submitForm = (data) => {
        console.log(data);
        onSubmit(data);
        onNext();
    };

    return (
        <div className={`w-[95%] space-y-8 ${visible ? 'block' : 'hidden'}`}>
            <div>
                <form onSubmit={handleSubmit(submitForm)}  className="mt-8 w-full border border-blue-500 rounded space-y-5" style={{ borderWidth: "2px" }}>
                    <div className="mt-0 bg-blue-200 h-14 border-b-4 px-10 flex items-center">
                        <p className="text-xl font-semibold text-blue-500">Product Details</p>
                    </div>
                    <div className="p-5 flex flex-col">
                        <p className="font-bold text-black text-xl">Importation Details</p>
                        <div className="mt-5 ">
                            <label className="font-semibold">Purpose of importation</label>
                            <Controller
                                name="purposeImportation"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Dropdown
                                        options={Purposeofimportation}
                                        value={field.value}
                                        onChange={(selectedValue) => {
                                            field.onChange(selectedValue);
                                            handlePurposeChange(selectedValue);
                                        }}
                                    />
                                )}
                            />
                            <p className="text-sm text-red-400">{errors.purposeImportation?.message}</p>
                        </div>
                        {purpose === "Other" && (
                            <div>
                                <label className="font-semibold">Specify Purpose of Importation</label>
                                <input {...register("specifyPurposeImportation")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                                <p className="text-sm text-red-400">{errors.specifyPurposeImportation?.message}</p>
                            </div>
                        )}
                        <p className="my-3 text-xl font-bold">Product Details</p>
                        <label className="font-semibold">Product Category</label>
                        <input {...register("productCategory")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.productCategory?.message}</p>
                        <label className="font-semibold">Product name</label>
                        <input {...register("productNameweight")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.productNameweight?.message}</p>

                        <label className="font-semibold">Weight(Kg)</label>
                        <input {...register("weight")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.weight?.message}</p>

                        <label className="font-semibold">Description of products</label>
                        <input {...register("descriptionOfProducts")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.descriptionOfProducts?.message}</p>
                        <label className="font-semibold">Unit of measurement</label>
                        <Controller
                            name="unitMeasurement"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Dropdown
                                    options={unitMeasurementOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select Measurement Unit"
                                />
                            )}
                        />
                        {/* <input {...register("unitMeasurement")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " /> */}
                        <p className="text-sm text-red-400">{errors.unitMeasurement?.message}</p>
                        <label className="font-semibold">Quaintity of product(s)</label>
                        <input {...register("quantity")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.quantity?.message}</p>


                        <div className="flex justify-between items-end mt-3">
                            <input type="submit" className="py-1 px-6 bg-blue-500 text-white rounded-lg cursor-pointer" style={{ width: "200px" }} value="Submit" />
                        </div>
                    </div>


                </form>
            </div>

        </div>
    )
}