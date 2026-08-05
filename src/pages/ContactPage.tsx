import { MapPin, Phone, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { submitContactForm } from "../lib/contactApi";

export default function ContactPage() {

const [name,setName]=useState("");
const [phone,setPhone]=useState("");
const [email,setEmail]=useState("");
const [requirement,setRequirement]=useState("");
const [message,setMessage]=useState("");
const [errors,setErrors]=useState<{name?:string,email?:string,phone?:string,requirement?:string,message?:string}>({});
const [status,setStatus]=useState<"idle"|"submitting"|"success"|"error">("idle");
const [statusMessage,setStatusMessage]=useState("");

const handleSubmit=async(e:any)=>{

e.preventDefault();

let newErrors:any={};

if(!name.trim()){
newErrors.name="Name is required";
}

if(!phone.trim()){
newErrors.phone="Phone number is required";
}else if(!/^[0-9]{10}$/.test(phone)){
newErrors.phone="Enter valid 10 digit phone number";
}

if(!email.trim()){
newErrors.email="Email is required";
}else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
newErrors.email="Enter a valid email";
}

if(!requirement.trim()){
newErrors.requirement="Please select a project requirement";
}

if(!message.trim()){
newErrors.message="Message is required";
}

setErrors(newErrors);

if(Object.keys(newErrors).length===0){
setStatus("submitting");
setStatusMessage("");

const result=await submitContactForm({
name,
email,
phone,
service:requirement,
message,
source:"Contact Page",
});

if(result.success){
setStatus("success");
setStatusMessage(result.message);
setName("");
setPhone("");
setEmail("");
setRequirement("");
setMessage("");
}else{
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
src="https://picsum.photos/seed/contact/1920/600"
alt="Contact"
className="w-full h-full object-cover"
/>
</div>

<div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

<h1 className="text-5xl md:text-6xl text-white font-bold mb-6">
Connect with the Architects of Progress
</h1>

<p className="text-gold font-semibold tracking-[0.3em] uppercase text-sm">
Regional Headquarters • Noida, Uttar Pradesh
</p>

</div>

</section>

<section className="py-24 bg-white">

<div className="max-w-7xl mx-auto px-6">

<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

{/* FORM */}

<div>

<h2 className="text-3xl font-bold text-navy mb-8">
Project Inquiries
</h2>

<form className="space-y-6" onSubmit={handleSubmit}>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div>

<label className="block text-xs font-bold uppercase tracking-widest text-navy/60 mb-2">
Full Name
</label>

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full p-4 bg-navy/5 border border-navy/10 focus:border-gold outline-none"
/>

{errors.name && (
<p className="text-red-500 text-sm mt-1">{errors.name}</p>
)}

</div>


<div>

<label className="block text-xs font-bold uppercase tracking-widest text-navy/60 mb-2">
Email Address
</label>

<input
type="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-4 bg-navy/5 border border-navy/10 focus:border-gold outline-none"
/>

{errors.email && (
<p className="text-red-500 text-sm mt-1">{errors.email}</p>
)}

</div>

</div>


<div>

<label className="block text-xs font-bold uppercase tracking-widest text-navy/60 mb-2">
Phone Number
</label>

<input
type="tel"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full p-4 bg-navy/5 border border-navy/10 focus:border-gold outline-none"
/>

{errors.phone && (
<p className="text-red-500 text-sm mt-1">{errors.phone}</p>
)}

</div>


<div>

<label className="block text-xs font-bold uppercase tracking-widest text-navy/60 mb-2">
Project Requirement
</label>

<select
  value={requirement}
  onChange={(e)=>setRequirement(e.target.value)}
  className="w-full p-4 bg-navy/5 border border-navy/10 focus:border-gold outline-none"
>
  <option value="">Select Requirement</option>
  <option>Road Construction</option>
  <option>Bridge & Flyover</option>
  <option>Civil Infrastructure</option>
  <option>Government Tender</option>
  <option>Other</option>
</select>

{errors.requirement && (
<p className="text-red-500 text-sm mt-1">{errors.requirement}</p>
)}


</div>


<div>

<label className="block text-xs font-bold uppercase tracking-widest text-navy/60 mb-2">
Message
</label>

<textarea
rows={5}
value={message}
onChange={(e)=>setMessage(e.target.value)}
className="w-full p-4 bg-navy/5 border border-navy/10 focus:border-gold outline-none"
/>

{errors.message && (
<p className="text-red-500 text-sm mt-1">{errors.message}</p>
)}

</div>


{status==="success" && (
<div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 text-green-800 text-sm">
<CheckCircle2 className="shrink-0 mt-0.5" size={18}/>
<span>{statusMessage}</span>
</div>
)}

{status==="error" && (
<div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
<AlertCircle className="shrink-0 mt-0.5" size={18}/>
<span>{statusMessage}</span>
</div>
)}

<button
type="submit"
disabled={status==="submitting"}
className="w-full py-4 gold-gradient text-navy font-bold tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
>
{status==="submitting" && <Loader2 className="animate-spin" size={18}/>}
{status==="submitting" ? "SUBMITTING..." : "SUBMIT INQUIRY"}
</button>

</form>

</div>



{/* CONTACT DETAILS */}

<div>

<h2 className="text-3xl font-bold text-navy mb-8">
Our Presence
</h2>


<div className="space-y-8 mb-12">

<div className="flex items-start">

<div className="w-12 h-12 gold-gradient flex items-center justify-center mr-6 shrink-0">
<MapPin className="text-navy"/>
</div>

<div>
<h4 className="text-navy font-bold text-lg mb-1">
Registered Office
</h4>

<p className="text-navy/60">
9th Floor, Logix Cyberpark, Tower-C, Sector 62, Noida,
<br/>
Uttar Pradesh – 201309, India
</p>

</div>

</div>



<div className="flex items-start">

<div className="w-12 h-12 gold-gradient flex items-center justify-center mr-6 shrink-0">
<Phone className="text-navy"/>
</div>

<div>

<h4 className="text-navy font-bold text-lg mb-1">
Contact Numbers
</h4>

<p className="text-navy/60">
+91  (981) 12-63046(Office)
</p>

</div>

</div>



<div className="flex items-start">

<div className="w-12 h-12 gold-gradient flex items-center justify-center mr-6 shrink-0">
<Mail className="text-navy"/>
</div>

<div>
<h4 className="text-navy font-bold text-lg mb-1">
Email Channels 
</h4>

<p className="text-navy/60">
info@bharatxinfratech.com
{/* <br/>
tenders@bharatxinfratech.com */}
</p>
</div>

</div>

</div>


<div className="h-80 bg-navy/5 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all mb-6 duration-700">

<iframe
src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d14009.506802444957!2d77.361002!3d28.61847!3m2!1i1024!2i768!4f13.1!2m1!1siframe%20for%209th%20Floor%20Logix%20Cyberpark%20Tower%20C%20Sector%2062%20Noida%20Uttar%20Pradesh%20201309%20India!5e0!3m2!1sen!2sin!4v1775815799461!5m2!1sen!2sin"
width="100%"
height="100%"
style={{border:0}}
loading="lazy"
/>

</div>

</div>

</div>

</div>

{/*<div className="flex items-center gap-30 justify-center">
  <img className="h-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChcfM79aVIunWa8ZiAlhEUa2RVOGFpNl-BUDTMqIA1s5m4JiQd7W2f0ppSDMmR9yP6s44oycSvcG9ktdPmeQHqE0BqcFJ1tO_Ad6rWrfGYlHcBJHVyZ8idr1ARqnOvhIiI6kUVZA1F9qPh1cL2qzhSz5uBH1Qmyco67RhmEG_3bALKdhumXd1m5uNjwenjzo4ZpxK1klQRZsZeL82DZYxap-kv6SKd0nZd1pSjbu8AtnRXhjv2vmmNrEvIv-yQ83KExY1RnQ" alt="ISO Certification Logo"/>

  <img className="h-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchZMmfaY4HYm7m7UsdKr_rPVHzCLeT2-rBdDF6n20UZcwbsqdgXCzY9PafXtGp7ACROU0YTdDVYVKwaJjiRtXOqxTygSOuJAp36cCS1PFwy3XyViPjIg4sVUtTvl6XNtwHlaq4ad1XtYCQlO6Lbg8gxTtdsSyDTiDRpcm0sKNi1DE6CwXLu1DOBj4STzxP-m3aNIrWxExRrNqRW4V2okWiFR4_Kyj0W6WUu-VR2IwmIxblrMIuOIc-WxScP4q3AtjFlEQZw" alt="National Highway Authority Logo"/>

  <img className="h-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT7mXTgo6moAe1LJya6h_y6wS-boj4HoxXUfjm_NV1hZxC7ozm1tIB1IAfuJNUGDYtb1O1Qx3lCD3BkWbgZKaLeDEHupGv4KINyAXRlgCvSff7kOanECUqinL03ZMJKhVCIT2ojqVGetIoRHSgWxECyuTcFVXRcitR1BXkg4hvyaDBOYm2lPhgBweAwpiVFUxRGWvaGgHelBKeM9db8GJeQ5WUQwyHezbaArP4N8pcSF4e9kJ3Lba9AynOHkmnbBY53paZCA" alt="Indian Green Building Council Logo"/>

  <img className="h-20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZLpOkc8n8UD2MVVfAEc56mXlJoDsE2mx5XTP7x8DGyBrWvd6_xobjcG8aI8PgbxgT-KI119M0Br7aANQzrD5YEt0i905w5l9kq3KjtqnojCaUVRiXe0ncd31m-g4GmVAzXUHcWCUWnKMCwYtp3FS9f9NQV2PEfZpKUn42L5EC29yECguMpZn2nzhSpRaFQSPBB0qWZ4wuEv8_M9kQeUTyejdbo7CW8yXMcye3CvTTPinupj4DDXFa2DAzfkGlZbKPaY5sag" alt="Ministry of Infrastructure Logo"/>
</div>*/}

</section>

</div>

);
}