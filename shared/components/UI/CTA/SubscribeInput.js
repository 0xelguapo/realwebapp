import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function SubscribeInput(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { ref, ...rest } = register("email", {
    required: true,
    minLength: 5,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Please enter a valid email address",
    },
  });
  const inputRef = useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    let response;
    try {
      response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
    if(response) router.push("/subscribe/success")
    console.log(response)
  };


  useEffect(() => {
    if(props.focus) inputRef.current.focus();
  }, [props.focus]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap w-full items-center justify-center"
      >
        <input
          {...rest}
          name="email"
          ref={(e) => {
            ref(e);
            inputRef.current = e;
          }}
          className="shadow-lg appearance-none border border-stone-400 rounded py-2 px-3 text-gray-700 focus:outline-slate-400 focus:shadow-outline grow"
          placeholder="youremail@domain.com"
        />
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={errors.email}
          className="w-full h-9 mt-3 shadow-xl rounded text-white bg-blue-500 md:w-36 md:grow-0 md:ml-3 md:mt-0 md:h-10 hover:bg-blue-600 hover:shadow-2xl hover:cursor-pointer"
        >
          Join Free
        </button>
      </form>
      {errors.email && (
        <p className="text-sm text-rose-600 mt-3">
          Please enter a valid email!
        </p>
      )}
    </>
  );
}
