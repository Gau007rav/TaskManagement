import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-blue-600 flex items-center justify-center text-center text-white px-6">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold"
          >
            About CA Foundation Course
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-lg md:text-xl"
          >
            Kickstart your journey to becoming a Chartered Accountant with a
            strong foundation.
          </motion.p>
        </div>
      </section>

      {/* Course Overview */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-gray-800 text-center"
        >
          What is the CA Foundation Course?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-gray-600 text-center"
        >
          The CA Foundation is the entry-level exam for aspiring Chartered
          Accountants, covering key subjects like accounting, business laws,
          economics, and quantitative aptitude.
        </motion.p>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Why Choose CA Foundation?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {[
            {
              title: "Expert Faculty",
              description: "Learn from the best professionals in the industry.",
            },
            {
              title: "Comprehensive Syllabus",
              description:
                "Covers all fundamental topics required for CA exams.",
            },
            {
              title: "Flexible Learning",
              description:
                "Study at your own pace with online and offline options.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-blue-100 p-6 rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {item.title}
              </h3>
              <p className="text-gray-700 mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-semibold"
        >
          Ready to Begin Your CA Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-lg"
        >
          Enroll now and take the first step towards becoming a Chartered
          Accountant!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-6"
        >
          <Link
            to="/courses"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-100"
          >
            Explore Courses
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
