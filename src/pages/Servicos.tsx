
import React, { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUserTracking } from '@/hooks/useUserTracking';
import { useDataLayer } from '@/hooks/useDataLayer';
import { ChevronLeft, ChevronRight, ChevronDown, ArrowLeft, ArrowRight, Wrench, Truck, Route, Building2, HardHat, Leaf, Factory, Home, Droplets, Shovel } from 'lucide-react';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Header from '@/components/sections/Header';

const StatsSection = lazy(() => import('@/components/sections/StatsSection'));
const ClinicSection = lazy(() => import('@/components/sections/ClinicSection'));
const SpecialtySection = lazy(() => import('@/components/sections/SpecialtySection'));
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const TestimonialsSection = lazy(() => import('@/components/sections/TestimonialsSection'));
const Footer = lazy(() => import('@/components/sections/Footer'));
const StatsBar = lazy(() => import('@/components/sections/StatsBar'));
const WhatsAppPopup = lazy(() => import('@/components/sections/WhatsAppPopup'));
const SuccessPopup = lazy(() => import('@/components/ui/success-popup'));

// ─── Form utils ────────────────────────────────────────────────────────────────
const loadFormUtils = () => Promise.all([
  import('@/utils/phoneUtils'),
  import('@/utils/whatsappUtils'),
  import('@/utils/webhookUtils'),
  import('@/data/countries'),
]);
let formUtilsCache: Awaited<ReturnType<typeof loadFormUtils>> | null = null;
const getFormUtils = async () => {
  if (!formUtilsCache) formUtilsCache = await loadFormUtils();
  return formUtilsCache;
};
const initialFormState = {
  name: '', email: '', phone: '', country: 'Brasil', countryCode: '+55',
  city: '', location: '', procedure: '', customProcedure: '', message: '',
  preferredTab: 'service' as const,
};

// ─── Service card data ──────────────────────────────────────────────────────────
type ServiceCard = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  photo: string;
  photoLabel: string;
  procedureValue: string;
};

// ── Segmento: apenas os serviços listados no catálogo ───────────────────────────
const mineracao: ServiceCard[] = [
  {
    title: 'Transporte de Minério Bruto',
    subtitle: 'Caminhões Basculantes MB Axor 3131',
    description: 'Transporte do Minério Bruto e até resíduos, de forma eficiente e segura, são caminhões preparados para operar em solos difíceis, muito usados dentro da mina.',
    tags: [], photo: '/lovable-uploads/mercedes-axor-3131.webp',
    photoLabel: 'Caminhões Basculantes MB Axor 3131 na mineração',
    procedureValue: 'Transporte de Minério — Mineração',
  },
  {
    title: 'Carregamento a Granel',
    subtitle: 'Carregadeiras',
    description: 'Movimentação e carregamento de minério a granel dentro da mina com alto rendimento operacional. Equipamento de esteira frontal ideal para operar em turnos contínuos.',
    tags: [], photo: '/lovable-uploads/carregadeira-2.webp',
    photoLabel: 'Carregadeiras em operação de mineração',
    procedureValue: 'Carregamento a Granel — Mineração',
  },
];

const agronegocio: ServiceCard[] = [
  {
    title: 'Abertura e Limpeza de Valas',
    subtitle: 'Retroescavadeiras',
    description: 'Para sistemas de drenagem ou irrigação.',
    tags: [], photo: '/lovable-uploads/Abertura de Valas.webp',
    photoLabel: 'Retroescavadeiras abrindo valas',
    procedureValue: 'Abertura de Valas — Agronegócio',
  },
  {
    title: 'Recuperação de Estradas Vicinais',
    subtitle: 'Escavadeiras',
    description: 'Raspagem, nivelamento e cascalhamento para melhorar o acesso na propriedade.',
    tags: [], photo: '/lovable-uploads/Recuperação de Estradas Vicinais.webp',
    photoLabel: 'Escavadeiras em estrada vicinal',
    procedureValue: 'Recuperação de Estradas — Agronegócio',
  },
  {
    title: 'Limpeza de Terrenos e Áreas',
    subtitle: 'Escavadeiras',
    description: 'Remoção de vegetação, troncos e pedras para preparação de novas áreas de plantio.',
    tags: [], photo: '/lovable-uploads/escavadeira-2.webp',
    photoLabel: 'Limpeza de terreno rural',
    procedureValue: 'Limpeza de Terrenos — Agronegócio',
  },
  {
    title: 'Carregamento de Materiais',
    subtitle: 'Caminhões Basculantes MB Axor 3131',
    description: 'Carga de adubo, calcário, terra, areia e brita em caminhões.',
    tags: [], photo: '/lovable-uploads/Carregamento de Materiais.webp',
    photoLabel: 'Carregamento de insumos rurais',
    procedureValue: 'Carregamento de Materiais — Agronegócio',
  },
  {
    title: 'Criação de Tanques e Represas',
    subtitle: 'Retroescavadeiras',
    description: 'Pequenas escavações para reservatórios de água e bebedouros de animais.',
    tags: [], photo: '/lovable-uploads/Tanques e Represas.webp',
    photoLabel: 'Criação de tanques e represas',
    procedureValue: 'Tanques e Represas — Agronegócio',
  },
  {
    title: 'Limpeza de Estábulos e Currais',
    subtitle: 'Retroescavadeiras',
    description: 'Remoção de esterco e entulhos.',
    tags: [], photo: '/lovable-uploads/retroescavadeira-2.webp',
    photoLabel: 'Limpeza de estábulos e currais',
    procedureValue: 'Limpeza de Estábulos — Agronegócio',
  },
  {
    title: 'Carregamento de Insumos Agrícolas',
    subtitle: 'Carregadeiras',
    description: 'Carregamento de insumos agrícolas, movimentação de material em fazendas e suporte a obras de infraestrutura rural com eficiência e versatilidade.',
    tags: [], photo: '/lovable-uploads/carregadeira-3.webp',
    photoLabel: 'Carregadeiras em obras rurais',
    procedureValue: 'Carregamento de Insumos — Agronegócio',
  },
];

