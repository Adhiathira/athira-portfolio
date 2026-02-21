export const metadata = {
  name: 'Motion System',
  description: 'Extracts animations, transitions, video elements, and motion patterns',
  version: '1.0.0',
  tag: 'motion-system'
};

// ============================================================================
// HELPER UTILITIES
// ============================================================================

/**
 * Check if element is visible in viewport
 */
function isVisible(el) {
  const cs = getComputedStyle(el);
  return cs.display !== 'none' &&
         cs.visibility !== 'hidden' &&
         parseFloat(cs.opacity) > 0 &&
         el.offsetWidth > 0 &&
         el.offsetHeight > 0;
}

/**
 * Extract relevant CSS properties for animation/transition analysis
 */
function extractAnimationStyles(cs) {
  return {
    animation: cs.animation !== 'none' ? cs.animation : null,
    animationName: cs.animationName !== 'none' ? cs.animationName : null,
    animationDuration: cs.animationDuration !== '0s' ? cs.animationDuration : null,
    animationTimingFunction: cs.animationTimingFunction !== 'ease' ? cs.animationTimingFunction : null,
    animationDelay: cs.animationDelay !== '0s' ? cs.animationDelay : null,
    animationIterationCount: cs.animationIterationCount !== '1' ? cs.animationIterationCount : null,
    transition: cs.transition !== 'all 0s ease 0s' ? cs.transition : null,
    transitionProperty: cs.transitionProperty !== 'all' ? cs.transitionProperty : null,
    transitionDuration: cs.transitionDuration !== '0s' ? cs.transitionDuration : null,
    transitionTimingFunction: cs.transitionTimingFunction !== 'ease' ? cs.transitionTimingFunction : null,
    transitionDelay: cs.transitionDelay !== '0s' ? cs.transitionDelay : null,
    transform: cs.transform !== 'none' ? cs.transform : null,
    willChange: cs.willChange !== 'auto' ? cs.willChange : null
  };
}

// ============================================================================
// PASS 1: VIDEO & MEDIA DETECTION
// ============================================================================

async function detectVideoElements(page) {
  return await page.evaluate(() => {
    // Helper function (redefined in browser context)
    function isVisible(el) {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' &&
             cs.visibility !== 'hidden' &&
             parseFloat(cs.opacity) > 0 &&
             el.offsetWidth > 0 &&
             el.offsetHeight > 0;
    }

    // 1. Query all video elements
    const videos = [...document.querySelectorAll('video')];

    // Initialize result object
    const result = {
      count: videos.length,
      hasHeroVideo: false,
      items: [],
      animatedGifs: 0,
      libraries: []
    };

    // 2. Extract data for each video
    videos.forEach(video => {
      // Get bounding rect for position data
      const rect = video.getBoundingClientRect();

      // Extract source URLs from both src attribute and source children
      const sources = [];

      if (video.src) {
        sources.push(video.src);
      }

      const sourceElements = video.querySelectorAll('source');
      sourceElements.forEach(source => {
        if (source.src) {
          sources.push(source.src);
        }
      });

      // Classify as hero if width >= 80% viewport AND top < 100vh
      const isHero = rect.width >= (window.innerWidth * 0.8) &&
                     rect.top < window.innerHeight;

      if (isHero) {
        result.hasHeroVideo = true;
      }

      // Build video data object
      const videoData = {
        sources,
        attributes: {
          autoplay: video.hasAttribute('autoplay'),
          loop: video.hasAttribute('loop'),
          muted: video.hasAttribute('muted'),
          controls: video.hasAttribute('controls'),
          playsinline: video.hasAttribute('playsinline')
        },
        position: {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          left: rect.left
        },
        isHero,
        visible: isVisible(video)
      };

      result.items.push(videoData);
    });

    // 3. Detect animated GIFs (robust detection with query param handling)
    const allImages = document.querySelectorAll('img');
    const gifs = [...allImages].filter(img => {
      const src = img.src || img.getAttribute('src') || '';
      const urlWithoutParams = src.split('?')[0].toLowerCase();
      return urlWithoutParams.endsWith('.gif');
    });
    result.animatedGifs = gifs.length;

    // 4. Detect animation libraries
    const libraries = [];

    // Lottie - check window object or DOM attributes
    if (window.lottie || document.querySelector('[data-lottie]')) {
      libraries.push('lottie');
    }

    // GSAP - check for gsap or legacy TweenMax
    if (window.gsap || window.TweenMax) {
      libraries.push('gsap');
    }

    // Anime.js
    if (window.anime) {
      libraries.push('anime.js');
    }

    // AOS (Animate On Scroll) - DOM attribute check
    if (document.querySelector('[data-aos]')) {
      libraries.push('aos');
    }

    // Generic scroll animation markers
    if (document.querySelector('[data-scroll]')) {
      libraries.push('scroll-animation');
    }

    result.libraries = libraries;

    return result;
  });
}

