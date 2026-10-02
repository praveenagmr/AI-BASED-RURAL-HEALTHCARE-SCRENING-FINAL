import { UserProfile, ScreeningResult, MedicineOrder, HouseholdData } from '../types';
import { varur15Households } from '../data/varurVillageData';

const USER_SESSION_KEY = 'varur_health_session';
const REGISTERED_USERS_KEY = 'varur_registered_users';
const SCREENINGS_KEY = 'varur_screening_history';
const MEDICINE_ORDERS_KEY = 'varur_medicine_orders';
const HOUSEHOLDS_KEY = 'varur_households_data';

// Initial preloaded registered users for instant testing/demo in Varur village
const defaultUsers: UserProfile[] = [
  {
    name: 'Mallikarjun Patil',
    mobile: '9448123001',
    age: 54,
    gender: 'male',
    houseNumber: 'VAR-H01',
    languagePreference: 'kannada',
    role: 'villager',
  },
  {
    name: 'Sunita Patil',
    mobile: '9448123002',
    age: 48,
    gender: 'female',
    houseNumber: 'VAR-H01',
    languagePreference: 'kannada',
    role: 'villager',
  },
  {
    name: 'Ningappa Badiger',
    mobile: '9448123003',
    age: 46,
    gender: 'male',
    houseNumber: 'VAR-H03',
    languagePreference: 'kannada',
    role: 'villager',
  },
];

export const storageService = {
  // Session handling
  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(USER_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: UserProfile | null): void {
    if (user) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_SESSION_KEY);
    }
  },

  // User Registration
  registerUser(user: UserProfile, password: string): { success: boolean; message: string } {
    try {
      const usersStr = localStorage.getItem(REGISTERED_USERS_KEY);
      const users: (UserProfile & { password?: string })[] = usersStr ? JSON.parse(usersStr) : [...defaultUsers];

      const exists = users.find(u => u.mobile === user.mobile);
      if (exists) {
        return { success: false, message: 'A user with this mobile number is already registered in Varur village.' };
      }

      users.push({ ...user, password });
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
      return { success: true, message: 'Registration successful! You can now login.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Registration failed' };
    }
  },

  // User Login
  loginUser(identifier: string, password?: string): { success: boolean; user?: UserProfile; message: string } {
    try {
      const usersStr = localStorage.getItem(REGISTERED_USERS_KEY);
      const users: (UserProfile & { password?: string })[] = usersStr ? JSON.parse(usersStr) : [...defaultUsers];

      const cleanId = identifier.trim().toLowerCase();
      const matched = users.find(u => 
        u.mobile === cleanId || 
        (u.email && u.email.toLowerCase() === cleanId) ||
        u.name.toLowerCase().includes(cleanId)
      );

      if (matched) {
        this.setCurrentUser(matched);
        return { success: true, user: matched, message: 'Login successful' };
      }

      // Check default demo credentials if no password strictly enforced in offline mode
      if (cleanId === 'demo' || cleanId === '9448123001') {
        const demoUser = defaultUsers[0];
        this.setCurrentUser(demoUser);
        return { success: true, user: demoUser, message: 'Demo login successful' };
      }

      return { success: false, message: 'Invalid credentials. User not found with this mobile or email.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Login error' };
    }
  },

  logoutUser(): void {
    this.setCurrentUser(null);
  },

  // Screening Records
  getScreenings(houseNumber?: string): ScreeningResult[] {
    try {
      const data = localStorage.getItem(SCREENINGS_KEY);
      const list: ScreeningResult[] = data ? JSON.parse(data) : [];
      if (houseNumber) {
        return list.filter(s => s.houseNumber === houseNumber);
      }
      return list;
    } catch {
      return [];
    }
  },

  saveScreening(result: ScreeningResult): void {
    try {
      const existing = this.getScreenings();
      const updated = [result, ...existing];
      localStorage.setItem(SCREENINGS_KEY, JSON.stringify(updated));

      // Update household record risk status
      this.updateHouseholdRisk(result.houseNumber, result.patientName, result.riskLevel);
    } catch (e) {
      console.error('Failed to save screening result', e);
    }
  },

  // 15 Households Directory
  getHouseholds(): HouseholdData[] {
    try {
      const data = localStorage.getItem(HOUSEHOLDS_KEY);
      return data ? JSON.parse(data) : varur15Households;
    } catch {
      return varur15Households;
    }
  },

  updateHouseholdRisk(houseNumber: string, memberName: string, riskLevel: 'Low' | 'Moderate' | 'High'): void {
    try {
      const houses = this.getHouseholds();
      const targetHouse = houses.find(h => h.houseNumber === houseNumber);
      if (targetHouse) {
        const targetMember = targetHouse.members.find(m => m.name.toLowerCase() === memberName.toLowerCase());
        if (targetMember) {
          targetMember.lastScreeningRisk = riskLevel;
        } else {
          // If member is head of family or not strictly in list
          targetHouse.members[0].lastScreeningRisk = riskLevel;
        }
        localStorage.setItem(HOUSEHOLDS_KEY, JSON.stringify(houses));
      }
    } catch (e) {
      console.error('Failed to update household risk', e);
    }
  },

  // Medicine Orders
  getMedicineOrders(houseNumber?: string): MedicineOrder[] {
    try {
      const data = localStorage.getItem(MEDICINE_ORDERS_KEY);
      const list: MedicineOrder[] = data ? JSON.parse(data) : [];
      if (houseNumber) {
        return list.filter(o => o.houseNumber === houseNumber);
      }
      return list;
    } catch {
      return [];
    }
  },

  placeMedicineOrder(order: Omit<MedicineOrder, 'orderId' | 'status' | 'timestamp' | 'estimatedDeliveryTime'>): MedicineOrder {
    const newOrder: MedicineOrder = {
      ...order,
      orderId: `VAR-DEL-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Confirmed',
      timestamp: new Date().toISOString(),
      estimatedDeliveryTime: '30 - 45 Minutes',
    };

    const existing = this.getMedicineOrders();
    localStorage.setItem(MEDICINE_ORDERS_KEY, JSON.stringify([newOrder, ...existing]));
    return newOrder;
  },
};
