import React, { useState, useRef, useEffect } from 'react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const trucks = [
  {
    title: 'Caçamba MB Axor 3131',
    models: 'Mercedes Benz Axor 3131',
    description: 'Projetado para operações pesadas de alta demanda, na configuração basculante é referência em terraplanagem, construção civil, mineração e obras rurais. Alta robustez, tração e produtividade em qualquer terreno.',
    tags: ['Mineração', 'Terraplanagem', 'Construção Civil', '6x4'],
    photo: '/lovable-uploads/mercedes-axor-3131.webp',
    photoLabel: 'MB Axor 3131',
  },
  {
    title: 'Caçamba VW 3260',
    models: 'Volkswagen 3260',
    description: 'Caminhão caçamba com excelente relação custo-benefício para transporte de materiais em obras, mineração e movimentação de terra. Confiabilidade e eficiência operacional.',
    tags: ['Mineração', 'Terraplanagem', '6x4'],
    photo: '/lovable-uploads/vw-3260.webp',
    photoLabel: 'VW 3260',
  },
  {
    title: 'Pipa MB Axor 3131',
    models: 'Mercedes Benz Axor 3131 · 20.000 L',
    description: 'Veículo equipado com tanque de 20.000 litros e sistema completo para atender diversas demandas operacionais com eficiência e segurança.',
    tags: ['Umectação de Solo', 'Terraplanagem', 'Limpeza', 'Irrigação'],
    photo: '/lovable-uploads/pipa.webp',
    photoLabel: 'Caminhão Pipa MB Axor 3131',
  },
  {
    title: 'Munck Ford Cargo 2629',
    models: 'Ford Cargo 2629 6x4',
    description: 'Caminhão munck com capacidade de içamento de até 10.000 kg. Ideal para movimentação de máquinas industriais, geradores, transformadores e operações com cesto aéreo.',
    tags: ['10.000 kg', 'Içamento', 'Cesto Aéreo'],
    photo: '/lovable-uploads/ford-cargo-2629-munck.webp',
    photoLabel: 'Ford Cargo 2629',
  },
  {
    title: 'Munck MB Atego 3133',
    models: 'Mercedes Benz Atego 3133/48 6x4',
    description: 'Caminhão munck de alto desempenho para cargas especiais e içamento de equipamentos pesados. Estrutura robusta e alcance extendido para operações de grande porte.',
    tags: ['10.000 kg', 'Içamento', 'Cargas Especiais'],
    photo: '/lovable-uploads/atego-3133-munck.webp',
    photoLabel: 'MB Atego 3133',
  },
];

const machines = [
  {
    title: 'Escavadeira XCMG',
    models: 'Peso Operacional: 22.500 kg · Caçamba: 1,2 m³',
    description: 'Alta performance e eficiência para terraplanagem, construção civil, mineração, obras rurais e demolição moderada. Versatilidade e excelente custo-benefício para projetos de qualquer porte.',
    tags: ['22.500 kg', '1,2 m³', 'Terraplanagem', 'Construção Civil'],
    photo: '/lovable-uploads/escavadeira.webp',
    photoLabel: 'Escavadeira XCMG',
  },
  {
    title: 'Retroescavadeira JCB',
    models: 'Peso Operacional: 8.185 kg · Escavação: 4,54 m',
    description: 'Solução ideal para o mercado agrícola e obras urbanas. Perfeita para escavação de valas, terraplanagem, nivelamento, carregamento de materiais e diversos serviços agrícolas.',
    tags: ['8.185 kg', '4,54 m profundidade', 'Agrícola', 'Obras Urbanas'],
    photo: '/lovable-uploads/retroescavadeira.webp',
    photoLabel: 'Retroescavadeira JCB',
  },
];

type CardItem = typeof trucks[0];

