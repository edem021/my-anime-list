import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Loading from "../Loading";
import z from "zod";

const vtuberSchema = z.object({
  name: z.string().min(3, "The name must be at least 3 chacarters long"),
  twitter: z.string().url({ message: "Invalid Url format" }),
});

const CreateVtuberForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [vtuberForm, setVtuberForm] = useState({
    name: "",
    twitter: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setVtuberForm({ ...vtuberForm, [event.target.name]: event.target.value });
  };

  const handleSumbit = async (event) => {
    event.preventDefault();

    const result = vtuberSchema.safeParse(vtuberForm);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      toast.error("Please fix your mistakes in the form");
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/vtuber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vtuberForm),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      const data = await res.json();

      console.log(data);

      toast.success("Vtuber created successfully");

      navigate("/vtuber");
    } catch (error) {
      console.error("Error sending form data", error);
      toast.error("Couldn't submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="border-t border-b border-dashed flex flex-col gap-2 p-5 w-full"
      onSubmit={handleSumbit}
    >
      <h2 className="text-xl">Create Vtuber</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={vtuberForm.name}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.name && (
          <p className="text-error text-sm mb-2">{errors.name}</p>
        )}

        <input
          type="text"
          name="twitter"
          placeholder="Twitter link"
          value={vtuberForm.twitter}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        {errors.twitter && (
          <p className="text-error text-sm mb-2">{errors.twitter}</p>
        )}
      </div>

      <div className="pt-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="rounded-md px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold text-lg uppercase tracking-wide cursor-pointer"
        >
          {loading ? (
            <div className="flex gap-1 items-center">
              <span>Creating...</span>
              <Loading size={"1.5rem"} />
            </div>
          ) : (
            "Submit"
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default CreateVtuberForm;
