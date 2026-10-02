import { connectToDatabase, disconnectDatabase } from './connection.js';
import { HouseholdModel } from './models/Household.js';
import { MedicalStoreModel } from './models/MedicalStore.js';
import { HospitalModel } from './models/Hospital.js';
import { UserModel } from './models/User.js';

/**
 * Seed Database for Varur Village (Hubballi Taluk, Dharwad District, Karnataka)
 * Exactly 15 Village Households, Local Medicals with Home Delivery, and Nearest Hospitals
 */

export const varur15HouseholdsSeed = [
  {
    houseNumber: 'VAR-H01',
    headOfFamily: 'Mallikarjun Patil',
    streetName: 'Grama Chavadi Road',
    landmark: 'Opposite Gram Panchayat Office',
    contactNumber: '+91 94481 23001',
    rationCardNumber: 'KA-DHW-2024-00101',
    members: [
      { name: 'Mallikarjun Patil', relation: 'Self', age: 54, gender: 'male', hasChronicCondition: 'Hypertension' },
      { name: 'Sunita Patil', relation: 'Wife', age: 48, gender: 'female' },
      { name: 'Basavaraj Patil', relation: 'Son', age: 24, gender: 'male' },
      { name: 'Kavita Patil', relation: 'Daughter-in-law', age: 22, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H02',
    headOfFamily: 'Basavaraj Kulkarni',
    streetName: 'Hanuman Temple Street',
    landmark: 'Behind Old Maruti Temple',
    contactNumber: '+91 94481 23002',
    rationCardNumber: 'KA-DHW-2024-00102',
    members: [
      { name: 'Basavaraj Kulkarni', relation: 'Self', age: 62, gender: 'male', hasChronicCondition: 'Type 2 Diabetes' },
      { name: 'Radhabai Kulkarni', relation: 'Wife', age: 58, gender: 'female', hasChronicCondition: 'Arthritis' },
      { name: 'Vinayak Kulkarni', relation: 'Son', age: 28, gender: 'male' }
    ]
  },
  {
    houseNumber: 'VAR-H03',
    headOfFamily: 'Ningappa Badiger',
    streetName: 'Badiger Galli',
    landmark: 'Near Timber Yard',
    contactNumber: '+91 94481 23003',
    rationCardNumber: 'KA-DHW-2024-00103',
    members: [
      { name: 'Ningappa Badiger', relation: 'Self', age: 46, gender: 'male' },
      { name: 'Renuka Badiger', relation: 'Wife', age: 41, gender: 'female' },
      { name: 'Manjunath Badiger', relation: 'Son', age: 19, gender: 'male' },
      { name: 'Ananya Badiger', relation: 'Daughter', age: 16, gender: 'female' },
      { name: 'Gangamma Badiger', relation: 'Mother', age: 72, gender: 'female', hasChronicCondition: 'Asthma' }
    ]
  },
  {
    houseNumber: 'VAR-H04',
    headOfFamily: 'Yallappa Kurubar',
    streetName: 'North Pasture Lane',
    landmark: 'Near Village Water Tank',
    contactNumber: '+91 94481 23004',
    rationCardNumber: 'KA-DHW-2024-00104',
    members: [
      { name: 'Yallappa Kurubar', relation: 'Self', age: 50, gender: 'male' },
      { name: 'Laxmi Kurubar', relation: 'Wife', age: 45, gender: 'female' },
      { name: 'Somu Kurubar', relation: 'Son', age: 21, gender: 'male' },
      { name: 'Roopa Kurubar', relation: 'Daughter', age: 18, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H05',
    headOfFamily: 'Shankara Kammar',
    streetName: 'Bazaar Cross',
    landmark: 'Near Blacksmith Workshop',
    contactNumber: '+91 94481 23005',
    rationCardNumber: 'KA-DHW-2024-00105',
    members: [
      { name: 'Shankara Kammar', relation: 'Self', age: 39, gender: 'male' },
      { name: 'Sudha Kammar', relation: 'Wife', age: 35, gender: 'female' },
      { name: 'Praveen Kammar', relation: 'Son', age: 12, gender: 'male' }
    ]
  },
  {
    houseNumber: 'VAR-H06',
    headOfFamily: 'Renuka Nayak',
    streetName: 'Navagraha Teertha Approach Road',
    landmark: '500m from Highway Circle',
    contactNumber: '+91 94481 23006',
    rationCardNumber: 'KA-DHW-2024-00106',
    members: [
      { name: 'Renuka Nayak', relation: 'Head (Widow)', age: 52, gender: 'female', hasChronicCondition: 'Hypertension' },
      { name: 'Santosh Nayak', relation: 'Son', age: 26, gender: 'male' },
      { name: 'Deepa Nayak', relation: 'Daughter', age: 23, gender: 'female' },
      { name: 'Chetan Nayak', relation: 'Grandson', age: 4, gender: 'male' }
    ]
  },
  {
    houseNumber: 'VAR-H07',
    headOfFamily: 'Chandrashekhar Pujar',
    streetName: 'Temple Priest Colony',
    landmark: 'Behind Durgadevi Temple',
    contactNumber: '+91 94481 23007',
    rationCardNumber: 'KA-DHW-2024-00107',
    members: [
      { name: 'Chandrashekhar Pujar', relation: 'Self', age: 58, gender: 'male' },
      { name: 'Parvati Pujar', relation: 'Wife', age: 53, gender: 'female' },
      { name: 'Ganesh Pujar', relation: 'Son', age: 29, gender: 'male' },
      { name: 'Shruti Pujar', relation: 'Daughter-in-law', age: 25, gender: 'female' },
      { name: 'Aarav Pujar', relation: 'Grandson', age: 2, gender: 'male' }
    ]
  },
  {
    houseNumber: 'VAR-H08',
    headOfFamily: 'Veeresh Shettar',
    streetName: 'Market Cross Road',
    landmark: 'Above Shettar Provision Store',
    contactNumber: '+91 94481 23008',
    rationCardNumber: 'KA-DHW-2024-00108',
    members: [
      { name: 'Veeresh Shettar', relation: 'Self', age: 47, gender: 'male', hasChronicCondition: 'Acid Peptic Disorder' },
      { name: 'Meenakshi Shettar', relation: 'Wife', age: 42, gender: 'female' },
      { name: 'Akshay Shettar', relation: 'Son', age: 17, gender: 'male' }
    ]
  },
  {
    houseNumber: 'VAR-H09',
    headOfFamily: 'Mahadevappa Hiremath',
    streetName: 'Matha Galli',
    landmark: 'Adjacent to Shiva Temple',
    contactNumber: '+91 94481 23009',
    rationCardNumber: 'KA-DHW-2024-00109',
    members: [
      { name: 'Mahadevappa Hiremath', relation: 'Self', age: 67, gender: 'male', hasChronicCondition: 'Hypertension, Cardiac History' },
      { name: 'Shivalingamma Hiremath', relation: 'Wife', age: 63, gender: 'female' },
      { name: 'Shivanand Hiremath', relation: 'Son', age: 38, gender: 'male' },
      { name: 'Annapurna Hiremath', relation: 'Daughter-in-law', age: 34, gender: 'female' },
      { name: 'Omkar Hiremath', relation: 'Grandson', age: 10, gender: 'male' },
      { name: 'Vidya Hiremath', relation: 'Granddaughter', age: 7, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H10',
    headOfFamily: 'Dyamanna Hadapad',
    streetName: 'Post Office Lane',
    landmark: 'Near Varur Sub-Post Office',
    contactNumber: '+91 94481 23010',
    rationCardNumber: 'KA-DHW-2024-00110',
    members: [
      { name: 'Dyamanna Hadapad', relation: 'Self', age: 43, gender: 'male' },
      { name: 'Yallavva Hadapad', relation: 'Wife', age: 39, gender: 'female' },
      { name: 'Kiran Hadapad', relation: 'Son', age: 15, gender: 'male' },
      { name: 'Sahana Hadapad', relation: 'Daughter', age: 12, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H11',
    headOfFamily: 'Parashuram Madar',
    streetName: 'Dr. B.R. Ambedkar Nagar',
    landmark: 'Near Community Hall',
    contactNumber: '+91 94481 23011',
    rationCardNumber: 'KA-DHW-2024-00111',
    members: [
      { name: 'Parashuram Madar', relation: 'Self', age: 49, gender: 'male' },
      { name: 'Neelavva Madar', relation: 'Wife', age: 44, gender: 'female' },
      { name: 'Ramesh Madar', relation: 'Son', age: 22, gender: 'male' },
      { name: 'Pooja Madar', relation: 'Daughter', age: 19, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H12',
    headOfFamily: 'Annappa Belagavi',
    streetName: 'Government School Road',
    landmark: 'Opposite Varur Primary School',
    contactNumber: '+91 94481 23012',
    rationCardNumber: 'KA-DHW-2024-00112',
    members: [
      { name: 'Annappa Belagavi', relation: 'Self', age: 56, gender: 'male' },
      { name: 'Kasturi Belagavi', relation: 'Wife', age: 50, gender: 'female' },
      { name: 'Naveen Belagavi', relation: 'Son', age: 27, gender: 'male' },
      { name: 'Chaitra Belagavi', relation: 'Daughter', age: 24, gender: 'female' },
      { name: 'Huligemma Belagavi', relation: 'Aunt', age: 75, gender: 'female', hasChronicCondition: 'Chronic Bronchitis' }
    ]
  },
  {
    houseNumber: 'VAR-H13',
    headOfFamily: 'Geeta Dharwad',
    streetName: 'Anganwadi Cross',
    landmark: 'Beside Model Anganwadi Centre',
    contactNumber: '+91 94481 23013',
    rationCardNumber: 'KA-DHW-2024-00113',
    members: [
      { name: 'Geeta Dharwad', relation: 'Head', age: 36, gender: 'female' },
      { name: 'Varun Dharwad', relation: 'Son', age: 14, gender: 'male' },
      { name: 'Bhoomika Dharwad', relation: 'Daughter', age: 10, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H14',
    headOfFamily: 'Somappa Ganiger',
    streetName: 'Oil Mill Street',
    landmark: 'Near Traditional Oil Press',
    contactNumber: '+91 94481 23014',
    rationCardNumber: 'KA-DHW-2024-00114',
    members: [
      { name: 'Somappa Ganiger', relation: 'Self', age: 60, gender: 'male', hasChronicCondition: 'Diabetes' },
      { name: 'Jayamma Ganiger', relation: 'Wife', age: 55, gender: 'female' },
      { name: 'Raghu Ganiger', relation: 'Son', age: 31, gender: 'male' },
      { name: 'Megha Ganiger', relation: 'Daughter-in-law', age: 27, gender: 'female' }
    ]
  },
  {
    houseNumber: 'VAR-H15',
    headOfFamily: 'Prakash Tadas',
    streetName: 'Highway Bypass Colony',
    landmark: 'Near Highway Toll Plaza Service Road',
    contactNumber: '+91 94481 23015',
    rationCardNumber: 'KA-DHW-2024-00115',
    members: [
      { name: 'Prakash Tadas', relation: 'Self', age: 34, gender: 'male' },
      { name: 'Soumya Tadas', relation: 'Wife', age: 30, gender: 'female' },
      { name: 'Aditi Tadas', relation: 'Daughter', age: 5, gender: 'female' }
    ]
  }
];

export const varurMedicalsSeed = [
  {
    name: 'Sanjeevini Grama Medicals & Clinic',
    location: 'Main Bazaar, Near Gram Panchayat, Varur',
    distanceKm: 0.3,
    contactNumber: '+91 98801 87234',
    pharmacistName: 'Mr. Shrishail Patil, D.Pharm',
    hasHomeDelivery: true,
    deliveryRadiusKm: 5,
    deliveryContactNumber: '+91 98801 87234',
    is24x7: false,
    essentialMedicinesInStock: [
      'Paracetamol 500mg/650mg',
      'ORS (Oral Rehydration Salts)',
      'Cetirizine 10mg (Anti-allergy)',
      'Azithromycin 500mg',
      'Pantoprazole 40mg',
      'Oral Cough Syrup',
      'Zincovit Tablets',
      'Blood Pressure Monitor',
      'Thermometer & Pulse Oximeter'
    ],
    associatedHospital: 'Varur Primary Health Centre'
  },
  {
    name: 'Shri Navagraha Medical & General Stores',
    location: 'Pune-Bengaluru Highway NH 48, Varur',
    distanceKm: 0.5,
    contactNumber: '+91 94812 34011',
    pharmacistName: 'Mr. Arvind Jain, B.Pharm',
    hasHomeDelivery: true,
    deliveryRadiusKm: 7,
    deliveryContactNumber: '+91 94812 34011',
    is24x7: true,
    essentialMedicinesInStock: [
      'Paracetamol 650mg',
      'Electral Powder',
      'Dextromethorphan Syrup',
      'Amoxicillin 500mg',
      'Diclofenac Gel & Pain Relief',
      'First Aid Kit & Bandages',
      'Inhalers (Salbutamol)',
      'Glucometer Strips'
    ],
    associatedHospital: 'Navagraha Emergency Care Unit'
  },
  {
    name: 'Basaveshwara Medical Stores',
    location: 'Near Old Bus Stand, Varur',
    distanceKm: 0.6,
    contactNumber: '+91 99014 55678',
    pharmacistName: 'Mr. Suresh Badiger',
    hasHomeDelivery: true,
    deliveryRadiusKm: 4,
    deliveryContactNumber: '+91 99014 55678',
    is24x7: false,
    essentialMedicinesInStock: [
      'Antipyretics',
      'Antacids',
      'Anti-diarrheal',
      'Pediatric Drops',
      'Surgical Spirit & Cotton'
    ],
    associatedHospital: 'Varur Primary Health Centre'
  },
  {
    name: 'KIMS 24x7 Central Pharmacy',
    location: 'Opposite KIMS Emergency & Trauma Ward, Vidyanagar, Hubballi',
    distanceKm: 16.0,
    contactNumber: '+91 836 2374665',
    pharmacistName: 'Chief Pharmacist KIMS',
    hasHomeDelivery: false,
    deliveryRadiusKm: 0,
    deliveryContactNumber: '+91 836 2374665',
    is24x7: true,
    essentialMedicinesInStock: [
      'Full Critical Care Medicines',
      'Emergency IV Fluids & Injections',
      'Anti-Snake Venom (ASV)',
      'Anti-Rabies Vaccines (ARV)',
      'Blood Bank Products',
      'ICU Lifesaving Drugs'
    ],
    associatedHospital: 'KIMS Hospital Hubballi'
  }
];

export const varurHospitalsSeed = [
  {
    name: 'Varur Primary Health Centre (PHC)',
    type: 'PHC',
    location: 'Gram Panchayat Road, Varur, Hubballi Taluk',
    distanceKm: 0.8,
    emergencyContact: '+91 836 2201108',
    ambulanceContact: '108 (State Emergency Service)',
    availableBeds: 12,
    hasICU: false,
    hasEmergency24x7: true,
    specialties: [
      'General Medicine & Outpatient (OPD)',
      'Maternal & Child Health Care (MCH)',
      'Routine Immunization & Vaccination',
      'Rapid Malaria & Dengue Blood Testing',
      'Basic Trauma & Wound Dressing'
    ],
    nearbyPharmacies: [
      'Sanjeevini Grama Medicals (300m)',
      'Basaveshwara Medical Stores (400m)'
    ]
  },
  {
    name: 'KIMS Hospital (Karnataka Institute of Medical Sciences)',
    type: 'Medical College & Hospital',
    location: 'Vidyanagar, Hubballi (Major Tertiary Referral Hospital)',
    distanceKm: 16.0,
    emergencyContact: '+91 836 2374660',
    ambulanceContact: '+91 836 2374661 / 108',
    availableBeds: 1200,
    hasICU: true,
    hasEmergency24x7: true,
    specialties: [
      '24/7 Level-1 Trauma & Emergency Care',
      'Cardiology & Intensive Coronary Care (ICCU)',
      'Pulmonology & Respiratory Critical Care',
      'Pediatric ICU (PICU) & Neonatal Care (NICU)',
      'Infectious Diseases & Epidemic Isolation Ward',
      'Advanced Dialysis & Nephrology',
      'Government Ayushman Bharat Arogya Karnataka'
    ],
    nearbyPharmacies: [
      'KIMS 24x7 Central Jan Aushadhi Pharmacy',
      'MedPlus Vidyanagar Hubballi'
    ]
  },
  {
    name: 'Suchirayu Superspeciality Hospital',
    location: 'Gokul Road, Hubballi',
    type: 'Multispeciality',
    distanceKm: 14.5,
    emergencyContact: '+91 836 6694444',
    ambulanceContact: '+91 836 6694400 / 108',
    availableBeds: 250,
    hasICU: true,
    hasEmergency24x7: true,
    specialties: [
      'Emergency Medicine',
      'Interventional Cardiology',
      'Neurology & Stroke Care',
      'Advanced Pulmonology & Ventilator Support'
    ],
    nearbyPharmacies: [
      'Suchirayu In-house 24x7 Pharmacy',
      'Apollo Pharmacy Gokul Road'
    ]
  }
];

export async function runSeed(): Promise<void> {
  try {
    await connectToDatabase();
    console.log('[Seed] Seeding Varur Village Households...');
    await HouseholdModel.deleteMany({});
    await HouseholdModel.insertMany(varur15HouseholdsSeed);

    console.log('[Seed] Seeding Varur Medical Stores...');
    await MedicalStoreModel.deleteMany({});
    await MedicalStoreModel.insertMany(varurMedicalsSeed);

    console.log('[Seed] Seeding Nearby Hospitals...');
    await HospitalModel.deleteMany({});
    await HospitalModel.insertMany(varurHospitalsSeed);

    console.log('[Seed] Database seeded successfully with Varur village data!');
  } catch (err) {
    console.error('[Seed] Error seeding database:', err);
  } finally {
    await disconnectDatabase();
  }
}
