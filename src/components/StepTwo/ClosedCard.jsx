export default function ClosedCard({ SVG_IMAGE, text }) {
  return (
    <div className="border border-neutral-300 max-w-72 flex flex-col justify-center cursor-pointer rounded-lg p-5 gap-3">
      <img className="h-48" src={SVG_IMAGE} />
      <h1 className="font-bold text-lg text-center">{text}</h1>
      <div className="flex  justify-center">
        <div className="h-8 w-8 rounded-full border"></div>
      </div>
    </div>
  );
}
