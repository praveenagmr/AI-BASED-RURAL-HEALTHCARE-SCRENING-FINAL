import React, { useState } from 'react';
import { Language, UserProfile, MedicineOrder } from '../types';
import { getTranslation } from '../i18n/translations';
import { varurMedicalStores, varur15Households } from '../data/varurVillageData';
import { storageService } from '../services/storageService';
import { 
  Pill, 
  Truck, 
  MapPin, 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  PackageCheck, 
  Plus, 
  X, 
  AlertCircle,
  Building2,
  Phone
} from 'lucide-react';

interface MedicalsSectionProps {
  language: Language;
  currentUser: UserProfile | null;
  preselectedMedicines?: string[];
}

export const MedicalsSection: React.FC<MedicalsSectionProps> = ({
  language,
  currentUser,
  preselectedMedicines = [],
}) => {
  const t = getTranslation(language);

  // Home Delivery Order Dialog State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(varurMedicalStores[0]);
  const [patientName, setPatientName] = useState(currentUser?.name || '');
  const [houseNumber, setHouseNumber] = useState(currentUser?.houseNumber || 'VAR-H01');
  const [contactNumber, setContactNumber] = useState(currentUser?.mobile || '+91 94481 23001');
  
  // Selected Medicines checklist
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>(
    preselectedMedicines.length > 0 
      ? preselectedMedicines 
      : ['Paracetamol 650mg / Dolo', 'ORS (Oral Rehydration Solution)']
  );

  const [customMedicine, setCustomMedicine] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<MedicineOrder | null>(null);

  const handleToggleMedicine = (item: string) => {
    if (selectedMedicines.includes(item)) {
      setSelectedMedicines(selectedMedicines.filter(m => m !== item));
    } else {
      setSelectedMedicines([...selectedMedicines, item]);
    }
  };

  const handleAddCustomMedicine = () => {
    if (customMedicine.trim() && !selectedMedicines.includes(customMedicine.trim())) {
      setSelectedMedicines([...selectedMedicines, customMedicine.trim()]);
      setCustomMedicine('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || selectedMedicines.length === 0) {
      alert('Please enter patient name and select at least one medicine.');
      return;
    }

    const order = storageService.placeMedicineOrder({
      patientName: patientName.trim(),
      houseNumber,
      contactNumber,
      storeName: selectedStore.name,
      items: selectedMedicines.map(m => ({ medicineName: m, quantity: 1 })),
    });

    setOrderConfirmed(order);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
            <Pill className="w-4 h-4" />
            Varur Village Pharmacies & Logistics
          </span>
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            Doorstep Delivery Active in Varur
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.medicalsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
              {t.medicalsDesc}
            </p>
          </div>

          <button
            onClick={() => {
              setOrderConfirmed(null);
              setIsOrderModalOpen(true);
            }}
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
          >
            <Truck className="w-4 h-4" />
            <span>{t.orderMedicineBtn}</span>
          </button>
        </div>
      </div>

      {/* Pharmacies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {varurMedicalStores.map((store) => (
          <div
            key={store.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    {store.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {store.location}
                  </p>
                </div>

                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-700">
                  {store.distanceKm} km
                </span>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {store.hasHomeDelivery && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Home Delivery ({store.deliveryRadiusKm}km Radius)
                  </span>
                )}
                {store.is24x7 ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold">
                    24x7 Open
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    8:00 AM - 10:00 PM
                  </span>
                )}
              </div>

              {/* Pharmacist & Contact */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p className="text-slate-700 dark:text-slate-300">
                  Pharmacist: <strong>{store.pharmacistName}</strong>
                </p>
                <p className="font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  Order Helpline: <strong>{store.deliveryContactNumber}</strong>
                </p>
              </div>

              {/* In-Stock Medicines Preview */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Essential Stock Available:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {store.essentialMedicinesInStock.map((med, i) => (
                    <span 
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Order from this store button */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <a
                href={`tel:${store.contactNumber.replace(/[^0-9+]/g, '')}`}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </a>

              {store.hasHomeDelivery && (
                <button
                  onClick={() => {
                    setSelectedStore(store);
                    setOrderConfirmed(null);
                    setIsOrderModalOpen(true);
                  }}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Request Home Delivery</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Medicine Home Delivery Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/60 dark:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {t.orderModalTitle}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Delivered from: {selectedStore.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[80vh] overflow-y-auto space-y-4">
              {orderConfirmed ? (
                /* Order Confirmation Success Screen */
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                    <PackageCheck className="w-8 h-8" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      Order Confirmed!
                    </h4>
                    <p className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      Tracking ID: {orderConfirmed.orderId}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {t.orderPlacedSuccess}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs text-left space-y-1">
                    <p>Deliver to: <strong>House {orderConfirmed.houseNumber}, Varur</strong></p>
                    <p>Patient: <strong>{orderConfirmed.patientName}</strong></p>
                    <p>Estimated Arrival: <strong className="text-emerald-600">{orderConfirmed.estimatedDeliveryTime}</strong></p>
                    <p>Medicines: <strong>{orderConfirmed.items.map(i => i.medicineName).join(', ')}</strong></p>
                  </div>

                  <button
                    onClick={() => setIsOrderModalOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                  >
                    Done (Close)
                  </button>
                </div>
              ) : (
                /* Order Request Form */
                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Basavaraj Patil"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Varur House No. *
                      </label>
                      <select
                        value={houseNumber}
                        onChange={(e) => setHouseNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        {varur15Households.map(h => (
                          <option key={h.houseNumber} value={h.houseNumber}>
                            {h.houseNumber} - {h.headOfFamily}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Delivery Contact Mobile *
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="10 digit mobile"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  {/* Medicines Checklist */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {t.selectMedicines}
                    </label>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                      {selectedStore.essentialMedicinesInStock.map((med, i) => (
                        <div
                          key={i}
                          onClick={() => handleToggleMedicine(med)}
                          className={`p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer ${
                            selectedMedicines.includes(med)
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-semibold'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span>{med}</span>
                          <input
                            type="checkbox"
                            checked={selectedMedicines.includes(med)}
                            onChange={() => {}}
                            className="w-3.5 h-3.5 accent-emerald-600"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Add Custom Medicine */}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Add other prescribed tablet / syrup..."
                        value={customMedicine}
                        onChange={(e) => setCustomMedicine(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomMedicine}
                        className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl hover:bg-slate-300"
                      >
                        + Add
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Truck className="w-4 h-4" />
                      <span>{t.confirmOrderBtn}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
