import styles from './FeatureDeepDive.module.css';

// The site's standard proof marker: a teal circled checkmark, identical to the
// one used in the verticals VerticalBlock and the home feature lists.
function CheckIcon() {
  return (
    <svg className={styles.check} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" className={styles.checkRing} />
      <path d="M6 10.4l2.6 2.6L14 7.6" className={styles.checkTick} />
    </svg>
  );
}

export interface DeepDiveMedia {
  kind: 'image' | 'video';
  src: string;
  alt: string;
}

export interface FeatureDeepDiveProps {
  /** DOM id for the <section>. */
  id: string;
  /** Optional word eyebrow. Omitted for the numbered section labels we no longer show. */
  eyebrow?: string;
  /** Verbatim heading. */
  heading: string;
  /** Verbatim body paragraph. */
  body: string;
  /** Verbatim feature list items. */
  items: string[];
  media: DeepDiveMedia;
  /** false = text-left / media-right (default). true = media-left / text-right. */
  flip?: boolean;
  /** Alternate surface background for rhythm between adjacent sections. */
  surface?: boolean;
  /** Media reveal treatment; drives the GSAP hook via data-attribute. */
  mediaReveal: 'clip-right' | 'clip-left' | 'scale' | 'parallax';
}

/**
 * Reveal the light-UI placeholder if the generated asset is not present yet.
 * The real image/video drops in automatically once the file exists at src.
 */
function showPlaceholder(el: HTMLImageElement | HTMLVideoElement) {
  el.classList.add(styles.mediaHidden);
  const ph = el.nextElementSibling as HTMLElement | null;
  if (ph) ph.classList.add(styles.placeholderShown);
}

export default function FeatureDeepDive({
  id,
  eyebrow,
  heading,
  body,
  items,
  media,
  flip = false,
  surface = false,
  mediaReveal,
}: FeatureDeepDiveProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${surface ? styles.surface : ''} ${flip ? styles.flip : ''}`}
    >
      <div id={`${id}-inner`} className={styles.inner}>
        <div id={`${id}-copy`} className={styles.copy} data-reveal>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.body}>{body}</p>

          <ul id={`${id}-features`} className={styles.features} data-stagger-group>
            {items.map((item) => (
              <li key={item} className={styles.feature} data-stagger-item>
                <CheckIcon />
                <span className={styles.featureText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id={`${id}-media`} className={styles.mediaWrap}>
          <div className={styles.mediaFrame} data-media-reveal={mediaReveal}>
            {media.kind === 'image' ? (
              <img
                className={styles.media}
                src={media.src}
                alt={media.alt}
                loading="lazy"
                onError={(e) => showPlaceholder(e.currentTarget)}
              />
            ) : (
              <video
                className={styles.media}
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                onError={(e) => showPlaceholder(e.currentTarget)}
              />
            )}
            <div className={styles.placeholder} aria-hidden="true">
              <span className={styles.placeholderDot} />
              <span className={styles.placeholderPath}>{media.src}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
