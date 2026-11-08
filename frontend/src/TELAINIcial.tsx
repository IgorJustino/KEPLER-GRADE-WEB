import React, { useState } from 'react';
import { TELAINIcialBureau } from './TELAINIcialBureau';

interface TELAINIcialProps {
  onGoToBookStore: () => void;
  onEnterSimulator: (screenId?: number) => void;
  onOpenFlowchart?: () => void;
}

type LandingDesign = 'gazette' | 'bureau';

const LANDING_DESIGN_KEY = 'kepler-landing-design';

export const TELAINIcial: React.FC<TELAINIcialProps> = (props) => {
  const [design, setDesign] = useState<LandingDesign>(() => {
    if (typeof window === 'undefined') return 'gazette';

    const requestedDesign = new URLSearchParams(window.location.search).get('design');
    if (requestedDesign === 'bureau' || requestedDesign === 'gazette') return requestedDesign;

    return window.localStorage.getItem(LANDING_DESIGN_KEY) === 'bureau' ? 'bureau' : 'gazette';
  });

  const toggleDesign = () => {
    setDesign((current) => {
      const next = current === 'gazette' ? 'bureau' : 'gazette';
      window.localStorage.setItem(LANDING_DESIGN_KEY, next);
      return next;
    });
  };

  return (
    <TELAINIcialBureau
      {...props}
      design={design}
      onToggleDesign={toggleDesign}
    />
  );
};
