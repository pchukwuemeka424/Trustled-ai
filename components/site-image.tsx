import Image from "next/image";

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function SiteImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: SiteImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}

type HeroBackdropProps = {
  src: string;
  alt?: string;
};

export function HeroBackdrop({ src, alt = "" }: HeroBackdropProps) {
  return (
    <div className="hero-background" aria-hidden={alt ? undefined : true}>
      <div
        className="hero-bg-image"
        style={{ backgroundImage: `url("${src}")` }}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      />
      <div className="hero-overlay" />
    </div>
  );
}
