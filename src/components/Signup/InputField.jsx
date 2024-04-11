import { IoIosWarning } from "react-icons/io";

export default function InputField({ name, placeholder, register, errors }) {
  return (
    <div className="flex flex-col gap-1 w-full md:w-auto">
      <div className="flex items-center gap-1 text-lg font-bold">
        {errors[name] && <IoIosWarning className="text-red-500" />}
        <label htmlFor="" className={`capitalize `}>
          {name}
        </label>
      </div>
      <input
        type={name == "password" ? "password" : "text"}
        name={name}
        placeholder={placeholder}
        className={`${
          errors[name] ? "bg-red-100 text-red-500" : "bg-gray-100"
        } py-2 rounded-md outline-none px-2 md:w-auto w-full`}
        {...register(name)}
      />
      <span className="text-red-500">{errors[name]?.message}</span>
    </div>
  );
}