const industrial: ServiceCard[] = [
  {
    title: 'Terraplanagem e Nivelamento',
    subtitle: 'Escavadeiras',
    description: 'Preparação do terreno para expansão de galpões, pátios de manobra ou estacionamentos.',
    tags: [], photo: '/lovable-uploads/Terraplanagem e Nivelamento.webp',
    photoLabel: 'Terraplanagem industrial',
    procedureValue: 'Terraplanagem Industrial',
  },
  {
    title: 'Escavação para Fundações',
    subtitle: 'Retroescavadeiras',
    description: 'Valas para alicerces, redes de esgoto, instalações elétricas e hidráulicas.',
    tags: [], photo: '/lovable-uploads/Escavação para Fundações.webp',
    photoLabel: 'Escavação de fundações industriais',
    procedureValue: 'Escavação para Fundações — Industrial',
  },
  {
    title: 'Carregamento de Materiais a Granel',
    subtitle: 'Caminhões Basculantes VW 3260',
    description: 'Manuseio de resíduos industriais, sucata, carvão, areia, brita ou matérias-primas.',
    tags: [], photo: '/lovable-uploads/Carregamento a Granel.webp',
    photoLabel: 'Carregamento a granel industrial',
    procedureValue: 'Carregamento a Granel — Industrial',
  },
  {
    title: 'Movimentação de Carga',
    subtitle: 'Caminhões Munck Ford Cargo 2629 · M.Benz Atego 3133/48',
    description: 'Uso da concha frontal para transportar materiais pesados dentro do perímetro industrial.',
    tags: [], photo: '/lovable-uploads/ford-cargo-2629-munck-2.webp',
    photoLabel: 'Munck movimentando carga industrial',
    procedureValue: 'Movimentação de Carga — Industrial',
  },
  {
    title: 'Manutenção de Infraestrutura',
    subtitle: 'Escavadeiras',
    description: 'Limpeza de áreas externas, manutenção de caixas de inspeção e reparações rápidas em vias internas.',
    tags: [], photo: '/lovable-uploads/escavadeira-3.webp',
    photoLabel: 'Manutenção de infraestrutura industrial',
    procedureValue: 'Manutenção de Infraestrutura — Industrial',
  },
];

const residencial: ServiceCard[] = [
  {
    title: 'Limpeza de Entulhos',
    subtitle: 'Caminhões Basculantes MB Axor 3131',
    description: 'Remoção de entulhos, demolição autorizada e dentre outros.',
    tags: [], photo: '/lovable-uploads/Limpeza de Entulhos.webp',
    photoLabel: 'Remoção de entulhos residenciais',
    procedureValue: 'Limpeza de Entulhos — Residencial',
  },
];

// ── Por equipamento: serviços específicos de cada máquina ───────────────────────
const equipXCMG: ServiceCard[] = [
  {
    title: 'Escavação em Mineração',
    subtitle: 'Escavadeiras',
    description: 'Com peso operacional de 22.500 kg e caçamba de 1,2 m³, essas máquinas são a escolha ideal para uma ampla gama de projetos. Principalmente utilizadas para serviços de mineração, garantem desempenho confiável e econômico.',
    tags: [], photo: '/lovable-uploads/escavadeira.webp',
    photoLabel: 'Escavadeiras em mineração',
    procedureValue: 'Escavação em Mineração — Escavadeiras',
  },
  {
    title: 'Obras Rurais',
    subtitle: 'Escavadeiras',
    description: 'Principalmente utilizadas para obras rurais e outros ambientes de trabalho. Contam com lanças e braços reforçados com aço de alta resistência e grande gama de opcionais de caçamba.',
    tags: [], photo: '/lovable-uploads/Recuperação de Estradas Vicinais.webp',
    photoLabel: 'Escavadeiras em obras rurais',
    procedureValue: 'Obras Rurais — Escavadeiras',
  },
  {
    title: 'Demolição e Infraestrutura',
    subtitle: 'Escavadeiras',
    description: 'Perfeitas para aplicações de demolição moderada e projetos de infraestrutura, oferecem a potência e a precisão necessárias para lidar com desafios diversos.',
    tags: [], photo: '/lovable-uploads/Terraplanagem e Nivelamento.webp',
    photoLabel: 'Escavadeiras em demolição',
    procedureValue: 'Demolição e Infraestrutura — Escavadeiras',
  },
  {
    title: 'Construção Civil',
    subtitle: 'Escavadeiras',
    description: 'Com peso operacional de 22.500 kg e caçamba de 1,2 m³. Lanças e braços reforçados com aço de alta resistência e grande gama de opcionais de caçamba. Principalmente utilizadas para construção civil.',
    tags: [], photo: '/lovable-uploads/Terraplanagem e Nivelamento.webp',
    photoLabel: 'Escavadeiras em construção civil',
    procedureValue: 'Construção Civil — Escavadeiras',
  },
];

const equipJCB: ServiceCard[] = [
  {
    title: 'Escavação Profunda',
    subtitle: 'Retroescavadeiras',
    description: 'Com profundidade de escavação de 4,54 metros (com braço extensor), são ideais para abrir valas para tubulações de água, esgoto, drenagem e redes elétricas.',
    tags: [], photo: '/lovable-uploads/Escavação para Fundações.webp',
    photoLabel: 'Retroescavadeiras em escavação profunda',
    procedureValue: 'Escavação Profunda — Retroescavadeiras',
  },
  {
    title: 'Terraplanagem e Nivelamento',
    subtitle: 'Retroescavadeiras',
    description: 'Utilizam a caçamba frontal para espalhar terra, nivelar terrenos, pavimentação e canteiros de obras.',
    tags: [], photo: '/lovable-uploads/Preparação de Terreno.webp',
    photoLabel: 'Retroescavadeiras nivelando terreno',
    procedureValue: 'Terraplanagem e Nivelamento — Retroescavadeiras',
  },
  {
    title: 'Carregamento de Materiais',
    subtitle: 'Retroescavadeiras',
    description: 'Eficientes para carregar caminhões basculantes com terra, areia, brita e materiais de construção.',
    tags: [], photo: '/lovable-uploads/retroescavadeira-3.webp',
    photoLabel: 'Retroescavadeiras carregando materiais',
    procedureValue: 'Carregamento de Materiais — Retroescavadeiras',
  },
  {
    title: 'Limpeza de Terrenos',
    subtitle: 'Retroescavadeiras',
    description: 'Remoção de entulhos, vegetação leve e preparação de terrenos para construção.',
    tags: [], photo: '/lovable-uploads/Preparação de Terreno.webp',
    photoLabel: 'Retroescavadeiras limpando terreno',
    procedureValue: 'Limpeza de Terrenos — Retroescavadeiras',
  },
  {
    title: 'Serviços Agrícolas',
    subtitle: 'Retroescavadeiras',
    description: 'Manutenção de estradas rurais, limpeza de valas, carregamento de insumos e pequenas terraplanagens na fazenda.',
    tags: [], photo: '/lovable-uploads/Abertura de Valas.webp',
    photoLabel: 'Retroescavadeiras em serviços agrícolas',
    procedureValue: 'Serviços Agrícolas — Retroescavadeiras',
  },
];

