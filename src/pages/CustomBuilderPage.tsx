import React from 'react';
import { SEO } from '../components/SEO';
import { CustomPackageBuilder } from '../components/CustomPackageBuilder';
import { Package } from '../types';
import { useNavigate } from 'react-router-dom';

interface CustomBuilderPageProps {
  onProceedToBooking: (customPkg: Package) => void;
}

export const CustomBuilderPage: React.FC<CustomBuilderPageProps> = ({ onProceedToBooking }) => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 sm:pt-32 lg:pt-36">
      <SEO
        title="AI Custom Package Builder | Tour with Journeyvers"
        description="Build a tailored day-by-day luxury or budget tour itinerary for Hyderabad, Delhi, and Mumbai using Journeyvers AI. Tour with Journeyvers for custom royal travel."
        keywords="Journeyvers, Travel, Tour with Journeyvers, Custom Itinerary Generator, AI Travel Planner"
      />

      <CustomPackageBuilder
        onClose={() => navigate('/')}
        onProceedToBooking={(customPkg) => {
          onProceedToBooking(customPkg);
        }}
      />
    </div>
  );
};
