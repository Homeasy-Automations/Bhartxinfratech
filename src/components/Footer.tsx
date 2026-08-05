import React from "react";
import { Globe, Users, MapPin, Phone, Mail } from "lucide-react";
import { useNavigate,  Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {

const navigate = useNavigate();

return (

<footer className="bg-navy text-white pt-20 pb-10 border-t border-white/5">

<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

{/* Company Info */}
<div>

<div className="flex items-left pl-16 -mt-8 mb-2">

<div className="w-[100px] h-[100px] white-gradient rounded-sm flex items-center justify-center">
            <img
              loading="lazy"
              src="/footerlogo.png"
              alt="Bharatx Logo"
              className="w-full h-full rounded-sm object-contain"
            />
          </div>

{/*<h2 className="font-display font-bold text-xl tracking-wider">
BHARATX
</h2>*/}

</div>

<p className="text-white/60 text-sm leading-relaxed mb-6">
A Tier-1 infrastructure development and civil engineering company
delivering excellence in roads, bridges, and public infrastructure
across India.
</p>

<div className="flex space-x-4">

<a
href="https://facebook.com"
aria-label="Facebook"
target="_blank"
rel="noopener noreferrer"
className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300"
>
<FaFacebookF size={16} />
</a>

<a
href="https://twitter.com"
aria-label="Twitter"
target="_blank"
rel="noopener noreferrer"
className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300"
>
<FaXTwitter size={16} />
</a>

<a
href="https://instagram.com"
aria-label="Instagram"
target="_blank"
rel="noopener noreferrer"
className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300"
>
<FaInstagram size={16} />
</a>

<a
href="https://linkedin.com"
aria-label="LinkedIn"
target="_blank"
rel="noopener noreferrer"
className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all duration-300"
>
<FaLinkedinIn size={16} />
</a>  

{/*<div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer">
<Globe size={18} />
</div>

<div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer">
<Users size={18} />
</div>*/}

</div>

</div>

{/* Quick Links */}

<div>

<h3 className="text-gold font-semibold mb-6 tracking-wider text-sm uppercase">
Quick Links
</h3>

<ul className="space-y-2 text-sm text-white/80">

<li>
<button
onClick={() => navigate("/about")}
className="hover:text-gold transition-colors"
>
About
</button>
</li>

<li>
<button
onClick={() => navigate("/services")}
className="hover:text-gold transition-colors"
>
Services
</button>
</li>

<li>
<button
onClick={() => navigate("/projects")}
className="hover:text-gold transition-colors"
>
Projects
</button>
</li>

<li>
<button
onClick={() => navigate("/tech")}
className="hover:text-gold transition-colors"
>
Innovation
</button>
</li>

<li>
<button
onClick={() => navigate("/careers")}
className="hover:text-gold transition-colors"
>
Careers
</button>
</li>

<li>
<button
onClick={() => navigate("/investors")}
className="hover:text-gold transition-colors"
>
Investors
</button>
</li>

</ul>

</div>

{/* Expertise */}

<div>

<h3 className="text-gold font-semibold mb-6 tracking-wider text-sm uppercase">
Our Expertise
</h3>

<ul className="space-y-4 text-sm text-white/80">

<li>Road Construction & Highways</li>
<li>Bridge & Flyover Engineering</li>
<li>Government Civil Works</li>
<li>Infrastructure Maintenance</li>
<li>Smart City Projects</li>

</ul>

</div>

{/* Contact */}

<div>

<h3 className="text-gold font-semibold mb-6 tracking-wider text-sm uppercase">
Headquarters
</h3>

<div className="space-y-4 text-sm text-white/80">

<div className="flex items-start">
<MapPin className="mr-3 text-gold shrink-0" size={18} />
<p>
9th Floor, Logix Cyberpark, 
<br />
Tower-C, Sector 62, Noida,  
<br />
Uttar Pradesh – 201309, India
</p>
</div>

<div className="flex items-center">
<Phone className="mr-3 text-gold shrink-0" size={18} />
<p>+91 (981) 12-63046</p>
</div>

<div className="flex items-center">
<Mail className="mr-3 text-gold shrink-0" size={18} />
<p>info@bharatxinfratech.com</p>
</div>

</div>

</div>

</div>

{/* Bottom Bar */}

<div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/70 tracking-widest uppercase font-semibold">

<p>
© 2026 BHARATX INFRATECH PRIVATE LIMITED. ALL RIGHTS RESERVED.
</p>
{/* <Link to="/sitemap" className="hover:text-gold transition-colors">
  Sitemap
</Link> */}
<p className="mt-4 md:mt-0">
CIN: U41001BR2026PTC082273 |
</p>

</div>

</footer>

);

};

export default Footer;