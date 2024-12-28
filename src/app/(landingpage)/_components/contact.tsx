import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <section
      id="contact"
      className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contact Us
        </h2>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Don't hesitate to reach out using the information below:
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#7D0303]" />
                <span>W375+4J8, R.T.Lim St, Zamboanga, Zamboanga del Sur</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#7D0303]" />
                <span>(062) 993 5096</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#7D0303]" />
                <span>admin@zppsu-drms.online</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1307.5780589233772!2d122.0599213!3d6.9149936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x325041ddc653c873%3A0xe6618d24408bbb26!2sZamboanga%20Peninsula%20Polytechnic%20State%20University!5e0!3m2!1sen!2sph!4v1696840704844!5m2!1sen!2sph&z=18&t=k"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
