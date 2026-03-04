
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Play, Star } from 'lucide-react';
import { videoTestimonials, imageTestimonials } from '@/data/testimonials';
import { AnimatedSection } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';

const StarRating = () => (
  <div className="flex justify-center space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} className="h-4 w-4 fill-light-primary text-light-primary" />
    ))}
  </div>
);

// Hook to extract a poster frame from a video URL
const useVideoThumbnail = (videoUrl: string, time = 1): string | null => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.src = videoUrl;

    const handleSeeked = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 360;
        canvas.height = video.videoHeight || 640;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setThumbnail(canvas.toDataURL('image/jpeg', 0.7));
        }
      } catch {
        // CORS or other error — leave as null
      }
      video.removeAttribute('src');
      video.load();
    };

    const handleLoaded = () => {
      if (cancelled) return;
      video.currentTime = Math.min(time, video.duration || time);
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('seeked', handleSeeked);
    video.load();

    return () => {
      cancelled = true;
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
      video.removeAttribute('src');
      video.load();
    };
  }, [videoUrl, time]);

  return thumbnail;
};

const VideoTestimonialCard: React.FC<{
  testimonial: (typeof videoTestimonials)[number];
  isPlaying: boolean;
  onPlay: (id: string) => void;
  onEnded: () => void;
  videoRef: (el: HTMLVideoElement | null) => void;
}> = ({ testimonial, isPlaying, onPlay, onEnded, videoRef }) => {
  const thumbnail = useVideoThumbnail(testimonial.videoUrl, testimonial.thumbnailTime ?? 1);

  return (
    <div className="bg-dark-border p-[1px] rounded-2xl overflow-hidden">
      <div className="relative aspect-[9/16] group rounded-2xl overflow-hidden bg-dark-surface">
        {isPlaying ? (
          <video
            ref={videoRef}
            src={testimonial.videoUrl}
            className="w-full h-full object-cover"
            playsInline
            controls
            autoPlay
            preload="auto"
            onEnded={onEnded}
          />
        ) : (
          <>
            {/* Thumbnail from video frame */}
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`Depoimento de ${testimonial.name}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="360"
                height="640"
              />
            ) : (
              <div className="absolute inset-0 bg-dark-surface" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-dark-base/90 via-dark-base/20 to-transparent pointer-events-none" />

            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
              onClick={() => onPlay(testimonial.id)}
              role="button"
              aria-label={`Reproduzir depoimento de ${testimonial.name}`}
            >
              <div className="w-16 h-16 rounded-full bg-light-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
                <Play className="h-8 w-8 text-dark-base ml-1" fill="currentColor" />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-center pointer-events-none z-10">
              <div className="mb-2"><StarRating /></div>
              <p className="text-light-primary text-lg">{testimonial.name}</p>
              <p className="text-light-secondary text-sm">{testimonial.procedure}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const { ref: parallaxRef, offset } = useParallax({ speed: 0.15 });
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlayVideo = useCallback((videoId: string) => {
    // Pause any currently playing video
    if (playingVideo && playingVideo !== videoId && videoRefs.current[playingVideo]) {
      videoRefs.current[playingVideo]?.pause();
    }
    setPlayingVideo(videoId);
  }, [playingVideo]);

  const handleVideoEnded = useCallback(() => {
    setPlayingVideo(null);
  }, []);

  // Interleave: start with a video, alternate with images
  const allTestimonials = (() => {
    const videos = videoTestimonials.map(t => ({ ...t, type: 'video' as const }));
    const images = imageTestimonials.map(t => ({ ...t, type: 'image' as const }));
    const result: Array<(typeof videos)[number] | (typeof images)[number]> = [];
    const maxLen = Math.max(videos.length, images.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < videos.length) result.push(videos[i]);
      if (i < images.length) result.push(images[i]);
    }
    return result;
  })();

  return (
    <section id="depoimentos" ref={parallaxRef} className="section-spacing bg-dark-base relative overflow-hidden">
      {/* Background com parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-center opacity-5 will-change-transform"
        style={{
          backgroundImage: `url('/lovable-uploads/fundo-depoimentos-pacientes.jpg')`,
          transform: `translateY(${offset}px) scale(1.15)`,
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 gradient-glow" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] decorative-blur decorative-blur-accent opacity-15" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection>
        <div className="text-center section-header-spacing">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-light-primary mb-4 md:mb-8 leading-tight tracking-tight">
            O que minhas <span className="text-gradient">pacientes dizem</span>
          </h2>
          <p className="text-base md:text-xl text-light-muted max-w-4xl mx-auto leading-relaxed">
            Relatos que refletem a experiência, o cuidado e o acompanhamento ao longo da jornada cirúrgica.
          </p>
        </div>
        </AnimatedSection>
        
        <AnimatedSection delay={150}>
        <div className="max-w-6xl mx-auto relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              startIndex: 0,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {allTestimonials.map((testimonial) => {
                if (testimonial.type === 'video') {
                  return (
                    <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 lg:basis-1/3">
                      <Card className="premium-card premium-card--media h-full overflow-hidden !rounded-2xl !border-0 !bg-transparent !shadow-none">
                        <CardContent className="p-0 h-full flex flex-col">
                          <VideoTestimonialCard
                            testimonial={testimonial}
                            isPlaying={playingVideo === testimonial.id}
                            onPlay={handlePlayVideo}
                            onEnded={handleVideoEnded}
                            videoRef={(el) => { videoRefs.current[testimonial.id] = el; }}
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                } else {
                  return (
                    <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 lg:basis-1/3">
                      <Card className="premium-card premium-card--media h-full overflow-hidden !rounded-2xl !border-0 !bg-transparent !shadow-none">
                        <CardContent className="p-0 h-full flex flex-col">
                          <div className="bg-dark-border p-[1px] rounded-2xl overflow-hidden">
                            <div className="relative aspect-[9/16] group rounded-2xl overflow-hidden">
                              <img
                                src={testimonial.imageUrl}
                                alt={`Depoimento de paciente`}
                                className="w-full h-full object-cover bg-dark-surface"
                                loading="lazy"
                                decoding="async"
                                width="360"
                                height="640"
                              />
                              
                              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-base/80 to-transparent pointer-events-none" />
                              
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-center pointer-events-none">
                                <StarRating />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                }
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-6 top-1/2 -translate-y-1/2 bg-light-primary hover:bg-light-primary/90 text-dark-base border-none z-10" />
            <CarouselNext className="-right-6 top-1/2 -translate-y-1/2 bg-light-primary hover:bg-light-primary/90 text-dark-base border-none z-10" />
          </Carousel>
        </div>
        </AnimatedSection>

        <p className="text-xs text-light-muted text-center mt-10 max-w-3xl mx-auto leading-relaxed italic">
          Os resultados podem variar conforme as características individuais de cada paciente.<br />
          As imagens apresentadas são meramente ilustrativas.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;
