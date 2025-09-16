// Lottie Animation Library for Global Animations
export interface LottieAnimation {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: any[];
  layers: any[];
}

// Loading Spinner Animation
export const loadingSpinner: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 60,
  w: 50,
  h: 50,
  nm: "loading-spinner",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "spinner",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 60, s: [360] }] },
      p: { a: 0, k: [25, 25, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            d: 1,
            s: { a: 0, k: [40, 40] },
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 0 },
            nm: "Rectangle Path 1"
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.149, 0.388, 0.922, 1] },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: "Fill 1"
          }
        ],
        nm: "Rectangle 1"
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    bm: 0
  }]
};

// Page Transition Animation
export const pageTransition: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 45,
  w: 100,
  h: 100,
  nm: "page-transition",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "transition",
    sr: 1,
    ks: {
      o: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 15, s: [100] }, { t: 30, s: [100] }, { t: 45, s: [0] }] },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [50, 50, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 15, s: [100, 100, 100] }, { t: 30, s: [100, 100, 100] }, { t: 45, s: [0, 0, 100] }] }
    },
    shapes: [
      {
        ty: "el",
        p: { a: 0, k: [0, 0] },
        s: { a: 0, k: [80, 80] },
        nm: "circle"
      },
      {
        ty: "fl",
        c: { a: 0, k: [0.149, 0.388, 0.922, 1] },
        o: { a: 0, k: 100 },
        r: 1,
        bm: 0,
        nm: "fill"
      }
    ],
    ip: 0,
    op: 45,
    st: 0,
    bm: 0
  }]
};

// Button Click Animation
export const buttonClick: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 20,
  w: 40,
  h: 40,
  nm: "button-click",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "click-effect",
    sr: 1,
    ks: {
      o: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [100] }, { t: 10, s: [0] }] },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [20, 20, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [50, 50, 100] }, { t: 10, s: [100, 100, 100] }] }
    },
    shapes: [
      {
        ty: "el",
        p: { a: 0, k: [0, 0] },
        s: { a: 0, k: [30, 30] },
        nm: "circle"
      },
      {
        ty: "fl",
        c: { a: 0, k: [0.149, 0.388, 0.922, 1] },
        o: { a: 0, k: 100 },
        r: 1,
        bm: 0,
        nm: "fill"
      }
    ],
    ip: 0,
    op: 20,
    st: 0,
    bm: 0
  }]
};

// Empty State Animation
export const emptyState: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 90,
  w: 120,
  h: 120,
  nm: "empty-state",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "empty-box",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [60, 60, 0] }, { t: 30, s: [60, 40, 0] }, { t: 60, s: [60, 60, 0] }] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            d: 1,
            s: { a: 0, k: [80, 80] },
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 0 },
            nm: "Rectangle Path 1"
          },
          {
            ty: "st",
            c: { a: 0, k: [0.149, 0.388, 0.922, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 3 },
            lc: 1,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1"
          }
        ],
        nm: "Rectangle 1"
      }
    ],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0
  }]
};

// Success Animation
export const successAnimation: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 60,
  w: 60,
  h: 60,
  nm: "success",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "checkmark",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [30, 30, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            d: 1,
            s: { a: 0, k: [50, 50] },
            p: { a: 0, k: [0, 0] },
            nm: "Ellipse Path 1"
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.2, 0.7, 0.2, 1] },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: "Fill 1"
          },
          {
            ty: "sh",
            ks: {
              a: 0,
              k: {
                i: { a: 0, k: [0, 0, 0, 0, 0, 0] },
                o: { a: 0, k: [0, 0, 0, 0, 0, 0] },
                v: { a: 0, k: [-8, -2, 0, 8, 8, -8] },
                c: false
              }
            },
            nm: "Path 1"
          },
          {
            ty: "st",
            c: { a: 0, k: [1, 1, 1, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 3 },
            lc: 2,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1"
          }
        ],
        nm: "Group 1"
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    bm: 0
  }]
};