// ============================================================================
// PASS 2: CSS ANIMATION & TRANSITION EXTRACTION
// ============================================================================

async function extractCSSAnimations(page) {
  return await page.evaluate(() => {
    // Helper function to check if element is visible
    function isVisible(el) {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' &&
             cs.visibility !== 'hidden' &&
             parseFloat(cs.opacity) > 0 &&
             el.offsetWidth > 0 &&
             el.offsetHeight > 0;
    }

    // Generate a simple selector for an element
    function getSimpleSelector(el) {
      if (el.id) return `#${el.id}`;
      if (el.className && typeof el.className === 'string') {
        const classes = el.className.split(' ').filter(c => c);
        if (classes.length > 0) return `.${classes[0]}`;
      }
      return el.tagName.toLowerCase();
    }

    const keyframes = [];
    const animatedElements = [];
    const transitionElements = [];
    const durations = new Set();
    const easings = new Set();

    // 1. Extract @keyframes rules from all stylesheets
    try {
      for (const sheet of document.styleSheets) {
        try {
          const rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;

          for (const rule of rules) {
            // CSSKeyframesRule has type 7
            if (rule.type === 7) {
              const steps = [];
              for (const keyframeRule of rule.cssRules) {
                const properties = {};
                for (let i = 0; i < keyframeRule.style.length; i++) {
                  const prop = keyframeRule.style[i];
                  properties[prop] = keyframeRule.style.getPropertyValue(prop);
                }
                steps.push({
                  offset: keyframeRule.keyText,
                  properties
                });
              }
              keyframes.push({
                name: rule.name,
                steps
              });
            }
          }
        } catch (e) {
          // Cross-origin stylesheet - skip it
          continue;
        }
      }
    } catch (e) {
      // Error accessing styleSheets - continue with empty keyframes
    }

    // 2 & 3. Find elements with animations and transitions
    const elements = document.querySelectorAll('*');
    let animatedCount = 0;
    let transitionCount = 0;
    const MAX_ELEMENTS = 20;

    for (const el of elements) {
      if (!isVisible(el)) continue;

      const cs = getComputedStyle(el);

      // 2. Check for animations
      if (cs.animation !== 'none' && cs.animationName !== 'none') {
        if (animatedCount < MAX_ELEMENTS) {
          animatedElements.push({
            selector: getSimpleSelector(el),
            animation: {
              name: cs.animationName,
              duration: cs.animationDuration,
              timingFunction: cs.animationTimingFunction,
              iterationCount: cs.animationIterationCount
            }
          });
          animatedCount++;
        }

        // 4. Collect timing tokens from animations
        if (cs.animationDuration && cs.animationDuration !== '0s') {
          durations.add(cs.animationDuration);
        }
        if (cs.animationTimingFunction) {
          easings.add(cs.animationTimingFunction);
        }
      }

      // 3. Check for transitions
      if (cs.transitionDuration !== '0s') {
        if (transitionCount < MAX_ELEMENTS) {
          transitionElements.push({
            selector: getSimpleSelector(el),
            transition: {
              property: cs.transitionProperty,
              duration: cs.transitionDuration,
              timingFunction: cs.transitionTimingFunction
            }
          });
          transitionCount++;
        }

        // 4. Collect timing tokens from transitions
        if (cs.transitionDuration && cs.transitionDuration !== '0s') {
          durations.add(cs.transitionDuration);
        }
        if (cs.transitionTimingFunction) {
          easings.add(cs.transitionTimingFunction);
        }
      }

      // Stop early if we've collected enough of both types
      if (animatedCount >= MAX_ELEMENTS && transitionCount >= MAX_ELEMENTS) {
        break;
      }
    }

    // 5. Return structured data
    return {
      keyframes,
      animatedElements,
      transitionElements,
      timingTokens: {
        durations: Array.from(durations),
        easings: Array.from(easings)
      }
    };
  });
}

// ============================================================================
// PASS 3: SCROLL ANIMATION DETECTION
// ============================================================================

