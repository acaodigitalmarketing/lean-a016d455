
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { procedureGroups } from '@/data/procedures';
import { countries } from '@/data/countries';
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
    <section id="agendamento" className="section-spacing bg-dark-elevated overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] decorative-blur decorative-blur-primary opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] decorative-blur decorative-blur-accent opacity-15" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="text-center section-header-spacing max-w-5xl mx-auto">
            <span className="subtitle-wide text-[hsl(43,74%,49%)] mb-4 block">Sua transformação começa aqui</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-6 md:mb-8 leading-tight tracking-tight">
              Pronta para iniciar sua jornada com{' '}
              <span className="text-gradient">segurança e cuidado?</span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[hsl(43,74%,49%)] to-transparent mx-auto mb-6" />
            <p className="text-sm md:text-base text-light-muted max-w-3xl mx-auto leading-relaxed mb-6">
              Agende sua consulta comigo e tenha uma avaliação completa, com tempo dedicado, escuta atenta e planejamento personalizado. O atendimento é realizado em São Paulo, em um ambiente acolhedor e organizado, com acompanhamento próximo em todas as etapas.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="max-w-3xl mx-auto">
            {/* Form Card with border */}
            <div id="agendamento-form" className="border border-white/10 rounded-2xl p-6 md:p-10 bg-dark-surface/50 backdrop-blur-sm">
              {/* Warning message */}
              <div className="flex items-start gap-3 mb-8 p-4 bg-dark-subtle rounded-xl border border-white/5">
                <span className="text-amber-400 text-xl flex-shrink-0">⚠</span>
                <p className="text-light-muted text-sm">
                  <strong className="text-light-primary">Atenção:</strong> As consultas são realizadas mediante agendamento prévio. Valores, formas de pagamento e datas são informados pela equipe no momento do contato.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Hidden tracking fields */}
                <input type="hidden" name="origem" value={trackingData.origem} />
                <input type="hidden" name="midia" value={trackingData.midia} />
                <input type="hidden" name="url" value={trackingData.url} />
                <input type="hidden" name="countryCode" value={formData.countryCode} />
                
                {/* Row 1: Nome + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-light-secondary mb-2">
                      Nome Completo *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleMainFormFieldChange('name', e.target.value)}
                      className="input-dark h-12 text-base rounded-xl"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-secondary mb-2">
                      E-mail *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleMainFormFieldChange('email', e.target.value)}
                      className="input-dark h-12 text-base rounded-xl"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Row 2: País + Telefone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-light-secondary mb-2">
                      País *
                    </label>
                    <Select value={formData.country || "Brasil"} onValueChange={(value) => handleCountryChange(value, 'main')}>
                      <SelectTrigger className="input-dark h-12 text-base rounded-xl [&>span]:text-light-muted [&>span]:data-[state=checked]:text-light-primary" aria-label="Selecionar país">
                        <SelectValue placeholder="Brasil" />
                      </SelectTrigger>
                      <SelectContent className="bg-dark-surface border-dark-border z-50 max-h-60">
                        {countries.map((country, index) => (
                          <SelectItem key={index} value={country.name} className="text-light-primary hover:bg-dark-subtle focus:bg-dark-subtle focus:text-light-primary">
                            {country.name} {country.code && `(${country.code})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-light-secondary mb-2">
                      Telefone/WhatsApp *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="input-dark h-12 text-base rounded-xl"
                      placeholder="(XX) XXXXX-XXXX"
                      maxLength={15}
                    />
                  </div>
                </div>

                {/* Row 3: Procedimento de Interesse */}
                <div>
                  <label className="block text-sm font-medium text-light-secondary mb-2">
                    Procedimento de Interesse *
                  </label>
                  <Select 
                    required
                    value={formData.procedure} 
                    onValueChange={(value) => {
                      setFormData({...formData, procedure: value, customProcedure: value === 'Outro' ? formData.customProcedure : ''});
                      if (!hasStartedMainForm) {
                        dataLayer.trackFormStart('principal');
                      }
                    }}
                  >
                    <SelectTrigger className="input-dark h-12 text-base rounded-xl [&>span]:text-light-muted [&>span]:data-[state=checked]:text-light-primary" aria-label="Selecionar motivo">
                      <SelectValue placeholder="Ex.: Mamoplastia, Mastopexia, Lipo HD, Abdominoplastia..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-dark-border z-50">
                      {procedureGroups.map((group) => (
                        <SelectGroup key={group.label}>
                          <SelectLabel className="text-light-muted text-xs uppercase tracking-wider px-3 py-2 font-semibold">{group.label}</SelectLabel>
                          {group.options.map((procedure, index) => (
                            <SelectItem key={index} value={procedure} className="text-light-primary hover:bg-dark-subtle focus:bg-dark-subtle focus:text-light-primary pl-6">
                              {procedure}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional custom procedure field */}
                {formData.procedure === 'Outro' && (
                  <div>
                    <label className="block text-sm font-medium text-light-secondary mb-2">
                      Especifique o Procedimento *
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.customProcedure}
                      onChange={(e) => handleMainFormFieldChange('customProcedure', e.target.value)}
                      className="input-dark h-12 text-base rounded-xl"
                      placeholder="Digite o nome do procedimento desejado"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full btn-pill btn-gold h-auto min-h-[3.5rem] py-3 text-base sm:text-lg font-semibold px-4"
                >
                  <Calendar className="mr-2 h-5 w-5 shrink-0" />
                  Agendar Consulta Agora
                </Button>

                {/* Trust text */}
                <p className="text-xs text-light-muted text-center leading-relaxed">
                  Ao enviar este formulário, minha equipe entrará em contato para orientar sobre disponibilidade de datas, valores e próximos passos. Todas as informações são tratadas com sigilo e responsabilidade.
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