const equipCarregadeira: ServiceCard[] = [
  {
    title: 'Carregamento a Granel',
    subtitle: 'Carregadeiras',
    description: 'Carregamento de caminhões com terra, areia, brita, minério e materiais a granel com alta produtividade. Ideal para operações contínuas em mineração e obras.',
    tags: [], photo: '/lovable-uploads/carregadeira-4.webp',
    photoLabel: 'Carregadeiras carregando materiais a granel',
    procedureValue: 'Carregamento a Granel — Carregadeiras',
  },
  {
    title: 'Movimentação de Terra',
    subtitle: 'Carregadeiras',
    description: 'Movimentação e redistribuição de volumes de terra em terraplanagem, nivelamento de terrenos e preparação de áreas para construção civil e mineração.',
    tags: [], photo: '/lovable-uploads/carregadeira-2.webp',
    photoLabel: 'Carregadeiras em movimentação de terra',
    procedureValue: 'Movimentação de Terra — Carregadeiras',
  },
  {
    title: 'Suporte à Mineração',
    subtitle: 'Carregadeiras',
    description: 'Carregamento de caminhões basculantes com minério e movimentação de material dentro da mina. Alto rendimento operacional em turnos contínuos.',
    tags: [], photo: '/lovable-uploads/carregadeira.webp',
    photoLabel: 'Carregadeiras em operação de mineração',
    procedureValue: 'Suporte à Mineração — Carregadeiras',
  },
  {
    title: 'Obras Rurais e Agronegócio',
    subtitle: 'Carregadeiras',
    description: 'Carregamento de insumos agrícolas, movimentação de material em fazendas e suporte a obras de infraestrutura rural com eficiência e versatilidade.',
    tags: [], photo: '/lovable-uploads/carregadeira-3.webp',
    photoLabel: 'Carregadeiras em obras rurais',
    procedureValue: 'Obras Rurais — Carregadeiras',
  },
];

const equipMunck: ServiceCard[] = [
  {
    title: 'Içamento de Cargas Pesadas',
    subtitle: 'Caminhões Munck Ford Cargo 2629 · M.Benz Atego 3133/48',
    description: 'Movimentação de máquinas industriais, geradores, transformadores e motores de grande porte.',
    tags: [], photo: '/lovable-uploads/ford-cargo-2629-munck.webp',
    photoLabel: 'Munck içando carga pesada',
    procedureValue: 'Içamento de Cargas Pesadas — Munck',
  },
  {
    title: 'Construção Civil',
    subtitle: 'Caminhões Munck Ford Cargo 2629 · M.Benz Atego 3133/48',
    description: 'Movimentação e posicionamento de estruturas metálicas, vigas, pré-moldados e materiais de construção em locais de difícil acesso.',
    tags: [], photo: '/lovable-uploads/ford-cargo-2629-munck-3.webp',
    photoLabel: 'Munck em construção civil',
    procedureValue: 'Construção Civil — Munck',
  },
  {
    title: 'Transporte e Logística',
    subtitle: 'Caminhões Munck Ford Cargo 2629 · M.Benz Atego 3133/48',
    description: 'Transporte de equipamentos pesados e materiais diversos utilizando a carroceria do próprio caminhão.',
    tags: [], photo: '/lovable-uploads/ford-cargo-2629-munck-4.webp',
    photoLabel: 'Munck em transporte e logística',
    procedureValue: 'Transporte e Logística — Munck',
  },
  {
    title: 'Operações com Cesto Aéreo',
    subtitle: 'Caminhões Munck Ford Cargo 2629 · M.Benz Atego 3133/48',
    description: 'Serviços que exigem altura, como manutenção e montagem industrial, utilizando cesto acoplado para duas pessoas.',
    tags: [], photo: '/lovable-uploads/ford-cargo-2629-munck-5.webp',
    photoLabel: 'Munck com cesto aéreo',
    procedureValue: 'Operações com Cesto Aéreo — Munck',
  },
];

const equipPipa: ServiceCard[] = [
  {
    title: 'Umectação de Solo',
    subtitle: 'Caminhões Pipa MB Axor 3131 · 20.000 L',
    description: 'Veículos equipados com tanque de 20.000 litros, projetados para o transporte e acoplados de um sistema completo para atender várias demandas — incluindo umectação de solo.',
    tags: [], photo: '/lovable-uploads/pipa-2.webp',
    photoLabel: 'Caminhões Pipa umectando solo',
    procedureValue: 'Umectação de Solo — Pipa',
  },
  {
    title: 'Terraplanagem',
    subtitle: 'Caminhões Pipa MB Axor 3131 · 20.000 L',
    description: 'Veículos equipados com tanque de 20.000 litros, projetados para o transporte e acoplados de um sistema completo para atender várias demandas — incluindo terraplanagem.',
    tags: [], photo: '/lovable-uploads/pipa-3.webp',
    photoLabel: 'Caminhões Pipa em suporte à terraplanagem',
    procedureValue: 'Terraplanagem — Pipa',
  },
  {
    title: 'Limpeza',
    subtitle: 'Caminhões Pipa MB Axor 3131 · 20.000 L',
    description: 'Veículos equipados com tanque de 20.000 litros, projetados para o transporte e acoplados de um sistema completo para atender várias demandas — incluindo limpeza.',
    tags: [], photo: '/lovable-uploads/pipa-4.webp',
    photoLabel: 'Caminhões Pipa em limpeza',
    procedureValue: 'Limpeza — Pipa',
  },
  {
    title: 'Irrigação',
    subtitle: 'Caminhões Pipa MB Axor 3131 · 20.000 L',
    description: 'Veículos equipados com tanque de 20.000 litros, projetados para o transporte e acoplados de um sistema completo para atender várias demandas — incluindo irrigação.',
    tags: [], photo: '/lovable-uploads/pipa-5.webp',
    photoLabel: 'Caminhões Pipa em irrigação',
    procedureValue: 'Irrigação — Pipa',
  },
];