async function detectScrollAnimations(page) {
  // 1. Detect libraries in page.evaluate()
  const libraryDetection = await page.evaluate(() => {
    const detected = [];
    if (window.gsap?.plugins?.ScrollTrigger) detected.push('gsap-scrolltrigger');
    if (window.ScrollMagic) detected.push('scrollmagic');
    if (document.querySelector('[data-aos]')) detected.push('aos');
    if (document.querySelector('[data-scroll]')) detected.push('locomotive-scroll');
    return detected;
  });

  // 2. Find elements with scroll attributes
  const scrollElements = await page.evaluate(() => {
    const elements = [];
    // Find all elements with scroll-related data attributes
    const candidates = document.querySelectorAll('[data-aos], [data-scroll], [data-animate], [data-reveal]');

    candidates.forEach(el => {
      // Extract scroll animation config from attributes
      const attrs = {};
      for (const attr of el.attributes) {
        if (attr.name.startsWith('data-')) {
          attrs[attr.name] = attr.value;
        }
      }

      elements.push({
        selector: el.tagName.toLowerCase(),
        attributes: attrs
      });
    });

    return elements.slice(0, 20); // Limit to 20 for performance
  });

  // 3. Detect parallax elements (elements with transform that changes on scroll)
  //    Note: This is complex to detect without actually scrolling
  //    For now, just check for elements with data-parallax or similar
  const parallaxElements = await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-parallax], [data-speed], .parallax');
    return [...elements].slice(0, 10).map(el => ({
      selector: el.tagName.toLowerCase(),
      speed: el.getAttribute('data-speed') || el.getAttribute('data-parallax') || 'unknown'
    }));
  });

  // 4. Extract common animation patterns from data attributes
  const patterns = await page.evaluate(() => {
    const patternsSet = new Set();
    document.querySelectorAll('[data-aos], [class*="fade"], [class*="slide"], [class*="zoom"]').forEach(el => {
      const aos = el.getAttribute('data-aos');
      if (aos) patternsSet.add(aos);

      [...el.classList].forEach(cls => {
        if (/fade|slide|zoom|reveal|animate/.test(cls)) {
          patternsSet.add(cls);
        }
      });
    });
    return [...patternsSet].slice(0, 15);
  });

  return {
    libraries: libraryDetection,
    elements: scrollElements,
    parallaxElements,
    patterns
  };
}

// ============================================================================
// PASS 4: MICRO-INTERACTION ANALYSIS
// ============================================================================

async function captureMicroInteractions(page) {
  return await page.evaluate(() => {
    // Helper: check visibility
    function isVisible(el) {
      const cs = getComputedStyle(el);
      return cs.display !== 'none' &&
             cs.visibility !== 'hidden' &&
             parseFloat(cs.opacity) > 0 &&
             el.offsetWidth > 0 &&
             el.offsetHeight > 0;
    }

    // 1. Analyze button transitions
    const buttons = [...document.querySelectorAll('button, [role="button"], [class*="btn"]')]
      .filter(isVisible)
      .slice(0, 10);

    const buttonTransitions = buttons.map(btn => {
      const cs = getComputedStyle(btn);
      return {
        selector: btn.tagName.toLowerCase(),
        transition: cs.transition !== 'all 0s ease 0s' ? cs.transition : null,
        transitionDuration: cs.transitionDuration !== '0s' ? cs.transitionDuration : null
      };
    }).filter(b => b.transition || b.transitionDuration);

    // 2. Find loading states (spinners, skeletons)
    const loadingElements = [...document.querySelectorAll(
      '.spinner, .loading, [aria-busy="true"], .skeleton, .placeholder, [class*="load"]'
    )].filter(isVisible).slice(0, 5);

    const loadingStates = loadingElements.map(el => {
      const cs = getComputedStyle(el);
      // Normalize className for SVG elements (SVGAnimatedString) vs HTML elements (string)
      const classText = typeof el.className === 'string' ? el.className : (el.className?.baseVal || '');
      return {
        type: classText.includes('skeleton') ? 'skeleton' : 'spinner',
        animation: cs.animation !== 'none' ? cs.animation : null
      };
    });

    // 3. Analyze icon animations
    const icons = [...document.querySelectorAll('svg, .icon, [class*="icon"]')]
      .filter(isVisible)
      .slice(0, 10);

    const iconAnimations = icons.map(icon => {
      const cs = getComputedStyle(icon);
      if (cs.animation !== 'none' || cs.transition !== 'all 0s ease 0s') {
        return {
          selector: icon.tagName.toLowerCase(),
          animation: cs.animation !== 'none' ? cs.animationName : null,
          transition: cs.transition !== 'all 0s ease 0s' ? cs.transition : null
        };
      }
      return null;
    }).filter(Boolean);

    // 4. Detect custom cursor
    const hasCustomCursor = !!document.querySelector('[style*="cursor: url"], .custom-cursor');

    // 5. Input focus animations
    const inputs = [...document.querySelectorAll('input, textarea')]
      .filter(isVisible)
      .slice(0, 5);

    const inputFocusAnimations = inputs.map(input => {
      const cs = getComputedStyle(input);
      return {
        selector: input.tagName.toLowerCase(),
        transition: cs.transition !== 'all 0s ease 0s' ? cs.transition : null
      };
    }).filter(i => i.transition);

    return {
      buttonTransitions,
      loadingStates,
      iconAnimations,
      customCursor: hasCustomCursor,
      inputFocusAnimations,
      hasSkeletonScreens: loadingStates.some(s => s.type === 'skeleton')
    };
  });
}

