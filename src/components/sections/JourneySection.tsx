import React, { useRef, useEffect, useState } from 'react';

const journeySteps = [
  {
    number: '01',
    subtitle: 'Inicio da operacao',
    title: 'Solicitacao e cotacao',
    description: 'Entre em contato pelo site, WhatsApp ou telefone. Nossa equipe elabora uma proposta personalizada com o melhor custo-beneficio para sua carga, rota e prazo. Respondemos em ate 2 horas uteis.',
    color: '#3a6b4a',
  },
  {
    number: '02',
    subtitle: 'Retirada do produto',
    title: 'Coleta na origem',
    description: 'No dia e horario agendados, nosso motorista realiza a coleta com todos os documentos fiscais necessarios (CT-e, DANFE). A carga e conferida e lacrada para garantir sua integridade.',
    color: '#2a5235',
  },
  {
    number: '03',
    subtitle: 'Acompanhamento em tempo real',
    title: 'Em transito com rastreamento',
    description: 'Sua carga e monitorada 24h por GPS e telemetria. Voce recebe atualizacoes automaticas sobre posicao e previsao de entrega. Nossa central intervem imediatamente em qualquer ocorrencia.',
    color: '#4a8460',
  },
  {
    number: '04',
    subtitle: 'Destino final',
    title: 'Entrega confirmada',
    description: 'A entrega e realizada com assinatura e registro fotografico. O comprovante digital e enviado em tempo real por e-mail. Em caso de nao conformidade, nosso time aciona o protocolo de resolucao imediata.',
    color: '#1e3d28',
  },
];

const JourneySection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => prev.includes(index) ? prev : [...prev, index]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px 0px' }
    );
    itemRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-funciona" className="section-spacing relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-15" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center section-header-spacing">
          <span className="lean-label block mb-3">Processo</span>
          <h2 className="lean-section-title mb-4">Como sua carga chega</h2>
          <p className="text-base max-w-3xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
            Um processo transparente e rastreavel do inicio ao fim, para total visibilidade em cada etapa.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 z-0"
            style={{ background: 'linear-gradient(to bottom, transparent, #cce8d4, transparent)' }} />
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, #cce8d4, transparent)' }} />

          <div className="space-y-12 md:space-y-20">
            {journeySteps.map((step, index) => {
              const isVisible = visibleItems.includes(index);
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                  {/* Step dot desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}
                      style={{ background: step.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px' }}
                    >
                      {step.number}
                    </div>
                  </div>
                  {/* Step dot mobile */}
                  <div className="md:hidden absolute left-6 top-0 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}
                      style={{ background: step.color }}
                    >
                      {step.number}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center pl-16 md:pl-0">
                    <div className={`${isEven ? 'md:pr-16' : 'md:order-2 md:pl-16'}`}>
                      <span className="lean-label block mb-2">{step.subtitle}</span>
                      <h3 className="font-bold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(22px, 3vw, 30px)', color: '#1a1a1a' }}>
                        {step.title}
                      </h3>
                      <p className="leading-relaxed text-sm md:text-base" style={{ color: '#555555' }}>
                        {step.description}
                      </p>
                    </div>
                    <div className={`${isEven ? 'md:order-2 md:pl-16' : 'md:pr-16'}`}>
                      <div
                        className={`rounded-2xl p-10 flex items-center justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                        style={{ background: step.color, minHeight: '140px' }}
                      >
                        <div className="text-white font-bold text-center"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '24px', letterSpacing: '0.05em' }}>
                          {step.number} — {step.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block rounded-2xl px-8 py-6 lean-card" style={{ maxWidth: '560px' }}>
              <h4 className="font-bold text-xl mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a' }}>
                Do pedido a entrega, total transparencia
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                Acompanhe sua carga em tempo real e receba notificacoes automaticas. Nossa central esta disponivel 24h para qualquer necessidade.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
                className="btn-pill btn-primary font-bold text-sm px-6 py-3 mt-4"
              >
                Solicitar Cotacao
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
