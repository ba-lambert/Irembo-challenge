import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import CountrySelector from "../components/CountriesList"
import Dropdown from "../components/DropDown"
import { useState } from "react"


const schema = yup.object({
    applicantCitizenship: yup
      .string()
      .required("Sorry, we can’t find your identification data from NIDA system. Please contact NIDA for more details. This field is required"),
    idNumber: yup.string().when('applicantCitizenship', {
        is: (value) => value === 'Rwandan',
    then: (schema) => schema.required('NID number is required for Rwandan citizens.'),
    otherwise: (schema) => schema,
    //   is: 'Rwandan',
    //   then: yup.string().required("NID number is required for Rwandan citizens."),
    //   otherwise: yup.string().nullable(),
    }),

    passportNo: yup.string().when('applicantCitizenship', {
        is: (value) => value === 'foreigner',
    then: (schema) => schema.required('Passport number is required for foreign citizens.'),
    otherwise: (schema) => schema,
    //   is: 'foreigner',
    //   then: yup.string().required("Passport number is required for foreign citizens."),
    //   otherwise: yup.string().nullable(),
    }),
    surnames: yup.string().required(),
    other_names: yup.string().required(),
    nationality: yup.string().required("Please Select Your Nationality"),
    phoneNo: yup.number().positive().integer().required(),
    email: yup.string().email(), // Fixed the email validation
  });
  
  
//business owner details
// const schema1 = yup.object({
//     applicantCitizenship: yup
//       .string()
//       .required("Sorry, we can’t find your identification data from NIDA system. Please contact NIDA for more details. This field is required"),
//     idNumber: yup.string().when('applicantCitizenship', {
//       is: (value) => value === 'Rwandan',
//       then: yup.string().required("NID number is required for Rwandan citizens."),
//       otherwise: yup.string().nullable(),
//     }),
//     passportNo: yup.string().when('applicantCitizenship', {
//       is: (value) => value === 'foreigner',
//       then: yup.string().required("Passport number is required for foreign citizens."),
//       otherwise: yup.string().nullable(),
//     }),
//     surnames: yup.string().required(),
//     other_names: yup.string().required(),
//     nationality: yup.string().required("Please Select Your Nationality"),
//     phoneNo: yup.number().positive().integer().required(),
//     email: yup.string().email(), // Fixed the email validation
//   });
  

const applicantCitizenships = [

    { label: 'Rwandan', value: 'Rwandan' },
    { label: 'foreigner', value: 'foreigner' }
];
export default function OwnerDetails({ onSubmit, onNext, visible }) {
    const [citizenship, setCitizenship] = useState("");

    const handleCitizenshipChange = (value) => {
        setCitizenship(value);
    };
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
        <div className="w-[95%] space-y-8">
            <div>
                <form onSubmit={handleSubmit(submitForm)} className="mt-8 w-full border border-blue-500 rounded space-y-5" style={{ borderWidth: "2px" }}>
                    <div className="mt-0 bg-blue-200 h-14 border-b-4 px-10 flex items-center">
                        <p className="text-xl font-semibold text-blue-500">Business Owner Details</p>
                    </div>
                    <div className="p-5 flex flex-col">
                        <p className="font-bold text-black text-xl">Business Owner Details</p>
                        <div className="mt-5 ">
                            <label className="font-semibold">Applicant Citizenship</label>
                            <Controller
                                name="applicantCitizenship"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Dropdown
                                        options={applicantCitizenships}
                                        value={field.value}
                                        onChange={(selectedValue) => {
                                            field.onChange(selectedValue);
                                            handleCitizenshipChange(selectedValue);
                                        }}
                                    />
                                )}
                            />

                            {/* <input {...register("applicantCitizenship")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " /> */}
                            <p className="text-sm text-red-400">{errors.applicantCitizenship?.message}</p>
                        </div>

                        {/* <label className="font-semibold">NID number</label>
                        <input {...register("idNumber")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.idNumber?.message}</p>
                        <label className="font-semibold">Passport Number</label>
                        <input {...register("passportNo")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.passportNo?.message}</p> */}
                        {citizenship === "Rwandan" ? (
                            <>
                                <label className="font-semibold">NID number</label>
                                <input {...register("idNumber")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5" />
                                <p className="text-sm text-red-400">{errors.idNumber?.message}</p>
                            </>
                        ) : (
                            <>
                                <label className="font-semibold">Passport Number</label>
                                <input {...register("passportNo")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5" />
                                <p className="text-sm text-red-400">{errors.passportNo?.message}</p>
                            </>
                        )}

                        <p className="my-3 font-semibold">Owner Names</p>
                        <div className="flex space-x-5">
                            <div>
                                <label className="font-semibold">Surnames</label>
                                <input {...register("surnames")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                                <p className="text-sm text-red-400">{errors.surnames?.message}</p>
                            </div>
                            <div>

                                <label className="font-semibold">Other Names</label>
                                <input {...register("other_names")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                                <p className="text-sm text-red-400">{errors.other_names?.message}</p>
                            </div>
                        </div>

                        <label className="font-semibold">Nationality</label>
                        <input {...register("nationality")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                        <p className="text-sm text-red-400">{errors.nationality?.message}</p>

                        <div className="flex justify-start mt-6 mb-5 space-x-5">
                            <div>
                                <label className="font-semibold">Phone Number</label>
                                <input {...register("phoneNo")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                                <p className="text-sm text-red-400">{errors.phoneNo?.message}</p>
                            </div>
                            <div>
                                <label className="font-semibold">Email</label>
                                <input {...register("email")} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] px-2.5 py-1.5 " />
                                <p className="text-sm text-red-400">{errors.email?.message}</p>
                            </div>
                        </div>


                        <div className="flex justify-between items-end">
                            <input type="submit" className="py-1 px-6 bg-blue-500 text-white rounded-lg cursor-pointer" style={{ width: "200px" }} value="Next" />
                        </div>
                    </div>


                </form>
            </div>

        </div>
    )
}