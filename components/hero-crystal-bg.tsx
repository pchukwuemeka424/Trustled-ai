/**
 * Decorative animated crystal field for the home hero background.
 */
export function HeroCrystalBg() {
  return (
    <div className="hero-crystal" aria-hidden="true">
      <div className="hero-crystal-glow hero-crystal-glow--a" />
      <div className="hero-crystal-glow hero-crystal-glow--b" />
      <div className="hero-crystal-glow hero-crystal-glow--c" />
      <svg
        className="hero-crystal-svg"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hc-facet-a" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#7eb8e8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2f6fad" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="hc-facet-b" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffe2d4" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#fc5e28" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ca4b20" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="hc-facet-c" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d9e8f7" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#4a7fb5" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0a1733" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id="hc-facet-d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff0e8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fd7a4d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fc5e28" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="hc-facet-e" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eaf4fc" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#5a9fd4" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#1a4f7a" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="hc-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="hero-crystal-cluster hero-crystal-cluster--1">
          <polygon
            className="hero-crystal-facet"
            fill="url(#hc-facet-a)"
            points="1080,120 1185,210 1128,340 1010,280 1005,175"
          />
          <polygon
            className="hero-crystal-facet hero-crystal-facet--lit"
            fill="url(#hc-facet-b)"
            points="1080,120 1185,210 1120,165"
          />
          <polygon
            className="hero-crystal-facet"
            fill="url(#hc-facet-c)"
            points="1185,210 1128,340 1205,275"
          />
          <polyline
            className="hero-crystal-edge"
            fill="none"
            stroke="url(#hc-edge)"
            strokeWidth="1.5"
            points="1080,120 1185,210 1128,340 1010,280 1005,175 1080,120"
          />
        </g>

        <g className="hero-crystal-cluster hero-crystal-cluster--2">
          <polygon
            className="hero-crystal-facet"
            fill="url(#hc-facet-d)"
            points="1240,380 1335,455 1288,560 1188,510 1195,415"
          />
          <polygon
            className="hero-crystal-facet hero-crystal-facet--lit"
            fill="url(#hc-facet-b)"
            points="1240,380 1335,455 1275,420"
          />
          <polyline
            className="hero-crystal-edge"
            fill="none"
            stroke="url(#hc-edge)"
            strokeWidth="1.35"
            points="1240,380 1335,455 1288,560 1188,510 1195,415 1240,380"
          />
        </g>

        <g className="hero-crystal-cluster hero-crystal-cluster--3">
          <polygon
            className="hero-crystal-facet"
            fill="url(#hc-facet-e)"
            points="920,480 990,545 945,640 860,590 870,505"
          />
          <polygon
            className="hero-crystal-facet hero-crystal-facet--lit"
            fill="url(#hc-facet-a)"
            points="920,480 990,545 945,510"
          />
          <polyline
            className="hero-crystal-edge"
            fill="none"
            stroke="url(#hc-edge)"
            strokeWidth="1.2"
            points="920,480 990,545 945,640 860,590 870,505 920,480"
          />
        </g>

        <g className="hero-crystal-cluster hero-crystal-cluster--4">
          <polygon
            className="hero-crystal-facet"
            fill="url(#hc-facet-b)"
            points="180,520 255,585 210,680 120,630 130,545"
          />
          <polygon
            className="hero-crystal-facet hero-crystal-facet--lit"
            fill="url(#hc-facet-d)"
            points="180,520 255,585 210,555"
          />
          <polyline
            className="hero-crystal-edge"
            fill="none"
            stroke="url(#hc-edge)"
            strokeWidth="1.2"
            points="180,520 255,585 210,680 120,630 130,545 180,520"
          />
        </g>

        <g className="hero-crystal-cluster hero-crystal-cluster--5">
          <polygon
            className="hero-crystal-facet"
            fill="url(#hc-facet-e)"
            points="70,180 145,240 105,330 30,275 40,200"
          />
          <polygon
            className="hero-crystal-facet hero-crystal-facet--lit"
            fill="url(#hc-facet-a)"
            points="70,180 145,240 100,210"
          />
          <polyline
            className="hero-crystal-edge"
            fill="none"
            stroke="url(#hc-edge)"
            strokeWidth="1.2"
            points="70,180 145,240 105,330 30,275 40,200 70,180"
          />
        </g>

        <g className="hero-crystal-shards">
          <polygon className="hero-crystal-shard" fill="#fc5e28" fillOpacity="0.75" points="1360,160 1382,188 1355,205 1340,175" />
          <polygon className="hero-crystal-shard" fill="#2f6fad" fillOpacity="0.65" points="1040,60 1060,82 1045,100 1028,78" />
          <polygon className="hero-crystal-shard" fill="#fd7a4d" fillOpacity="0.7" points="300,120 318,140 302,158 288,136" />
          <polygon className="hero-crystal-shard" fill="#5a9fd4" fillOpacity="0.7" points="860,180 878,198 862,216 848,196" />
          <polygon className="hero-crystal-shard" fill="#fc5e28" fillOpacity="0.72" points="1280,640 1298,660 1282,678 1266,656" />
          <polygon className="hero-crystal-shard" fill="#1a4f7a" fillOpacity="0.55" points="420,640 438,658 422,676 408,656" />
          <polygon className="hero-crystal-shard" fill="#ca4b20" fillOpacity="0.6" points="700,90 716,106 702,122 688,104" />
        </g>
      </svg>
      <div className="hero-crystal-sheen" />
    </div>
  );
}
