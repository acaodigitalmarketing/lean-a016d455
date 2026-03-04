export interface VideoTestimonial {
  id: string;
  name: string;
  procedure: string;
  videoUrl: string;
  thumbnailTime?: number;
}

export interface ImageTestimonial {
  id: string;
  name: string;
  imageUrl: string;
}

export const videoTestimonials: VideoTestimonial[] = [
  {
    id: "video-new-1",
    name: "Paciente",
    procedure: "Cirurgia Plástica",
    videoUrl: "/videos/depoimento-paciente-1.mp4",
    thumbnailTime: 1
  },
  {
    id: "video-new-2",
    name: "Paciente",
    procedure: "Cirurgia Plástica",
    videoUrl: "/videos/depoimento-paciente-2.mp4",
    thumbnailTime: 1
  }
];

export const imageTestimonials: ImageTestimonial[] = [
  {
    id: "img1",
    name: "Paciente",
    imageUrl: "/lovable-uploads/depoimento-whatsapp-1.jpg"
  },
  {
    id: "img2",
    name: "Paciente",
    imageUrl: "/lovable-uploads/depoimento-instagram-1.jpg"
  },
  {
    id: "img3",
    name: "Paciente",
    imageUrl: "/lovable-uploads/depoimento-whatsapp-2.jpg"
  },
  {
    id: "img4",
    name: "Paciente",
    imageUrl: "/lovable-uploads/depoimento-instagram-2.jpg"
  }
];