// ============================================================================
// PASS 5: PERFORMANCE OBSERVATIONS
// ============================================================================

function analyzePerformance(videos, cssAnimations, scrollAnimations, microInteractions) {
  // 1. Count total animated elements across all phases
  const totalAnimatedElements =
    cssAnimations.animatedElements.length +
    cssAnimations.transitionElements.length +
    scrollAnimations.elements.length +
    microInteractions.buttonTransitions.length +
    microInteractions.iconAnimations.length +
    microInteractions.inputFocusAnimations.length;

  // 2. Analyze video load
  let videoLoad = 'none';
  if (videos.count === 0) {
    videoLoad = 'none';
  } else if (videos.count === 1 && !videos.hasHeroVideo) {
    videoLoad = 'light';
  } else if (videos.count <= 2 || (videos.count === 1 && videos.hasHeroVideo)) {
    videoLoad = 'moderate';
  } else {
    videoLoad = 'heavy';
  }

  // Flag if hero video with autoplay (heavy load)
  const hasAutoplays = videos.items.some(v => v.attributes.autoplay);
  if (videos.hasHeroVideo && hasAutoplays) {
    videoLoad = 'heavy';
  }

  // 3. Count complex animations (3D transforms, filters)
  const complexAnimations = cssAnimations.keyframes.filter(kf => {
    return kf.steps.some(step => {
      const props = Object.keys(step.properties);
      return props.some(p =>
        p.includes('transform') ||
        p.includes('filter') ||
        p.includes('backdrop-filter') ||
        p.includes('perspective')
      );
    });
  }).length;

  // 4. Check for reduced motion support
  // We don't currently detect @media (prefers-reduced-motion) support
  // Marking as null to indicate "unknown" rather than definitively false
  const reducedMotionSupport = null; // Would need stylesheet parsing to detect properly

  // 5. Check for hardware acceleration indicators
  const usesHardwareAcceleration = cssAnimations.animatedElements.some(el => {
    const animName = el.animation.name;
    const kf = cssAnimations.keyframes.find(k => k.name === animName);
    if (!kf) return false;

    return kf.steps.some(step => {
      const props = Object.keys(step.properties);
      // Check for GPU-accelerated properties (transform, opacity)
      const hasAcceleratedProps = props.some(p => p === 'transform' || p === 'opacity');

      // Also check if transform values use 3D transforms (translate3d, translateZ, etc.)
      const hasHardwareTransforms = props.some(p => {
        if (p === 'transform') {
          const value = step.properties[p];
          return typeof value === 'string' && (
            value.includes('translate3d') ||
            value.includes('translateZ')
          );
        }
        return false;
      });

      return hasAcceleratedProps || hasHardwareTransforms;
    });
  });

  // 6. Generate recommendations
  const recommendations = [];

  if (videoLoad === 'heavy') {
    recommendations.push('Consider lazy-loading videos or reducing video count for better performance');
  }

  if (totalAnimatedElements > 20) {
    recommendations.push('High number of animated elements detected - consider reducing for better performance');
  }

  if (complexAnimations > 5) {
    recommendations.push('Multiple complex animations detected - monitor performance on lower-end devices');
  }

  if (!usesHardwareAcceleration && totalAnimatedElements > 10) {
    recommendations.push('Consider using transform and opacity for better hardware acceleration');
  }

  if (videos.animatedGifs > 3) {
    recommendations.push('Consider converting animated GIFs to video format for better performance');
  }

  // 7. Return structured performance data
  return {
    totalAnimatedElements,
    simultaneousAnimations: cssAnimations.animatedElements.length, // Elements animating on load
    videoLoad,
    complexAnimations,
    reducedMotionSupport,
    usesHardwareAcceleration,
    recommendations,
    summary: {
      videos: videos.count,
      animatedGifs: videos.animatedGifs,
      keyframes: cssAnimations.keyframes.length,
      scrollLibraries: scrollAnimations.libraries.length,
      hasLoadingStates: microInteractions.loadingStates.length > 0,
      hasSkeletonScreens: microInteractions.hasSkeletonScreens
    }
  };
}

// ============================================================================
// MAIN EXTRACT FUNCTION
// ============================================================================

export async function extract(page) {
  // Phase 1: Video & Media Detection
  const videos = await detectVideoElements(page);

  // Phase 2: CSS Animations
  const cssAnimations = await extractCSSAnimations(page);

  // Phase 3: Scroll Animations
  const scrollAnimations = await detectScrollAnimations(page);

  // Phase 4: Micro-interactions
  const microInteractions = await captureMicroInteractions(page);

  // Phase 5: Performance Analysis
  const performance = analyzePerformance(videos, cssAnimations, scrollAnimations, microInteractions);

  return {
    videos,
    cssAnimations,
    scrollAnimations,
    microInteractions,
    performance
  };
}