// Error Animation
export const errorAnimation: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 60,
  w: 60,
  h: 60,
  nm: "error",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "error-cross",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [30, 30, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "el",
            d: 1,
            s: { a: 0, k: [50, 50] },
            p: { a: 0, k: [0, 0] },
            nm: "Ellipse Path 1"
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.9, 0.2, 0.2, 1] },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: "Fill 1"
          },
          {
            ty: "sh",
            ks: {
              a: 0,
              k: {
                i: { a: 0, k: [0, 0, 0, 0, 0, 0, 0, 0] },
                o: { a: 0, k: [0, 0, 0, 0, 0, 0, 0, 0] },
                v: { a: 0, k: [-8, -8, 8, 8, 8, -8, -8, -8] },
                c: false
              }
            },
            nm: "Path 1"
          },
          {
            ty: "st",
            c: { a: 0, k: [1, 1, 1, 1] },
            o: { a: 0, k: 100 },
            w: { a: 0, k: 3 },
            lc: 2,
            lj: 1,
            ml: 4,
            bm: 0,
            nm: "Stroke 1"
          }
        ],
        nm: "Group 1"
      }
    ],
    ip: 0,
    op: 60,
    st: 0,
    bm: 0
  }]
};

// Typing Indicator Animation
export const typingIndicator: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 30,
  w: 40,
  h: 20,
  nm: "typing-indicator",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "dots",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [20, 10, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [
      {
        ty: "el",
        p: { a: 0, k: [-8, 0] },
        s: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0, 0] }, { t: 10, s: [6, 6] }, { t: 20, s: [0, 0] }] },
        nm: "dot1"
      },
      {
        ty: "fl",
        c: { a: 0, k: [0.5, 0.5, 0.5, 1] },
        o: { a: 0, k: 100 },
        r: 1,
        bm: 0,
        nm: "fill1"
      },
      {
        ty: "el",
        p: { a: 0, k: [0, 0] },
        s: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 5, s: [0, 0] }, { t: 15, s: [6, 6] }, { t: 25, s: [0, 0] }] },
        nm: "dot2"
      },
      {
        ty: "fl",
        c: { a: 0, k: [0.5, 0.5, 0.5, 1] },
        o: { a: 0, k: 100 },
        r: 1,
        bm: 0,
        nm: "fill2"
      },
      {
        ty: "el",
        p: { a: 0, k: [8, 0] },
        s: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 10, s: [0, 0] }, { t: 20, s: [6, 6] }, { t: 30, s: [0, 0] }] },
        nm: "dot3"
      },
      {
        ty: "fl",
        c: { a: 0, k: [0.5, 0.5, 0.5, 1] },
        o: { a: 0, k: 100 },
        r: 1,
        bm: 0,
        nm: "fill3"
      }
    ],
    ip: 0,
    op: 30,
    st: 0,
    bm: 0
  }]
};

// New Message Animation
export const newMessage: LottieAnimation = {
  v: "5.7.6",
  fr: 30,
  ip: 0,
  op: 40,
  w: 30,
  h: 30,
  nm: "new-message",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "message-bubble",
    sr: 1,
    ks: {
      o: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] }, { t: 20, s: [100] }] },
      r: { a: 0, k: 0 },
      p: { a: 1, k: [{ i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [15, 15, 0] }, { t: 20, s: [15, 5, 0] }] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    shapes: [
      {
        ty: "gr",
        it: [
          {
            ty: "rc",
            d: 1,
            s: { a: 0, k: [20, 15] },
            p: { a: 0, k: [0, 0] },
            r: { a: 0, k: 5 },
            nm: "Rectangle Path 1"
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.149, 0.388, 0.922, 1] },
            o: { a: 0, k: 100 },
            r: 1,
            bm: 0,
            nm: "Fill 1"
          }
        ],
        nm: "Rectangle 1"
      }
    ],
    ip: 0,
    op: 40,
    st: 0,
    bm: 0
  }]
};

// Export animation collection
export const animations = {
  loading: loadingSpinner,
  transition: pageTransition,
  buttonClick: buttonClick,
  emptyState: emptyState,
  success: successAnimation,
  error: errorAnimation,
  typing: typingIndicator,
  newMessage: newMessage
};

