export function WaveDivider({ flip = false, color = '#384959' }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ marginBottom: -2, marginTop: -2 }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-16 md:h-24"
      >
        <path
          d="M0,60 C150,100 350,0 500,50 C650,100 750,20 900,60 C1050,100 1150,30 1200,60 L1200,120 L0,120Z"
          fill={color}
        />
        <path
          d="M0,80 C200,40 400,90 600,70 C800,50 1000,100 1200,70 L1200,120 L0,120Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
