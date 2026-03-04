
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';
import { procedureGroups } from '@/data/procedures';
import { useUserTracking } from '@/hooks/useUserTracking';
import { useDataLayer } from '@/hooks/useDataLayer';
import { AnimatedSection } from '@/hooks/useScrollAnimation';

interface ContactSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
  handlePhoneChange: (value: string) => void;
  handleMainFormFieldChange: (field: string, value: string) => void;
  handleCountryChange: (countryName: string, formType: 'main' | 'whatsapp') => void;
  hasStartedMainForm: boolean;
}

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 700,
  fontFamily: "'Barlow Condensed', sans-serif",
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: '#3f3f3f',
  marginBottom: '8px',
};

const inputStyle = {
  background: '#ffffff',
  border: '2px solid #cccccc',
  borderRadius: '4px',
  color: '#1a1a1a',
  fontSize: '15px',
  padding: '12px 16px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const ContactSection: React.FC<ContactSectionProps> = ({
  formData,
  setFormData,
  handleFormSubmit,
  handlePhoneChange,
  handleMainFormFieldChange,
  handleCountryChange,
  hasStartedMainForm
}) => {
  const trackingData = useUserTracking();
  const dataLayer = useDataLayer();

  return (
    <section id="cotacao" className="section-spacing overflow-hidden relative" style={{ background: '#f7f6f3' }}>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] decorative-blur decorative-blur-primary opacity-15" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] decorative-blur decorative-blur-accent opacity-10" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="text-center section-header-spacing max-w-5xl mx-auto">
            <span className="lean-label block mb-3">Fale Conosco</span>
            <h2 className="lean-section-title mb-4">Solicite sua cotacao</h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed mt-4" style={{ color: '#555555' }}>
              Preencha o formulario e nossa equipe entra em contato em ate 2 horas uteis com a melhor proposta para sua carga.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto">
            <div id="agendamento-form" className="lean-card p-6 md:p-10">

              {/* Info bar */}
              <div className="flex items-start gap-3 mb-8 p-4 rounded-xl" style={{ background: '#eaf5ed', border: '1px solid #cce8d4' }}>
                <span className="text-xl flex-shrink-0">📦</span>
                <p className="text-sm" style={{ color: '#2a5235' }}>
                  <strong>Atendimento rapido:</strong> Respondemos em ate 2 horas uteis com cotacao personalizada. Para urgencias, fale pelo WhatsApp.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <input type="hidden" name="origem" value={trackingData.origem} />
                <input type="hidden" name="midia" value={trackingData.midia} />
                <input type="hidden" name="url" value={trackingData.url} />
                <input type="hidden" name="countryCode" value={formData.countryCode} />

                {/* Row 1: Nome + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={labelStyle}>Nome Completo *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleMainFormFieldChange('name', e.target.value)}
                      className="input-dark h-12 text-base"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>E-mail *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleMainFormFieldChange('email', e.target.value)}
                      className="input-dark h-12 text-base"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Row 2: Telefone + Cidade Origem */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={labelStyle}>Telefone / WhatsApp *</label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="input-dark h-12 text-base"
                      placeholder="(XX) XXXXX-XXXX"
                      maxLength={15}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Cidade de Origem *</label>
                    <Input
                      type="text"
                      required
                      value={formData.country || ''}
                      onChange={(e) => handleMainFormFieldChange('country', e.target.value)}
                      className="input-dark h-12 text-base"
                      placeholder="Ex: Sao Paulo, SP"
                    />
                  </div>
                </div>

                {/* Row 3: Cidade Destino + Tipo de Carga */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label style={labelStyle}>Cidade de Destino *</label>
                    <Input
                      type="text"
                      required
                      value={formData.city || ''}
                      onChange={(e) => handleMainFormFieldChange('city', e.target.value)}
                      className="input-dark h-12 text-base"
                      placeholder="Ex: Belo Horizonte, MG"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Tipo de Carga *</label>
                    <Select
                      required
                      value={formData.procedure}
                      onValueChange={(value) => {
                        setFormData({ ...formData, procedure: value, customProcedure: value === 'Outro' ? formData.customProcedure : '' });
                      }}
                    >
                      <SelectTrigger className="input-dark h-12 text-base" aria-label="Tipo de carga">
                        <SelectValue placeholder="Selecione o tipo de carga..." />
                      </SelectTrigger>
                      <SelectContent className="z-50 max-h-60" style={{ background: '#ffffff', border: '1px solid #ccc' }}>
                        {procedureGroups.map((group) => (
                          <SelectGroup key={group.label}>
                            <SelectLabel className="text-xs uppercase tracking-wider px-3 py-2 font-bold" style={{ color: '#777', fontFamily: "'Barlow Condensed', sans-serif" }}>
                              {group.label}
                            </SelectLabel>
                            {group.options.map((item, index) => (
                              <SelectItem key={index} value={item} className="pl-6" style={{ color: '#1a1a1a' }}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Observacoes */}
                <div>
                  <label style={labelStyle}>Observacoes (peso, volume, urgencia)</label>
                  <textarea
                    value={formData.message || ''}
                    onChange={(e) => handleMainFormFieldChange('message', e.target.value)}
                    rows={3}
                    className="input-dark text-base resize-none w-full"
                    placeholder="Ex: Carga de 500 kg, paletizada, preciso entregar em 3 dias..."
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-pill btn-primary h-auto min-h-[3.5rem] py-3 text-base font-bold"
                >
                  <Send className="mr-2 h-5 w-5 shrink-0" />
                  Solicitar Cotacao Agora
                </Button>

                <p className="text-xs text-center leading-relaxed" style={{ color: '#777777' }}>
                  Ao enviar, nossa equipe entrara em contato em ate 2 horas uteis com a melhor proposta para sua operacao. Todas as informacoes sao tratadas com sigilo.
                </p>
              </form>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactSection;
