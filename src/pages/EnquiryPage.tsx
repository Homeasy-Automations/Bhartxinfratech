import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "../lib/contactApi";

type FormDataType = {
  name: string;
  company: string;
  email: string;
  phone: string;
  enquiry: string;
  message: string;
};

type ErrorsType = {
  name?: string;
  email?: string;
  phone?: string;
  enquiry?: string;
  message?: string;
};

export default function EnquiryPage() {

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    company: "",
    email: "",
    phone: "",
    enquiry: "",
    message: ""
  });

  const [errors, setErrors] = useState<ErrorsType>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let newErrors: ErrorsType = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit phone number";
    }

    if (!formData.enquiry.trim()) {
      newErrors.enquiry = "Please select an enquiry type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      setStatus("submitting");
      setStatusMessage("");

      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.enquiry || "General Enquiry",
        message: formData.message,
        source: "Enquiry Page",
      });

      if (result.success) {
        setStatus("success");
        setStatusMessage(result.message);

        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          enquiry: "",
          message: ""
        });
      } else {
        setStatus("error");
        setStatusMessage(result.message);
      }
    }
  };

  return (
    <div className="pt-24">

      {/* HERO */}

      <section className="relative py-32 bg-navy">

        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/construction/1920/600"
            className="w-full h-full object-cover"
            alt="Enquiry"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">
            Business Enquiry
          </p>

          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Project & Partnership Enquiry
          </h1>

          <p className="text-white/70 mt-6 max-w-2xl mx-auto">
            Reach out to Bharatx Infratech for infrastructure collaborations,
            government tenders, civil engineering projects, or partnership
            opportunities.
          </p>

        </div>

      </section>

      {/* CONTACT + FORM */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          {/* CONTACT INFO */}

          <div>

            <h2 className="text-3xl font-bold text-navy mb-8">
              Contact Information
            </h2>

            <p className="text-navy/70 mb-10">
              Our infrastructure team is available to discuss project
              opportunities, government tenders, and strategic partnerships.
            </p>

            <div className="space-y-6">

              <div className="flex items-center">
                <Phone className="text-gold mr-4" />
                <span className="text-navy font-medium">
                  +91 98112 63046
                </span>
              </div>

              <div className="flex items-center">
                <Mail className="text-gold mr-4" />
                <span className="text-navy font-medium">
                  contact@bharatxinfratech.com
                </span>
              </div>

              <div className="flex items-start">
                <MapPin className="text-gold mr-4 mt-1" />
                <span className="text-navy font-medium">
                  9th Floor, Logix Cyberpark, Tower-C, Sector 62, Noida, 
                  <br />
                  Uttar Pradesh – 201309, India
                </span>
              </div>

            </div>

            <div className="mt-10">
              <img
                src="/civilinfra.png"
                alt="Infrastructure Project"
                className="w-full h-[550px] object-cover rounded-lg shadow-lg"
              />
            </div>

          </div>


          {/* ENQUIRY FORM */}

          <div className="bg-navy/[0.02] border border-navy/10 p-10">

            <h2 className="text-2xl font-bold text-navy mb-8">
              Send an Enquiry
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* NAME */}

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-navy/20 p-3 focus:outline-none focus:border-gold"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>


              {/* COMPANY */}

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">
                  Company / Organization
                </label>

                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-navy/20 p-3 focus:outline-none focus:border-gold"
                />
              </div>


              {/* EMAIL */}

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-navy/20 p-3 focus:outline-none focus:border-gold"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>


              {/* PHONE */}

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+91"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-navy/20 p-3 focus:outline-none focus:border-gold"
                />

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>


              {/* ENQUIRY TYPE */}

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">
                  Enquiry Type
                </label>

                <select
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  className="w-full border border-navy/20 p-3 focus:outline-none focus:border-gold"
                >
                  <option value="">Select Enquiry Type</option>
                  <option value="Project Partnership">Project Partnership</option>
                  <option value="Government Tender">Government Tender</option>
                  <option value="Vendor Registration">Vendor Registration</option>
                  <option value="Infrastructure Consultancy">Infrastructure Consultancy</option>
                  <option value="Career / HR">Career / HR</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>

                {errors.enquiry && (
                  <p className="text-red-500 text-sm mt-1">{errors.enquiry}</p>
                )}

              </div>


              {/* MESSAGE */}

              <div>
                <label className="text-sm font-semibold text-navy block mb-2">
                  Message
                </label>

                <textarea
                  rows={4}
                  name="message"
                  placeholder="Describe your enquiry"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-navy/20 p-3 focus:outline-none focus:border-gold"
                />

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>


              {/* STATUS */}

              {status === "success" && (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
                  <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                  <span>{statusMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="gold-gradient px-8 py-4 font-bold text-navy flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Submit Enquiry
                    <Send className="ml-2" size={18} />
                  </>
                )}
              </button>

            </form>

          </div>

        </div>

      </section>

    </div>
  );
}