const EquipmentCard: React.FC<CardItem & { photoHeight?: string }> = ({ title, models, description, tags, photo, photoLabel, photoHeight = 'h-48' }) => (
  <div className="group flex flex-col h-full transition-all duration-300 overflow-hidden rounded-xl hover:-translate-y-1 hover:shadow-xl" style={{ border: '1px solid #e8e8e8' }}>
    {/* Photo */}
    <div className={`relative ${photoHeight} overflow-hidden bg-[#1e3d28]`}>
      <img
        src={photo}
        alt={photoLabel}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col gap-3 flex-1" style={{ background: '#ffffff' }}>
      <div>
        <h3 className="font-bold text-base leading-tight mb-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a', letterSpacing: '0.02em' }}>
          {title}
        </h3>
        <p className="text-xs font-semibold" style={{ color: '#4a8460', fontFamily: "'Barlow Condensed', sans-serif" }}>{models}</p>
      </div>
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#555555' }}>{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto pt-1">
        {tags.map(tag => (
          <span key={tag} className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: '#eaf5ed', color: '#3a6b4a', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Carrossel infinito de 4 cards — desktop
const TruckCarousel: React.FC<{ items: CardItem[]; photoHeight?: string }> = ({ items, photoHeight }) => {
  const VISIBLE = 4;
  const n = items.length;
  // clone: últimos VISIBLE + itens reais + primeiros VISIBLE
  const extended = [...items.slice(-VISIBLE), ...items, ...items.slice(0, VISIBLE)];
  const total = extended.length;

  const [idx, setIdx] = useState(VISIBLE);
  const [animated, setAnimated] = useState(false);
  const idxRef = useRef(VISIBLE);
  const moving = useRef(false);

  useEffect(() => { idxRef.current = idx; }, [idx]);
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() => setAnimated(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  const go = (dir: 1 | -1) => {
    if (moving.current) return;
    moving.current = true;
    setAnimated(true);
    setIdx(i => i + dir);
  };

  const onTransEnd = () => {
    moving.current = false;
    const cur = idxRef.current;
    if (cur >= VISIBLE + n) { setAnimated(false); setIdx(cur - n); }
    else if (cur < VISIBLE) { setAnimated(false); setIdx(cur + n); }
  };

  // Mobile state
  const [mIdx, setMIdx] = useState(0);

  return (
    <>
      {/* Desktop: carrossel infinito 4 cards */}
      <div className="hidden md:block relative px-6">
        <div className="overflow-hidden">
          <div
            className="flex items-stretch"
            style={{
              width: `${(total / VISIBLE) * 100}%`,
              transform: `translateX(-${(idx * 100) / total}%)`,
              transition: animated ? 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none',
            }}
            onTransitionEnd={onTransEnd}
          >
            {extended.map((item, i) => (
              <div key={i} className="px-2 flex flex-col" style={{ width: `${100 / total}%`, flexShrink: 0 }}>
                <EquipmentCard {...item} photoHeight={photoHeight} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => go(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }}
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }}
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile: carrossel 1 card */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${mIdx * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.title} className="w-full flex-shrink-0 px-1">
                <EquipmentCard {...item} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMIdx(c => Math.max(0, c - 1))}
          disabled={mIdx === 0}
          className="absolute left-0 top-[96px] -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }}
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setMIdx(c => Math.min(n - 1, c + 1))}
          disabled={mIdx === n - 1}
          className="absolute right-0 top-[96px] translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }}
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex justify-center gap-2 mt-5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setMIdx(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === mIdx ? '#3a6b4a' : '#cce8d4' }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// Carrossel simples para máquinas (sem infinito — são apenas 2)
const CardGroup: React.FC<{ items: CardItem[]; photoHeight?: string }> = ({ items, photoHeight }) => {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <div className="hidden md:flex gap-4 justify-center">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col" style={{ width: 'calc(25% - 6px)' }}>
            <EquipmentCard {...item} photoHeight={photoHeight} />
          </div>
        ))}
      </div>
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.title} className="w-full flex-shrink-0 px-1">
                <EquipmentCard {...item} photoHeight={photoHeight} />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="absolute left-0 top-[96px] -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }}
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrent(c => Math.min(items.length - 1, c + 1))}
          disabled={current === items.length - 1}
          className="absolute right-0 top-[96px] translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }}
          aria-label="Próximo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex justify-center gap-2 mt-5">
          {items.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === current ? '#3a6b4a' : '#cce8d4' }}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </>
  );
};

const ProceduresSection: React.FC = () => {
  return (
    <section id="equipamentos" className="section-spacing relative overflow-hidden" style={{ background: '#f7f6f3' }}>
      <div className="absolute inset-0 gradient-glow-bottom pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header da seção */}
        <AnimatedSection>
          <div className="text-center section-header-spacing">
            <span className="lean-label block mb-3">Portfólio</span>
            <h2 className="lean-section-title mb-4">Locação de Equipamentos</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
              Frota moderna e equipamentos atualizados para garantir a máxima eficiência e segurança nos seus projetos. Consulte nossa disponibilidade.
            </p>
          </div>
        </AnimatedSection>

        {/* Grupo 1: Caminhões */}
        <AnimatedSection delay={100}>
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: '#cce8d4' }} />
              <h3 className="text-xl font-bold tracking-wide uppercase px-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#2a5235', letterSpacing: '0.08em' }}>
                Caminhões
              </h3>
              <div className="h-px flex-1" style={{ background: '#cce8d4' }} />
            </div>
            <TruckCarousel items={trucks} />
          </div>
        </AnimatedSection>

        {/* Grupo 2: Máquinas e Equipamentos */}
        <AnimatedSection delay={200}>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: '#cce8d4' }} />
              <h3 className="text-xl font-bold tracking-wide uppercase px-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#2a5235', letterSpacing: '0.08em' }}>
                Máquinas e Equipamentos
              </h3>
              <div className="h-px flex-1" style={{ background: '#cce8d4' }} />
            </div>
            <CardGroup items={machines} photoHeight="h-72" />
          </div>
        </AnimatedSection>

        <div className="text-center mt-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
            className="btn-pill btn-primary font-bold text-sm px-8 py-3"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProceduresSection;
