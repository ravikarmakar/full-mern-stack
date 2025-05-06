import * as React from "react";
import { registerSchema } from "../schemas/auth.schema";

const Register = () => {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [userData, setUserData] = React.useState(null);
  const [formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (e) => {
    setFormData((prevVal) => ({ ...prevVal, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Zod Valdation
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setFormErrors(formattedErrors);
      return;
    }
    setFormErrors({});

    // Backend Call
    const res = await fetch("http://localhost:4001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Error to register user: ${errorData.message}`);
    }

    const resData = await res.json();
    setUserData(resData.data);

    // Clear Inputs
    setFormData({
      lastName: "",
      firstName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        {!userData && (
          <div className="space-y-2 mt-6">
            <form onSubmit={handleSubmit} className="space-y-2 mt-6">
              <div className="flex flex-col">
                <label htmlFor="firstName">FirstName</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-gray-500 py-1 px-2 rounded-lg"
                />
                {formErrors.firstName && (
                  <p className="text-red-600">{formErrors.firstName}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName">LastName</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange(e)}
                  className="border border-gray-500 py-1 px-2 rounded-lg"
                />
                {formErrors.lastName && (
                  <p className="text-red-600">{formErrors.lastName}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange(e)}
                  autoComplete="current-email"
                  className="border border-gray-500 py-1 px-2 rounded-lg"
                />
                {formErrors.email && (
                  <p className="text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) => handleInputChange(e)}
                  autoComplete="current-password"
                  className="border border-gray-500 py-1 px-2 rounded-lg"
                />
                {formErrors.password && (
                  <p className="text-red-600">{formErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-5 border border-gray-400 py-1 px-2 rounded-xl cursor-pointer"
              >
                Register
              </button>
            </form>
          </div>
        )}

        <div className="mt-10">
          <h1 className="text-3xl">
            Welcome{" "}
            <span className="text-blue-400">{userData && userData?.name}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
