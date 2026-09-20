import { ProjectScope, BrandingSettings, ChangeOrder } from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'scopelock_projects_v1',
  ACTIVE_PROJECT: 'scopelock_active_v1',
  SETTINGS: 'scopelock_settings_v1',
  CHANGE_ORDERS: 'scopelock_orders_v1',
};

export const defaultSettings: BrandingSettings = {
  agencyName: 'Apex Digital Studio',
  agencyEmail: 'billing@apexdigital.co',
  currency: 'USD',
  defaultHourlyRate: 125,
  primaryColor: '#0ea5e9',
  paymentNotice: 'All Change Orders require 50% prepayment prior to sprint commencement.',
};

export function getStoredSettings(): BrandingSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveStoredSettings(settings: BrandingSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

export function getStoredProjects(): ProjectScope[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects: ProjectScope[]): void {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
}

export function getStoredChangeOrders(): ChangeOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHANGE_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveChangeOrders(orders: ChangeOrder[]): void {
  localStorage.setItem(STORAGE_KEYS.CHANGE_ORDERS, JSON.stringify(orders));
}