const equipCacamba: ServiceCard[] = [
  {
    title: 'Transporte em Obras Rurais',
    subtitle: 'Caminhões Basculantes MB Axor 3131',
    description: 'Veículos projetados para operações pesadas que exigem alta robustez e capacidade de tração. Principalmente utilizados para obras rurais e outros ambientes de trabalho.',
    tags: [], photo: '/lovable-uploads/mercedes-axor-3131-2.webp',
    photoLabel: 'Caminhões Basculantes MB Axor 3131 em obra rural',
    procedureValue: 'Transporte em Obras Rurais — Caminhões Basculantes',
  },
  {
    title: 'Transporte em Terraplanagem e Obras',
    subtitle: 'Caminhões Basculantes MB Axor 3131',
    description: 'Veículos projetados para operações pesadas que exigem alta robustez e capacidade de tração. Locações dos caminhões e serviços prestados em mineração e terraplanagem.',
    tags: [], photo: '/lovable-uploads/mercedes-axor-3131-3.webp',
    photoLabel: 'Caminhões Basculantes MB Axor 3131 em terraplanagem',
    procedureValue: 'Transporte em Terraplanagem — Caminhões Basculantes',
  },
  {
    title: 'Içamento e Movimentação',
    subtitle: 'Caminhões Munck Ford Cargo 2629',
    description: 'Içamento e posicionamento de materiais de construção como vigas, caixas d\'água, estruturas metálicas e pré-moldados em obras residenciais com segurança e precisão.',
    tags: ['Munck', 'Içamento', 'Obras'],
    photo: '/lovable-uploads/ford-cargo-2629-munck-2.webp',
    photoLabel: 'Munck içando materiais em obra residencial',
    procedureValue: 'Içamento e Movimentação — Residencial',
  },
];

// ─── ServiceCard Component ──────────────────────────────────────────────────────
const ServiceCardItem: React.FC<ServiceCard> = ({ title, subtitle, description, tags, photo, photoLabel, procedureValue }) => (
  <div className="group flex flex-col h-full transition-all duration-300 overflow-hidden rounded-xl hover:-translate-y-1 hover:shadow-xl" style={{ border: '1px solid #e8e8e8' }}>
    <div className="relative h-48 overflow-hidden" style={{ background: '#1e3d28' }}>
      <img
        src={encodeURI(photo)}
        alt={photoLabel}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="p-5 flex flex-col gap-3 flex-1" style={{ background: '#ffffff' }}>
      <div>
        <h3 className="font-bold text-base leading-tight mb-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a', letterSpacing: '0.02em' }}>
          {title}
        </h3>
        <p className="text-xs font-semibold" style={{ color: '#4a8460', fontFamily: "'Barlow Condensed', sans-serif" }}>{subtitle}</p>
      </div>
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#555555' }}>{description}</p>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form', { detail: { procedure: procedureValue } }))}
        className="btn-pill btn-primary font-bold text-xs w-full py-2.5 mt-1"
      >
        Solicitar este Serviço
      </button>
    </div>
  </div>
);

