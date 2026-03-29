import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hinhLogin from "../assets/image.png";
import api from "../libs/axios";
// import api from "../libs/axios"; // nếu bạn có axios

function AdminLoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // xoá lỗi khi nhập
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validate()) return;

    try {
      // 👉 gọi API thật ở đây

      const response = await api.post("/users/login", form);
      if (response) {
        console.log("đăng nhập admin thành công");
      }
      // giả lập login
      console.log("LOGIN:", form);

      localStorage.setItem("admin_token", response.data.token);
      // localStorage.setItem("admin_token", JSON.stringify(response.data.token));
      console.log(response.data.token);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ================= LEFT ================= */}
      <div
        className="hidden lg:flex w-1/2 relative text-white px-20 items-center"
        style={{
          backgroundImage: `url(${hinhLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* content */}
        <div className="relative z-10 max-w-lg">
          <p className="text-xs tracking-[0.3em] mb-6 text-gray-300">
            EST. 1894
          </p>

          <h1 className="text-6xl font-serif  leading-tight">
            <span className="italic  text-gray-300"> The Silent</span>
            <br />
            <span className="italic text-[#c6a27e]">Craft</span>
            <span className="italic text-gray-300"> of</span>
            <br />
            <span className="italic text-gray-300"> Time.</span>
          </h1>

          <p className="mt-6 text-gray-300 text-sm leading-relaxed mt-">
            Access the world’s most prestigious private horological archive.
            Every mechanism tells a story of precision and permanence.
          </p>
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f5f5f3] px-6">
        <div className="w-full max-w-md bg-white/90 p-10 shadow-xl">
          {/* TITLE */}
          <h2 className="text-2xl font-serif text-[#6b4b2a] mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Enter your credentials to access the vault.
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wide text-gray-500">
                Username or Email
              </label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="chronos@archive.com"
                className={`w-full mt-2 p-3 bg-gray-100 outline-none ${
                  isSubmitted && errors.email ? "border border-red-500" : ""
                }`}
              />
              {isSubmitted && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500">
                <label>Password</label>
                <span className="cursor-pointer hover:text-black">
                  Forgot password?
                </span>
              </div>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full mt-2 p-3 bg-gray-100 outline-none ${
                  isSubmitted && errors.password ? "border border-red-500" : ""
                }`}
              />

              {isSubmitted && errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
              <input type="checkbox" />
              <span>Remember this session</span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#6b4b2a] text-white py-3 uppercase tracking-[0.2em] hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-xs text-center mt-6 text-gray-500">
            Restricted Access • Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
