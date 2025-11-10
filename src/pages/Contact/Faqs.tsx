const faqsData = [
  {
    id:'faq-1',
    question: "Are you just searching patents?",
    answer: "No. We structure an anchor s variables/tests, normalise many sources to that frame, and train predictive models. Patents are inputs; the value is the prediction and the window you can run."
  },
  {
    id:'faq-2',
    question: "Can we use this without sharing raw data?",
    answer: "Yes. We support federated learning. Your raw data stays inside your network; only model learnings move."
  },
  {
    id:'faq-3',
    question: "Will you copy a protected recipe?",
    answer: "No. We aim for equivalent or better windows outside protected claims. That’s safer legally and better strategically."
  },
  {
    id:'faq-4',
    question: "What kind of companies is this service useful for?",
    answer: "For anyone who wants to evolve their development and sales, including chemical manufacturers, materials companies, and trading companies. From small to large companies, we will open up the future of the chemical industry."
  },
  {
    id:'faq-5',
    question: "Is it okay if I don't have any specialised knowledge?",
    answer:"No problem. With support from professional researchers and data scientists, anyone can achieve results"
  },
  {
    id:'faq-6',
    question: "How long will it take for the results to come out?",
    answer:"Initial analysis takes about three months. Custom models take just a few weeks. Priority ser vice is available for urgent needs."
  },
  {
    id:'faq-7',
    question: "What results can you expect?",
    answer:"The reports provide specific insights that can be used immediately, such as raw material selection, customer discovery, and competitive analysis, making both development and sales immediately effective."
  },
  {
    id:'faq-8',
    question:"Can there be a demonstration before we start using it? ",
    answer:"Of course. We d love to hear from you in a free demo!"
  }
];

const Faqs = () => {
  return (
    <section className="text-white body-font px-4 md:px-8 xl:px-16  pb-12 bg-background1">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="pb-6">
          <h1 className="title-font font-medium text-3xl md:text-4xl lg:text-5xl font-nunito md:text-[2.0833rem] lg:text-[2.3750rem] xl:text-[2.6042rem] 2xl:text-[3.125rem] lg:leading-[6.25rem]  tracking-[0.04em]">FAQS</h1>
        </div>
      </div>

      {faqsData.map((faq, index) => (
        <div key={index} id={faq.id} className="pb-4 font-deca text-xl md:text-2xl md:text-[1.5833rem] lg:text-[1.8050rem] xl:text-[1.9792rem] 2xl:text-[2.375rem] lg:leading-[3.75rem]  tracking-[0.08em] font-extralight">
          <p className="font-medium">{faq.question}</p>
          <p className="font-extralight">{faq.answer}</p>
        </div>
      ))}
    </section>
  );
};

export default Faqs;
