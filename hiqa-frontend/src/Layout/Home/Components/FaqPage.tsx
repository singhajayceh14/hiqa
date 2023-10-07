import { memo, useState } from 'react';
const faqItems = [
  {
    question: 'What is HIQA Institute?',
    answer:
      'HIQA Institute is a specialized training and certification institution that offers programs aligned with both national and international industrial standards. Our focus is on skill development and professional certification without the requirement of general education system accreditation.',
  },
  {
    question: 'How are your programs different from traditional education?',
    answer:
      'Our programs prioritize practical skills that are directly applicable to real-world industry scenarios. We offer certifications based on skill acquisition and mastery, rather than relying on traditional educational accreditation.',
  },
  {
    question: 'What industries do you cover?',
    answer:
      'We cover a wide range of industries including manufacturing, oil & gas, fertilizers & chemicals, petrochemicals & refineries, railways, aerospace, construction, technology, healthcare, and more. Our programs are designed to cater to the demands of various sectors.',
  },
  {
    question: 'Are your certifications recognized by employers?',
    answer:
      'Yes, our certifications are highly regarded by employers as they are aligned with industry standards.Graduates from our programs often find enhanced employability and career advancement opportunities.',
  },
  {
    question: 'Who teaches the programs?',
    answer:
      'Our instructors are experienced professionals with deep insights into industry practices. They provid mentorship and guidance throughout the learning process.',
  },
  {
    question: 'Do you offer flexible learning options?',
    answer:
      'Absolutely, we understand that everyone`s schedule is different. Our flexible learning paths accommodate a variety of schedules and learning styles.',
  },
  {
    question: 'What are the benefits of non-accreditation approach?',
    answer:
      'The non-accreditation approach allows us to tailor our programs to the evolving needs of industries without being constrained by traditional educational systems. This ensures that you receive the most up-to-date and relevant training.',
  },
  {
    question: 'How are the programs structured?',
    answer:
      'Our programs are structured with a mix of theory and hands-on training. You`ll engage in workshops, simulations, and real projects to develop practical skills.',
  },
  {
    question: 'Can I enrol as a recent high school graduate or as a working professional?',
    answer:
      'Absolutely, our programs are designed to accommodate a variety of individuals, including recent graduates, professionals looking to upskill, and those seeking a career change.',
  },
  {
    question: 'How can I apply for a program?',
    answer:
      'Visit our website to explore our program offerings. You can find detailed information about each program, admission requirements, and application procedures.',
  },
  {
    question: 'What are the career prospects after completing a program?',
    answer:
      'Completing a program at HIQA Institute can significantly enhance your career prospects. You`ll be better equipped to excel in your chosen industry and take advantage of new opportunities.',
  },
  {
    question: 'Do you offer financial aid or scholarships?',
    answer: 'We provide 100% scholarship. Our programmes do not charge any fees (except application process).',
  },
  {
    question: 'How do I get in touch with the institute for more information?',
    answer:
      'You can reach out to us through our website`s contact page or call our admissions hotline. We`re here to answer any questions you may have and guide you through the process.',
  },
  {
    question: 'Can international students apply?',
    answer:
      'Yes, we welcome international students to apply for our programs. However, admission process for international students shall be different as general. Please refer to our website for information on international admissions.',
  },
  {
    question: 'What is the duration of your programs?',
    answer:
      'Program durations vary depending on the specific program you choose. You can find detailed information about program durations on our website.',
  },
  {
    question: 'Do you offer job placement services?',
    answer:
      'We guaranty Job placement and a minimum 3-month to up to 6 months paid internship. We are sure that with good training, any training will mark up a fix position with respective employer by their best performance and employer satisfaction.',
  },
];

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? 0 : index));
  };
  return (
    <section className="faq-area pt-120 pb-120 p-relative fix">
      <div className="animations-10">
        <img src="assets/img/bg/an-img-04.png" alt="an-img-01" />
      </div>
      <div className="animations-08">
        <img src="assets/img/bg/an-img-05.png" alt="contact-bg-an-01" />
      </div>
      <div className="container">
        <div className="row justify-content-center  align-items-center">
          <div className="col-lg-7">
            <div
              className="section-title wow fadeInLeft animated"
              data-animation="fadeInDown animated"
              data-delay=".2s"
            >
              <h2>Get every single answer here.</h2>
              <p>
                A business or organization established to provide a particular service, typically one that involves a
                organizing transactions.
              </p>
            </div>
            <div className="faq-wrap mt-30 pr-30">
              <div className="accordion" id="accordionExample">
                {faqItems.map((item, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id={`heading${index}`}>
                      <h2 className="mb-0">
                        <button
                          className={`faq-btn${activeIndex === index ? '' : ' collapsed'}`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          onClick={() => handleToggle(index)}
                        >
                          {item.question}
                        </button>
                      </h2>
                    </div>
                    <div
                      id={`collapse${index}`}
                      className={`collapse${activeIndex === index ? ' show' : ''}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="card-body">{item.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="contact-bg02">
              <div className="section-title wow fadeInDown animated" data-animation="fadeInDown" data-delay=".4s">
                <h2>Make An Contact</h2>
              </div>
              <form
                action="mail.php"
                method="post"
                className="contact-form mt-30 wow fadeInUp animated"
                data-animation="fadeInUp"
                data-delay=".4s"
              >
                <div className="row">
                  <div className="col-lg-12">
                    <div className="contact-field p-relative c-name mb-20">
                      <input type="text" id="firstn" name="firstn" placeholder="First Name" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-field p-relative c-subject mb-20">
                      <input type="text" id="email" name="email" placeholder="Email" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-field p-relative c-subject mb-20">
                      <input type="text" id="phone" name="phone" placeholder="Phone No." />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="contact-field p-relative c-message mb-30">
                      <textarea
                        name="message"
                        id="message"
                        cols={30}
                        rows={10}
                        placeholder="Write comments"
                        defaultValue={''}
                      />
                    </div>
                    <div className="slider-btn">
                      <button className="btn ss-btn" data-animation="fadeInRight" data-delay=".8s">
                        <span>Submit Now</span> <i className="fal fa-long-arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(FaqPage);
