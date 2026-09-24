export default function NotFound() {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col">
        <h1 className="text-8xl font-mont font-bold text-amber-50 lg:text-9xl">
          MAAF!
        </h1>
        <p className="font-pop font-semibold text bg-amber-50 px-5 rounded-sm text-center text-sm">
          Area yang anda masukan tidak terdaftar
        </p>
      </div>
    </>
  );
}
