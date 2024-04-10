import { IoMdCheckmarkCircle } from "react-icons/io";
export default function OpenCard({ SVG_IMAGE, text }) {
  return (
    <div
      className="border-2 border-pink-500 max-w-72 relative flex flex-col justify-center 
    items-center cursor-pointer rounded-lg p-5 gap-3"
    >
      <img className="h-48 absolute -top-16 left-10 " src={SVG_IMAGE} />
      <h1 className="font-bold text-lg text-center mt-28">{text}</h1>
      <p className="text-sm text-neutral-500">
        With over 7 million shots from a vast community of desingers. Dribbble
        is the leading source of design inspiration
      </p>
      <div className="flex  justify-center">
        <IoMdCheckmarkCircle className="fill-pink-500 text-3xl" />
      </div>
    </div>
  );
}