// ─── Carousel (same logic as ProceduresSection) ─────────────────────────────────
const ServiceCarousel: React.FC<{ items: ServiceCard[] }> = ({ items }) => {
  const VISIBLE = 4;
  const n = items.length;
  const extended = [...items.slice(-VISIBLE), ...items, ...items.slice(0, VISIBLE)];
  const total = extended.length;

  const [idx, setIdx] = useState(VISIBLE);
  const [animated, setAnimated] = useState(false);
  const idxRef = useRef(VISIBLE);
  const moving = useRef(false);
  const [mIdx, setMIdx] = useState(0);

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

  // Se 4 ou menos itens no desktop, só mostrar grid simples sem carousel
  const useCarousel = n > VISIBLE;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block relative px-6">
        {useCarousel ? (
          <div style={{ overflowX: 'clip' }} className="py-4 -my-4">
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
                  <ServiceCardItem {...item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4 py-4">
            {items.map((item) => (
              <div key={item.title} className="w-1/4 flex-shrink-0">
                <ServiceCardItem {...item} />
              </div>
            ))}
          </div>
        )}

        {useCarousel && (
          <>
            <button onClick={() => go(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10" style={{ background: '#1e3d28', color: '#ffffff' }} aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => go(1)} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10" style={{ background: '#1e3d28', color: '#ffffff' }} aria-label="Próximo">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${mIdx * 100}%)` }}
          >
            {items.map((item) => (
              <div key={item.title} className="w-full flex-shrink-0 px-1">
                <ServiceCardItem {...item} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setMIdx(c => Math.max(0, c - 1))} disabled={mIdx === 0}
          className="absolute left-0 top-[192px] -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }} aria-label="Anterior">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setMIdx(c => Math.min(n - 1, c + 1))} disabled={mIdx === n - 1}
          className="absolute right-0 top-[192px] -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all disabled:opacity-30 z-10"
          style={{ background: '#1e3d28', color: '#ffffff' }} aria-label="Próximo">
          <ChevronRight className="w-5 h-5" />
        </button>
        <div className="flex justify-center gap-2 mt-5">
          {items.map((_, i) => (
            <button key={i} onClick={() => setMIdx(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ background: i === mIdx ? '#3a6b4a' : '#cce8d4' }}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </>
  );
};

// ─── ServiceGrid (static grid, replaces carousel in segment section) ────────────
const ServiceGridCard: React.FC<ServiceCard> = ({ title, subtitle, description, tags, photo, photoLabel, procedureValue }) => (
  <div className="group flex flex-col h-full transition-all duration-300 overflow-hidden rounded-xl hover:-translate-y-1 hover:shadow-xl" style={{ border: '1px solid #e8e8e8', background: '#ffffff' }}>
    <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#1e3d28' }}>
      <img
        src={photo}
        alt={photoLabel}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="p-5 flex flex-col gap-3 flex-1">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-fit" style={{ background: 'rgba(125,186,147,0.12)' }}>
        <Truck className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#3a6b4a' }} />
        <span className="text-xs font-bold" style={{ color: '#3a6b4a', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em' }}>
          {subtitle}
        </span>
      </div>
      <h3 className="font-bold text-lg leading-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#1a1a1a', letterSpacing: '0.02em' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: '#555555' }}>{description}</p>
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form', { detail: { procedure: procedureValue } }))}
        className="btn-pill btn-primary font-bold text-xs w-full py-2.5 mt-1"
      >
        Solicitar este Serviço
      </button>
    </div>
  </div>
);

const ServiceGrid: React.FC<{ items: ServiceCard[] }> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {items.map((item) => (
      <ServiceGridCard key={item.title} {...item} />
    ))}
  </div>
);

// ─── Journey de Serviços ────────────────────────────────────────────────────────
const serviceSteps = [
  {
    number: '01',
    subtitle: 'Início da operação',
    title: 'Solicitação e orçamento',
    description: 'Entre em contato pelo site, WhatsApp ou telefone. Nossa equipe avalia sua demanda e elabora um orçamento personalizado com o equipamento e operador ideais. Respondemos em até 2 horas úteis.',
    color: '#3a6b4a',
  },
  {
    number: '02',
    subtitle: 'Planejamento',
    title: 'Definição do serviço',
    description: 'Com o orçamento aprovado, planejamos o equipamento adequado, o operador qualificado e o cronograma de execução. Tudo alinhado com suas necessidades para maximizar a eficiência.',
    color: '#2a5235',
  },
  {
    number: '03',
    subtitle: 'Execução com suporte',
    title: 'Serviço em campo',
    description: 'Nossa equipe vai até o local com equipamento próprio e operador experiente. Você acompanha o andamento em tempo real e tem acesso direto à nossa central para qualquer necessidade.',
    color: '#4a8460',
  },
  {
    number: '04',
    subtitle: 'Conclusão',
    title: 'Entrega e resultado',
    description: 'O serviço é finalizado com documentação completa e registro fotográfico do trabalho executado. Sua satisfação é garantida — qualquer ajuste necessário, nossa equipe resolve imediatamente.',
    color: '#1e3d28',
  },
];

const ServicosJourney: React.FC = () => {
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
    <section id="processo" className="section-spacing relative overflow-hidden" style={{ background: '#ffffff' }}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-primary opacity-15" />
      <div className="container relative z-10">
        <div className="text-center section-header-spacing">
          <span className="lean-label block mb-3">Processo</span>
          <h2 className="lean-section-title mb-4">Como o serviço é executado</h2>
          <p className="text-base max-w-3xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
            Um processo transparente do início ao fim, com equipe qualificada e total acompanhamento em cada etapa.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 z-0"
              style={{ background: 'linear-gradient(to bottom, transparent, #cce8d4, transparent)' }} />
            <div className="md:hidden absolute left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, #cce8d4, transparent)' }} />

            <div className="space-y-12 md:space-y-20">
              {serviceSteps.map((step, index) => {
                const isVisible = visibleItems.includes(index);
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    data-index={index}
                    className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  >
                    <div className="hidden md:flex absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}
                        style={{ background: step.color, fontFamily: "'Barlow Condensed', sans-serif", fontSize: '16px' }}>
                        {step.number}
                      </div>
                    </div>
                    <div className="md:hidden absolute left-6 top-0 transform -translate-x-1/2 z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}
                        style={{ background: step.color }}>
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
                      <div className={`hidden md:block ${isEven ? 'md:order-2 md:pl-16' : 'md:pr-16'}`}>
                        <div className={`rounded-2xl p-10 flex items-center justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                          style={{ background: step.color, minHeight: '140px' }}>
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
                Do contrato à entrega, total transparência
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#555555' }}>
                Nossa central está disponível 24h para suporte durante a execução. Equipe qualificada, equipamento adequado e resultado garantido.
              </p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp-form'))}
                className="btn-pill btn-primary font-bold text-sm px-6 py-3 mt-4 w-full sm:w-auto"
              >
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Mobile Tab Accordion ───────────────────────────────────────────────────────
type TabAccordionItem = {
  id: string;
  tabLabel: string;
  description: string;
  Icon: React.ElementType;
  items: ServiceCard[];
};

const MobileTabAccordion: React.FC<{ data: TabAccordionItem[] }> = ({ data }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    document.documentElement.style.overflowAnchor = 'none';
    setOpenIdx(prev => prev === i ? null : i);
    scrollTimer.current = setTimeout(() => {
      const top = btn.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
      document.documentElement.style.overflowAnchor = '';
    }, 380);
  };

  return (
    <div className="md:hidden flex flex-col gap-2">
      {data.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={item.id} className="rounded-xl overflow-hidden" style={{ border: '1px solid #e8e8e8' }}>
            <button
              onClick={(e) => handleToggle(i, e)}
              className="w-full flex items-center justify-between px-4 py-4 text-left"
              style={{ background: isOpen ? '#1e3d28' : '#ffffff', minHeight: '56px' }}
            >
              <div className="flex items-center gap-3">
                <item.Icon className="w-4 h-4 flex-shrink-0" style={{ color: isOpen ? '#a5d6b0' : '#3a6b4a' }} />
                <span
                  className="font-bold text-base leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: isOpen ? '#ffffff' : '#1a1a1a', letterSpacing: '0.05em', textTransform: 'uppercase' }}
                >
                  {item.tabLabel}
                </span>
              </div>
              <ChevronDown
                className="flex-shrink-0 w-5 h-5 transition-transform duration-300"
                style={{ color: isOpen ? '#a5d6b0' : '#3a6b4a', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.35s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <div className="px-4 pt-4 pb-6">
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#555555' }}>{item.description}</p>
                  <ServiceGrid items={item.items} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Segment Tabs ───────────────────────────────────────────────────────────────
const segmentData = [
  {
    id: 'mineracao',
    tabLabel: 'Mineração',
    titleLine: 'Serviços em',
    titleHighlight: 'Mineração',
    description: 'Caminhões preparados para operar em solos difíceis, muito usados dentro da mina.',
    Icon: HardHat,
    items: mineracao,
    intro: null,
  },
  {
    id: 'agronegocio',
    tabLabel: 'Agronegócio',
    titleLine: 'Serviços em Fazendas e Áreas Rurais',
    titleHighlight: 'Agronegócio',
    description: 'Abertura de valas, recuperação de estradas, carregamento de materiais e preparo do solo na propriedade rural.',
    Icon: Leaf,
    items: agronegocio,
    intro: null,
  },
  {
    id: 'industrial',
    tabLabel: 'Indústrias',
    titleLine: 'Serviços em Indústrias e',
    titleHighlight: 'Áreas Industriais',
    description: 'Terraplanagem, escavação para fundações, carregamento a granel, movimentação de carga e manutenção de infraestrutura.',
    Icon: Factory,
    items: industrial,
    intro: null,
  },
  {
    id: 'residencial',
    tabLabel: 'Uso Domiciliar',
    titleLine: 'Serviços de',
    titleHighlight: 'Utilidade Domiciliar',
    description: 'Esses serviços são essenciais não somente em grande escala, fazendas e indústrias, mas para utilidade domiciliar com finalidade de agilizar e facilitar as operações produtivas do dia a dia, ganhando tempo e dinheiro.',
    Icon: Home,
    items: residencial,
    intro: null,
  },
];

const SegmentTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const seg = segmentData[active];

  return (
    <div>
      {/* Mobile: accordion */}
      <MobileTabAccordion data={segmentData} />

      {/* Desktop: tabs */}
      <div className="hidden md:block">
      {/* Tab row */}
      <div className="flex overflow-x-auto border-b" style={{ borderColor: '#e0e0e0' }}>
        {segmentData.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className="flex items-center gap-2 px-5 py-4 font-bold text-sm whitespace-nowrap transition-colors relative flex-shrink-0"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: active === i ? '#3a6b4a' : '#888888',
            }}
          >
            <s.Icon className="w-4 h-4" />
            {s.tabLabel}
            {active === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: '#3a6b4a' }} />
            )}
          </button>
        ))}
      </div>

      {/* Segment banner — full width */}
      <div className="py-8 mb-8"
        style={{ background: '#1e3d28', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
        <div className="container flex items-center gap-6">
          <seg.Icon className="w-14 h-14 flex-shrink-0 hidden sm:block" style={{ color: '#7dba93' }} />
          <div>
            <h3 className="font-black leading-tight mb-2 text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.5px' }}>
              {seg.titleLine} <span style={{ color: '#7dba93' }}>{seg.titleHighlight}</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#a5d1b4' }}>{seg.description}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <ServiceGrid items={seg.items} />
      </div>{/* end hidden md:block */}
    </div>
  );
};

// ─── Equipment Tabs ─────────────────────────────────────────────────────────────
const equipmentData = [
  {
    id: 'cacamba',
    tabLabel: 'Caminhões Basculantes',
    titleLine: 'Caminhões',
    titleHighlight: 'Basculantes',
    description: 'MB Axor 3131 — veículos projetados para operações pesadas que exigem alta robustez e capacidade de tração. Locações para obras rurais, mineração e terraplanagem.',
    Icon: Route,
    items: equipCacamba,
  },
  {
    id: 'munck',
    tabLabel: 'Caminhões Munck',
    titleLine: 'Caminhões',
    titleHighlight: 'Munck',
    description: 'Ford Cargo 2629 e M.Benz Atego 3133/48. Içamento de cargas pesadas, posicionamento de estruturas, transporte de equipamentos e operações com cesto aéreo.',
    Icon: Truck,
    items: equipMunck,
  },
  {
    id: 'xcmg',
    tabLabel: 'Escavadeiras',
    titleLine: '',
    titleHighlight: 'Escavadeiras',
    description: 'Peso operacional de 22.500 kg e caçamba de 1,2 m³. Lanças e braços reforçados com aço de alta resistência. Ideal para mineração, obras rurais, demolição e construção civil.',
    Icon: Building2,
    items: equipXCMG,
  },
  {
    id: 'jcb',
    tabLabel: 'Retroescavadeiras',
    titleLine: '',
    titleHighlight: 'Retroescavadeiras',
    description: 'Profundidade de escavação de 4,54 metros (com braço extensor). Peso operacional de 8.185 kg. Versátil para escavação profunda, terraplanagem, carregamento e serviços agrícolas.',
    Icon: Wrench,
    items: equipJCB,
  },
  {
    id: 'carregadeira',
    tabLabel: 'Carregadeiras',
    titleLine: '',
    titleHighlight: 'Carregadeiras',
    description: 'Equipamentos versáteis para carregamento de materiais a granel, movimentação de terra e suporte a operações de mineração, terraplanagem e agronegócio.',
    Icon: Shovel,
    items: equipCarregadeira,
  },
  {
    id: 'pipa',
    tabLabel: 'Caminhões Pipa',
    titleLine: 'Caminhões',
    titleHighlight: 'Pipa',
    description: 'MB Axor 3131 com tanque de 20.000 litros e sistema completo de bombeamento. Umectação de solo, suporte à terraplanagem, limpeza e irrigação.',
    Icon: Droplets,
    items: equipPipa,
  },
];

const EquipmentTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const eq = equipmentData[active];

  return (
    <div>
      {/* Mobile: accordion */}
      <MobileTabAccordion data={equipmentData} />

      {/* Desktop: tabs */}
      <div className="hidden md:block">
      {/* Tab row */}
      <div className="flex overflow-x-auto border-b" style={{ borderColor: '#e0e0e0' }}>
        {equipmentData.map((e, i) => (
          <button
            key={e.id}
            onClick={() => setActive(i)}
            className="flex items-center gap-2 px-5 py-4 font-bold text-sm whitespace-nowrap transition-colors relative flex-shrink-0"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: active === i ? '#3a6b4a' : '#888888',
            }}
          >
            <e.Icon className="w-4 h-4" />
            {e.tabLabel}
            {active === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: '#3a6b4a' }} />
            )}
          </button>
        ))}
      </div>

      {/* Equipment banner — full width */}
      <div className="py-8 mb-8"
        style={{ background: '#1e3d28', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw' }}>
        <div className="container flex items-center gap-6">
          <eq.Icon className="w-14 h-14 flex-shrink-0 hidden sm:block" style={{ color: '#7dba93' }} />
          <div>
            <h3 className="font-black leading-tight mb-2 text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(26px, 3.5vw, 44px)', letterSpacing: '-0.5px' }}>
              {eq.titleLine} <span style={{ color: '#7dba93' }}>{eq.titleHighlight}</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#a5d1b4' }}>{eq.description}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <ServiceGrid items={eq.items} />
      </div>{/* end hidden md:block */}
    </div>
  );
};

