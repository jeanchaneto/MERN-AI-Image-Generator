import { useState } from "react";
import { preview } from "../assets";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {};

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const surpriseMeHandler = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({
      ...form,
      prompt: randomPrompt,
    });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "http://localhost:8080/api/v1/imagegenerator",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className=" max-w-7xl mx-auto ">
      <div>
        <h1 className="font-extrabold text-[#22328] text-[32px] ">Generate</h1>
        <p className=" mt-2 text-[#666e75] text-base max-w-[500px]">
          Generate imaginative and visually stunning images
        </p>
      </div>
      <form className=" mt-16 max-w-3xl" onSubmit={submitHandler}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Deano"
            value={form.name}
            onChange={changeHandler}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A synthwave style sunset above the reflecting water of the sea, digital art"
            value={form.prompt}
            onChange={changeHandler}
            isSurpriseMe
            onSurpriseMe={surpriseMeHandler}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className=" w-full h-full object-contain "
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className=" w-9/12 h-3/4 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
          <div className="mt-5 flex gap-5">
            <button
              type="button"
              onClick={generateImage}
              className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button>
          </div>
          <div className="mt-10">
            <p className="mt-2 text-[#666e75] text-[14px]">
              Share an image you have created with the community
            </p>
            <button
              type="submit"
              className=" mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center block"
            >
              {loading ? "sharing..." : "Share with the community"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
