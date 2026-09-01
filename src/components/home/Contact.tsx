"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: conectar con el endpoint / servicio de mail correspondiente
    setSubmitted(true);
  };

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="relative scroll-mt-28 overflow-hidden bg-[#243054] px-6 py-20 text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-white/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="contact-title"
            className="nunito mt-3 text-3xl font-bold md:text-4xl"
          >
            ¡Contactanos!
          </h2>

          <p className="nunito text-white/70">
            Escribinos y te respondemos a la brevedad.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center">
          {/* Formulario */}
          <div className="group relative w-full max-w-sm sm:max-w-md md:max-w-2xl">
            {/* Capa decorativa rotada */}
            <div
              aria-hidden="true"
              className="absolute -inset-5 group-hover:rotate-2 transition-all duration-500 rounded-4xl bg-white/10 p-5"
            />

            {/* Tarjeta */}
            <div className="nunito relative rounded-4xl bg-white p-6 text-[#243054] shadow-2xl shadow-black/30 sm:p-9">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <h3 className="text-xl font-bold">
                    ¡Gracias por escribirnos!
                  </h3>
                  <p className="mt-2 text-[#243054]/60">
                    Recibimos tu mensaje y te vamos a responder a la brevedad.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-bold uppercase tracking-widest text-[#243054]/50"
                      >
                        Nombre
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Tu nombre"
                        className="rounded-xl border border-transparent bg-[#243054]/5 px-4 py-3 text-sm text-[#243054] placeholder:text-[#243054]/40 outline-none transition-colors focus:border-[#243054]/20 focus:bg-[#243054]/[0.07]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-bold uppercase tracking-widest text-[#243054]/50"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="tu@email.com"
                        className="rounded-xl border border-transparent bg-[#243054]/5 px-4 py-3 text-sm text-[#243054] placeholder:text-[#243054]/40 outline-none transition-colors focus:border-[#243054]/20 focus:bg-[#243054]/[0.07]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold uppercase tracking-widest text-[#243054]/50"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Contanos en qué te podemos ayudar"
                      className="resize-none rounded-xl border border-transparent bg-[#243054]/5 px-4 py-3 text-sm text-[#243054] placeholder:text-[#243054]/40 outline-none transition-colors focus:border-[#243054]/20 focus:bg-[#243054]/[0.07]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 rounded-2xl bg-[#243054] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-[#243054]/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b2644] motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