// ─── Section divider ────────────────────────────────────────────────────────────
const SectionTitle: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-px flex-1" style={{ background: '#cce8d4' }} />
    <h3 className="text-xl font-bold tracking-wide uppercase px-4"
      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#2a5235', letterSpacing: '0.08em' }}>
      {label}
    </h3>
    <div className="h-px flex-1" style={{ background: '#cce8d4' }} />
  </div>
);

// ─── Hero ───────────────────────────────────────────────────────────────────────
const ServicosHero: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!heroImgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(heroImgRef.current,
        { y: '-10%' },
        { y: '10%', ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-16 lg:pt-20 relative overflow-hidden flex items-center" style={{ minHeight: 'min(90vh, 620px)' }}>
      {/* BG desktop */}
      <img
        ref={heroImgRef}
        src="/lovable-uploads/hero-service.webp"
        alt="LEAN Locação e Serviços — serviços de terraplanagem e mineração"
        className="hidden lg:block absolute w-full object-cover"
        style={{ height: '130%', top: '-15%', willChange: 'transform', objectPosition: 'right center' }}
        fetchPriority="high" loading="eager" decoding="sync" width="1920" height="1080"
      />
      <div className="hidden lg:block absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(10,28,16,0.93) 0%, rgba(20,50,30,0.87) 50%, rgba(10,28,16,0.5) 100%)' }} />
      <div className="lg:hidden absolute inset-0" style={{ background: '#0e2016' }} />

      <div className="container relative z-10 w-full">
        {/* Mobile: foto em cima */}
        <div className="lg:hidden pt-4 pb-0">
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-3">
            <img src="/lovable-uploads/hero-service.webp" alt="LEAN Locação e Serviços" className="w-full h-full object-cover object-center" loading="eager" decoding="async" width="640" height="360" />
          </div>
        </div>

        <div className="max-w-3xl pt-3 pb-8 lg:py-12">
          <div className="mb-6">
            <span className="inline-block text-[#7dba93] text-xs font-bold tracking-[0.3em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Serviços Especializados · Minas Gerais e Região · Desde 2008
            </span>
          </div>

          <h1 className="text-white mb-6 leading-[0.95]" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-1px' }}>
            Prestação de serviços com caminhões basculantes, munck, pipa <span style={{ color: '#7dba93' }}>e máquinas em Minas Gerais.</span>
          </h1>

          <p className="text-[#a5d1b4] text-lg md:text-xl leading-relaxed mb-10 max-w-xl" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400 }}>
            A Lean Locação e Serviços, sediada em Morro do Ferro, distrito de Oliveira – MG, atua com soluções completas em prestação de serviços e locação de equipamentos para mineração, agronegócio e operações industriais. Nossa equipe técnica e frota especializada garantem eficiência, segurança e acompanhamento em todas as etapas do projeto.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onCta}
              className="btn-pill text-base font-bold min-h-[52px] w-full sm:w-auto transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              style={{ background: '#ffffff', color: '#1e3d28', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 2rem' }}
            >
              Solicitar Orçamento
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

