import SignUpImage from "../assets/signup.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/Signup/InputField";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { api_base_url } from "../COSTANTS";
import { useNavigate } from "react-router-dom";
const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  agree: yup.boolean().required().isTrue(),
});
export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  async function onSubmit(data) {
    console.log(data);
    try {
      setLoading(true);
      const response = await axios.post(`${api_base_url}/signup`, data);
      if (response.status == 200) {
        setError("");
        toast.success(response.data?.message);
        localStorage.setItem("id", response.data.data.id);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/step1", {
          replace: true,
        });
      }
    } catch (error) {
      setError(error?.response?.data?.message || error.message);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }
  console.log(errors);
  return (
    <section className="h-screen">
      <main className="flex h-full ">
        <div className="w-[30%] bg-amber-200 justify-center gap-7  flex-col px-12 hidden xl:flex">
          <div className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="40"
              viewBox="0 0 210 59"
              fill="#92400e"
            >
              <title>Dribbble: the community for graphic design</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M206.622 31.928C207.065 31.4116 207.85 31.4352 208.253 31.986H208.25L209.784 34.0834C210.075 34.4864 210.073 35.0425 209.769 35.4349C207.106 38.8893 202.44 42.2143 196.81 42.5359C192.366 42.7887 188.701 41.1051 186.706 37.9221C186.311 37.2925 185.44 37.2557 184.997 37.8511C182.63 41.0286 179.766 43.5134 176.782 43.6845C171.467 43.9876 169.966 40.4228 171.28 32.563C171.412 31.7805 170.726 31.1192 169.987 31.3141C168.885 31.6065 167.715 31.7356 166.528 31.633C166.034 31.5907 165.571 31.8912 165.422 32.3811C163.455 38.8418 158.774 44.8518 152.715 45.1997C148.847 45.421 143.069 43.205 143.647 33.9462C143.695 33.1927 143.019 32.5999 142.323 32.8106C141.11 33.1795 139.804 33.3534 138.474 33.2401C137.981 33.1979 137.52 33.4983 137.371 33.9885C135.404 40.449 130.723 46.4592 124.664 46.8068C120.796 47.0282 115.018 44.8124 115.596 35.5536C115.644 34.7998 114.968 34.207 114.272 34.418C113.059 34.7869 111.753 34.9634 110.423 34.8473C109.93 34.8053 109.469 35.1057 109.32 35.5956C107.352 42.0564 102.672 48.0664 96.6132 48.4142C93.8613 48.5723 90.1398 47.4945 88.4308 43.5264C88.1016 42.7599 87.1144 42.6438 86.6257 43.3105C84.2334 46.5751 81.3193 49.152 78.2762 49.3259C75.1571 49.505 73.4509 48.2535 72.7091 46.0216C72.4458 45.2339 71.4609 45.0467 70.9293 45.6712C68.8002 48.1744 66.3749 50.0082 63.9216 50.1479C60.1393 50.3666 57.9619 47.563 57.7823 44.1667C57.5747 40.204 59.2887 35.564 61.2025 30.4999C61.4684 29.7964 60.9873 29.0348 60.2608 29.0032C59.157 28.956 57.8963 28.8399 56.7113 28.6185C56.1771 28.5159 55.6583 28.8479 55.5063 29.3907C53.243 37.4716 49.7771 45.392 46.8529 50.074C46.5263 50.5984 45.8505 50.7381 45.3593 50.377L43.1264 48.7331C42.6682 48.393 42.5441 47.7397 42.8504 47.247C47.0759 40.478 50.8278 29.8807 52.1215 22.0421C52.2025 21.5415 52.61 21.17 53.0986 21.141L56.0683 20.9697C56.7493 20.9302 57.2861 21.5652 57.162 22.2634L57.1493 22.3372C57.0379 22.959 57.4532 23.5439 58.0532 23.6257C60.7164 23.992 64.6963 24.0366 67.3975 23.9313C68.157 23.9023 68.6938 24.6875 68.4178 25.4226C66.2507 31.1876 63.3469 39.1765 63.5139 42.3382C63.5899 43.7662 64.2204 44.5462 65.3291 44.4829C67.4508 44.3619 70.7141 40.0959 73.1876 35.3455C73.2331 35.261 73.2659 35.169 73.2862 35.0741C74.1196 31.3543 75.3565 27.2068 76.6061 23.0163L76.6837 22.7561C76.8128 22.3188 77.1901 22.0131 77.6306 21.9868L81.1876 21.7839C81.9219 21.7417 82.4712 22.4795 82.2485 23.2093C82.0654 23.8112 81.883 24.409 81.7023 25.0014C78.5723 35.2603 75.9438 43.8759 79.4838 43.6742C81.7978 43.5422 85.0764 39.6164 87.8966 34.0279C87.9421 33.9356 87.9751 33.8381 87.9954 33.7355C88.1372 33.0055 88.3092 32.2416 88.5195 31.4432C90.1639 24.8753 92.0286 18.3691 93.8955 11.855C94.4717 9.8446 95.0481 7.83341 95.6182 5.81945C95.7449 5.37417 96.1245 5.06062 96.57 5.03426L100.221 4.82611C100.963 4.78396 101.512 5.52962 101.279 6.26474C99.8208 10.8388 98.2967 15.7106 96.8487 20.4006C96.5448 21.3887 97.603 22.2107 98.4386 21.6416C99.8791 20.6562 101.545 20.0027 103.158 19.9105C107.267 19.676 110.064 23.0565 110.332 28.1496C110.347 28.4184 110.363 28.7082 110.37 29.0032C110.385 29.5673 110.808 30.023 111.348 30.0704C113.282 30.2417 115.259 29.6673 116.786 28.3051C116.943 28.1654 117.049 27.9757 117.102 27.7701C118.616 21.8916 120.287 16.0568 121.959 10.2147C122.532 8.21455 123.105 6.21353 123.672 4.20956C123.798 3.76427 124.178 3.45072 124.624 3.42438L128.274 3.21623C129.016 3.17408 129.566 3.91972 129.333 4.65484C127.874 9.22892 126.35 14.1007 124.902 18.7907C124.598 19.7788 125.657 20.6008 126.492 20.0317C127.933 19.0463 129.599 18.3929 131.211 18.3006C135.32 18.0662 138.117 21.4466 138.386 26.5399C138.401 26.8084 138.416 27.0985 138.424 27.3935C138.436 27.9573 138.862 28.4132 139.401 28.4607C141.335 28.6318 143.312 28.0573 144.839 26.6951C144.996 26.5557 145.102 26.3659 145.156 26.1604C146.67 20.2818 148.34 14.4471 150.013 8.6051C150.586 6.60484 151.158 4.60372 151.725 2.59968C151.852 2.15439 152.232 1.84085 152.677 1.8145L156.328 1.60635C157.07 1.56419 157.619 2.30985 157.386 3.04497C155.928 7.61902 154.404 12.4908 152.956 17.1808C152.652 18.1689 153.71 18.991 154.546 18.4219C155.986 17.4364 157.652 16.783 159.265 16.6908C163.374 16.4563 166.171 19.8367 166.44 24.9299C166.455 25.2013 166.47 25.4885 166.477 25.7835C166.493 26.3447 166.913 26.8032 167.452 26.8507C169.323 27.0166 171.237 26.4844 172.741 25.2171C172.908 25.0774 173.024 24.8798 173.08 24.6637C174.804 18.0187 177.336 9.31324 179.777 0.981894C179.906 0.541877 180.285 0.236236 180.726 0.209888L184.344 0.0017367C185.078 -0.0404207 185.627 0.692063 185.407 1.42191C182.047 12.5778 179.308 22.3372 177.797 28.0944C175.789 35.9039 175.711 38.1567 177.994 38.025C179.911 37.9143 182.493 35.1952 184.928 31.0847C185.025 30.924 185.075 30.7397 185.083 30.5526C185.402 22.324 190.447 14.8385 197.946 14.409C202.969 14.1218 205.721 17.916 205.918 21.6495C206.293 28.7767 199.248 33.3324 192.42 32.9107C191.625 32.8606 191.047 33.7145 191.397 34.4574C192.351 36.4967 194.359 37.6352 197.787 37.4374C201.048 37.2531 204.468 34.439 206.622 31.928ZM93.7548 33.9278C92.1345 40.4228 94.1017 42.9652 96.646 42.8203C100.823 42.5805 104.864 34.9263 104.553 29.019C104.416 26.4396 102.907 25.0958 101.145 25.1961C98.2106 25.3646 95.0512 28.745 93.7548 33.9278ZM121.808 32.3207C120.188 38.8154 122.155 41.3581 124.7 41.2131H124.697C128.874 40.9734 132.917 33.3192 132.606 27.4119C132.472 24.8324 130.96 23.4886 129.198 23.5887C126.264 23.7574 123.105 27.1379 121.808 32.3207ZM149.862 30.7133C148.242 37.2082 150.209 39.7509 152.753 39.606H152.751C156.925 39.3662 160.971 31.712 160.66 25.8047C160.525 23.2251 159.014 21.8814 157.252 21.9815C154.318 22.1501 151.158 25.5307 149.862 30.7133ZM200.584 22.2239C200.559 20.5218 199.513 19.2887 197.817 19.3862H197.815C194.483 19.5785 191.875 23.1856 191.045 27.562C190.913 28.2577 191.422 28.9058 192.103 28.8899C196.407 28.7821 200.721 25.9416 200.584 22.2239ZM44.3525 25.3837C43.9171 12.1962 35.3423 3.49339 22.6712 3.94658C17.2307 4.19426 11.0052 6.25733 6.32164 9.9461C5.88113 10.2939 5.76719 10.9315 6.06593 11.4163L8.05331 14.6519C8.39254 15.2052 9.11407 15.3185 9.60776 14.9075C13.1724 11.9459 18.0383 10.0041 22.7193 9.79855C31.403 9.43757 37.7828 14.9971 38.1551 25.7367C38.6209 38.2417 30.2157 52.5461 16.7091 53.3207C16.2382 53.3471 15.7471 53.3577 15.2559 53.3577C14.5673 53.3577 14.0585 52.6858 14.2306 51.9901C16.8357 41.4744 19.8763 30.1974 22.9776 19.7029C23.1928 18.973 22.6459 18.2458 21.9143 18.288L17.9648 18.5146C17.5218 18.5409 17.142 18.8492 17.0129 19.2918C14.0331 29.6045 11.0508 40.7895 8.36723 51.284C8.21279 51.89 7.59761 52.2379 7.02544 52.0427C5.62543 51.566 4.34693 51.0232 3.2583 50.3881C2.73677 50.0825 2.07601 50.2987 1.80765 50.8571L0.11142 54.4037C-0.139216 54.9281 0.0455967 55.5709 0.539275 55.8527C4.38489 58.0345 10.223 59.2806 16.0914 58.9462C35.4032 57.8393 44.864 40.0015 44.3525 25.3889V25.3837ZM82.3044 9.18082C79.955 9.31518 77.8713 11.9553 78.0183 14.7377C78.1143 16.5715 79.2917 17.7967 81.1195 17.694C83.4689 17.5596 85.6106 14.7798 85.4714 12.1318C85.3754 10.298 84.0005 9.08333 82.3044 9.18082Z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-amber-800">
            Discover the world&apos;s top Designers & Creatives.
          </h1>
          <img src={SignUpImage} />
        </div>
        <div className="xl:w-[70%] w-full px-2">
          <div className="flex justify-end px-6 py-7 text-md font-medium ">
            <h1>
              Already a member?
              <span className="text-blue-800"> Sign In</span>
            </h1>
          </div>
          <div className="flex justify-center   ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
              <h1 className="text-3xl font-bold mb-3">Sign up to Dribbble</h1>
              {error && <span className="text-red-500 ">&#x2022; {error}</span>}
              <div className="flex w-full flex-wrap gap-4">
                <InputField
                  name="name"
                  placeholder="John Doe"
                  register={register}
                  errors={errors}
                />
                <InputField
                  name="username"
                  placeholder="johndoe"
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <InputField
                  name="email"
                  placeholder="johndoe@example.com"
                  register={register}
                  errors={errors}
                />
              </div>
              <div>
                <InputField
                  name="password"
                  placeholder="6+characters"
                  register={register}
                  errors={errors}
                />
              </div>

              <div className="flex max-w-md gap-3 ">
                <input
                  type="checkbox"
                  name="agree"
                  id=""
                  className={`scale-150 mb-7`}
                  {...register("agree")}
                />

                <div className="mx-w-sm leading-5 text-md text-gray-600 font-medium">
                  Creating an account means you&apos;re okay with our{" "}
                  <span className="text-indigo-600">
                    Terms of Service, Privacy Policy,
                  </span>{" "}
                  and our default
                  <span className="text-indigo-600">
                    {" "}
                    Notification Settings.
                  </span>
                </div>
              </div>
              <span className="text-red-500 text-sm">
                {errors.agree?.message ? "Please agree to our terms" : ""}
              </span>
              <div>
                {loading ? (
                  <button
                    disabled
                    type="button"
                    className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-pink-500 hover:bg-pink-400 transition ease-in-out duration-150 cursor-not-allowed"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </button>
                ) : (
                  <button className="bg-pink-500 py-2 px-7 text-white font-semibold rounded-md">
                    Create Account
                  </button>
                )}
              </div>
              <div>
                <p className="text-xs w-80 font-medium text-gray-400">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <span className="text-indigo-600">Privacy Policy</span> and{" "}
                  <span className="text-indigo-600">Terms of Service</span>{" "}
                  apply.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
