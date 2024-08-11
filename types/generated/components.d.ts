import type { Schema, Attribute } from '@strapi/strapi';

export interface AdditionalInformationAdditionalInformation
  extends Schema.Component {
  collectionName: 'components_additional_information_additional_informations';
  info: {
    displayName: 'additional_information';
  };
  attributes: {
    deposit: Attribute.String;
    lastRemodelYear: Attribute.String;
    equipment: Attribute.String;
    poolSize: Attribute.String;
    amenties: Attribute.String;
    additionalRooms: Attribute.String;
  };
}

export interface EnergyEfficiencyMetricsEnergyEfficiencyMetrics
  extends Schema.Component {
  collectionName: 'components_energy_efficiency_metrics_energy_efficiency_metrics';
  info: {
    displayName: 'energy_efficiency_metrics';
  };
  attributes: {
    energy_consumption: Attribute.String;
    solar_panel_output: Attribute.String;
    environmental_impact: Attribute.String;
  };
}

export interface FurnitureSugesstionsFurnitureSugesstions
  extends Schema.Component {
  collectionName: 'components_furniture_sugesstions_furniture_sugesstions';
  info: {
    displayName: 'furnitureSugesstions';
  };
  attributes: {
    videoUrl: Attribute.String;
    description: Attribute.Text;
  };
}

export interface InteractiveFloorPlansInteractiveFloorPlans
  extends Schema.Component {
  collectionName: 'components_interactive_floor_plans_interactive_floor_plans';
  info: {
    displayName: 'interactiveFloorPlans';
  };
  attributes: {
    videoUrl: Attribute.String;
    description: Attribute.Text;
  };
}

export interface OverviewOverview extends Schema.Component {
  collectionName: 'components_overview_overviews';
  info: {
    displayName: 'overview';
    description: '';
  };
  attributes: {
    type: Attribute.String;
    bedrooms: Attribute.Integer;
    bathrooms: Attribute.Integer;
    garages: Attribute.String;
    size: Attribute.BigInteger;
    landSize: Attribute.BigInteger;
    yearBuild: Attribute.Integer;
    buildingId: Attribute.String;
    homeStatus: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'additional-information.additional-information': AdditionalInformationAdditionalInformation;
      'energy-efficiency-metrics.energy-efficiency-metrics': EnergyEfficiencyMetricsEnergyEfficiencyMetrics;
      'furniture-sugesstions.furniture-sugesstions': FurnitureSugesstionsFurnitureSugesstions;
      'interactive-floor-plans.interactive-floor-plans': InteractiveFloorPlansInteractiveFloorPlans;
      'overview.overview': OverviewOverview;
    }
  }
}