// ─── Nav links da página de serviços ────────────────────────────────────────────
const servicosNavLinks = [
  { label: 'Serviços', id: 'servicos', Icon: Wrench },
  { label: 'Equipamentos', id: 'equipamentos', Icon: Truck },
  { label: 'Como Funciona', id: 'processo', Icon: Route },
  { label: 'Sobre', id: 'sobre', Icon: Building2 },
];

// ─── Main Page ──────────────────────────────────────────────────────────────────
const Servicos = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [whatsAppFormData, setWhatsAppFormData] = useState({ ...initialFormState });
  const [hasStartedWhatsAppForm, setHasStartedWhatsAppForm] = useState(false);
  const { toast } = useToast();
  const trackingData = useUserTracking();
  const dataLayer = useDataLayer();

  const preloadFormUtils = useCallback(() => { getFormUtils(); }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSuccessPopupOpen && countdown > 0) timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isSuccessPopupOpen, countdown]);

  const handleWhatsAppPhoneChange = useCallback(async (value: string) => {
    const [phoneUtils] = await getFormUtils();
    setWhatsAppFormData(prev => ({ ...prev, phone: phoneUtils.applyPhoneMask(value) }));
    if (!hasStartedWhatsAppForm && value.length > 0) { setHasStartedWhatsAppForm(true); dataLayer.trackFormStart('whatsapp'); }
  }, [hasStartedWhatsAppForm, dataLayer]);

  const handleCountryChange = useCallback(async (countryName: string, _formType: 'main' | 'whatsapp') => {
    const [,, , countriesModule] = await getFormUtils();
    const selected = countriesModule.countries.find((c: any) => c.name === countryName);
    setWhatsAppFormData(prev => ({ ...prev, country: countryName, countryCode: selected?.code || '' }));
  }, []);

  const handleWhatsAppFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsAppFormData.name?.trim()) { toast({ title: "Nome obrigatório", description: "Por favor, preencha seu nome.", variant: "destructive" }); return; }
    if (!whatsAppFormData.phone?.trim()) { toast({ title: "Telefone obrigatório", description: "Por favor, preencha seu telefone.", variant: "destructive" }); return; }
    if (!whatsAppFormData.procedure?.trim()) { toast({ title: "Seleção obrigatória", description: "Por favor, selecione o serviço.", variant: "destructive" }); return; }
    if (!whatsAppFormData.city?.trim()) { toast({ title: "Local obrigatório", description: "Por favor, informe o local da obra.", variant: "destructive" }); return; }

    dataLayer.trackFormSubmit('whatsapp', whatsAppFormData);
    const [phoneUtils, whatsappUtils, webhookUtils] = await getFormUtils();
    const formDataToSend = {
      name: whatsAppFormData.name.trim(), email: whatsAppFormData.email.trim(),
      phone: phoneUtils.extractPhoneNumbers(whatsAppFormData.phone),
      country: whatsAppFormData.country || '', countryCode: whatsAppFormData.countryCode || '',
      city: whatsAppFormData.city || '', location: whatsAppFormData.location || '',
      procedure: whatsAppFormData.procedure || '',
      customProcedure: whatsAppFormData.procedure === 'Outro' ? (whatsAppFormData.customProcedure || '') : '',
      message: whatsAppFormData.message || '', origem: trackingData.origem || 'direto',
      midia: trackingData.midia || 'direto', url: trackingData.url || window.location.href, formulario: 'whatsapp',
    };
    const webhookResult = await webhookUtils.sendToWebhook(formDataToSend);
    if (webhookResult.success) dataLayer.trackLeadGenerated(formDataToSend);
    const url = whatsappUtils.createWhatsAppUrl(whatsAppFormData, trackingData);
    setWhatsappUrl(url); setCountdown(3); setIsSuccessPopupOpen(true); setIsWhatsAppOpen(false);
    setWhatsAppFormData({ ...initialFormState }); setHasStartedWhatsAppForm(false);
  }, [whatsAppFormData, trackingData, dataLayer, toast]);

  const handleWhatsAppFormFieldChange = useCallback((field: string, value: string) => {
    setWhatsAppFormData(prev => ({ ...prev, [field]: value }));
    if (!hasStartedWhatsAppForm && value.length > 0) { setHasStartedWhatsAppForm(true); dataLayer.trackFormStart('whatsapp'); }
  }, [hasStartedWhatsAppForm, dataLayer]);

  const handleWhatsAppOpen = useCallback(() => {
    setIsWhatsAppOpen(true); dataLayer.trackWhatsAppOpen(); preloadFormUtils();
  }, [dataLayer, preloadFormUtils]);

  useEffect(() => {
    const handler = (e: Event) => {
      const procedure = (e as CustomEvent).detail?.procedure;
      if (procedure) setWhatsAppFormData(prev => ({ ...prev, procedure }));
      handleWhatsAppOpen();
    };
    window.addEventListener('open-whatsapp-form', handler);
    return () => window.removeEventListener('open-whatsapp-form', handler);
  }, [handleWhatsAppOpen]);

  const scrollToSection = useCallback((id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#f7f6f3' }}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} navLinks={servicosNavLinks} />

      <ServicosHero onCta={handleWhatsAppOpen} />

      <Suspense fallback={null}>
        <StatsSection />
      </Suspense>

      <main>
        <section id="servicos" className="section-spacing relative overflow-hidden" style={{ background: '#f7f6f3' }}>
          <div className="absolute inset-0 gradient-glow-bottom pointer-events-none" />
          <div className="container relative z-10">

            <AnimatedSection>
              <div className="text-center section-header-spacing">
                <span className="lean-label block mb-3">O que fazemos</span>
                <h2 className="lean-section-title mb-4">
                  Nossos <span style={{ color: '#3a6b4a' }}>Serviços</span>
                </h2>
                <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
                  Soluções completas com equipamentos pesados para mineração, agronegócio, indústria e uso domiciliar.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <SegmentTabs />
            </AnimatedSection>

          </div>
        </section>

        <section id="equipamentos" className="section-spacing relative overflow-hidden" style={{ background: '#ffffff' }}>
          <div className="container relative z-10">
            <AnimatedSection>
              <div className="text-center section-header-spacing">
                <span className="lean-label block mb-3">Nossa Frota</span>
                <h2 className="lean-section-title mb-4">
                  Serviços por <span style={{ color: '#3a6b4a' }}>Equipamento</span>
                </h2>
                <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
                  Cada máquina da nossa frota tem aplicações específicas. Veja o que cada equipamento pode fazer pelo seu projeto.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <EquipmentTabs />
            </AnimatedSection>
          </div>
        </section>

        {/* <ServicosJourney /> */}

        {/* <Suspense fallback={null}>
          <ClinicSection />
        </Suspense> */}

        {/* <Suspense fallback={null}>
          <SpecialtySection />
        </Suspense> */}

        {/* Seção Locação */}
        <section className="section-spacing relative overflow-hidden" style={{ background: '#1e3d28' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(74,132,96,0.18) 0%, transparent 70%)' }} />

          <div className="container relative z-10">
            <AnimatedSection>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
                  style={{ color: '#7dba93', background: 'rgba(125,186,147,0.12)', fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Locação de Equipamentos
                </span>
                <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '-0.5px' }}>
                  Também alugamos<br />
                  <span style={{ color: '#7dba93' }}>equipamentos pesados</span>
                </h2>
                <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#a5c9b2' }}>
                  Além da prestação de serviços, a LEAN oferece locação de caminhões basculantes, caminhões munck, carregadeiras, escavadeiras e retroescavadeiras para sua operação. Conheça nossa frota completa.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              {(() => {
                const items = [
                  { title: 'Caminhões Basculantes', desc: 'MB Axor 3131 e VW 3260 para mineração, terraplanagem e obras.' },
                  { title: 'Caminhões Munck', desc: 'Ford Cargo 2629 e MB Atego 3133 — içamento até 10.000 kg.' },
                  { title: 'Escavadeiras', desc: '22.500 kg / 1,2 m³ para terraplanagem e construção civil.' },
                  { title: 'Retroescavadeiras', desc: '8.185 kg / 4,54 m de profundidade para obras rurais e urbanas.' },
                  { title: 'Carregadeiras', desc: 'Carregamento a granel, movimentação de terra e suporte à mineração e terraplanagem.' },
                ];
                const card = ({ title, desc }: { title: string; desc: string }) => (
                  <div key={title}
                    className="group flex flex-col gap-4 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: '#7dba93' }} />
                    <div>
                      <h3 className="text-lg font-bold mb-1"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#ffffff', letterSpacing: '0.02em' }}>
                        {title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#a5c9b2' }}>{desc}</p>
                    </div>
                  </div>
                );
                return (
                  <div className="flex flex-col gap-5 mb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {items.slice(0, 3).map(card)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto">
                      {items.slice(3).map(card)}
                    </div>
                  </div>
                );
              })()}
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
                <button
                  onClick={() => navigate('/locacao-de-equipamento')}
                  className="btn-pill btn-primary font-bold text-sm px-8 py-3.5 flex items-center justify-center gap-2 w-full sm:w-auto transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
                >
                  Ver Equipamentos
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-xs" style={{ color: '#7dba93' }}>
                  Frota moderna com manutenção preventiva rigorosa.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Suspense fallback={null}>
          <AboutSection />
        </Suspense>

        {/* <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense> */}

      </main>

      <Suspense fallback={null}><StatsBar /></Suspense>
      <Suspense fallback={null}><Footer /></Suspense>

      <Suspense fallback={null}>
        <WhatsAppPopup
          isWhatsAppOpen={isWhatsAppOpen} setIsWhatsAppOpen={setIsWhatsAppOpen}
          whatsAppFormData={whatsAppFormData} setWhatsAppFormData={setWhatsAppFormData}
          handleWhatsAppFormSubmit={handleWhatsAppFormSubmit}
          handleWhatsAppPhoneChange={handleWhatsAppPhoneChange}
          handleCountryChange={handleCountryChange}
          handleWhatsAppFormFieldChange={handleWhatsAppFormFieldChange}
          handleWhatsAppOpen={handleWhatsAppOpen}
          hasStartedWhatsAppForm={hasStartedWhatsAppForm}
        />
      </Suspense>

      <Suspense fallback={null}>
        <SuccessPopup isOpen={isSuccessPopupOpen} onClose={() => { setIsSuccessPopupOpen(false); setCountdown(3); }} onRedirect={() => { if (whatsappUrl) window.location.href = whatsappUrl; setIsSuccessPopupOpen(false); }} countdown={countdown} />
      </Suspense>
    </div>
  );
};

export default Servicos;
