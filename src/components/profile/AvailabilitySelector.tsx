import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Sunset, Moon } from 'lucide-react';

interface AvailabilityData {
  workType: 'full-time' | 'part-time';
  schedule: {
    [key: string]: string[]; // day: ['Morning', 'Afternoon', 'Evening']
  };
}

interface AvailabilitySelectorProps {
  value: AvailabilityData;
  onChange: (value: AvailabilityData) => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  { label: 'Morning', value: 'Morning', icon: Sun, time: '6 AM - 12 PM', color: 'yellow' },
  { label: 'Afternoon', value: 'Afternoon', icon: Sunset, time: '12 PM - 6 PM', color: 'orange' },
  { label: 'Evening', value: 'Evening', icon: Moon, time: '6 PM - 12 AM', color: 'indigo' }
];

/**
 * AvailabilitySelector - Interactive weekly schedule grid
 *
 * Features:
 * - Full-time vs Part-time toggle
 * - Visual grid with Morning/Afternoon/Evening for each day
 * - Bulk select/clear actions
 * - Color-coded time slots with icons
 */
export const AvailabilitySelector: React.FC<AvailabilitySelectorProps> = ({ value, onChange }) => {
  const isSlotSelected = (day: string, timeSlot: string) => {
    return value.schedule[day]?.includes(timeSlot) || false;
  };

  const toggleSlot = (day: string, timeSlot: string) => {
    const currentSlots = value.schedule[day] || [];
    const newSlots = currentSlots.includes(timeSlot)
      ? currentSlots.filter(slot => slot !== timeSlot)
      : [...currentSlots, timeSlot];

    onChange({
      ...value,
      schedule: {
        ...value.schedule,
        [day]: newSlots
      }
    });
  };

  const toggleFullDay = (day: string) => {
    const allSlots = TIME_SLOTS.map(slot => slot.value);
    const currentSlots = value.schedule[day] || [];
    const isFullySelected = allSlots.every(slot => currentSlots.includes(slot));

    onChange({
      ...value,
      schedule: {
        ...value.schedule,
        [day]: isFullySelected ? [] : allSlots
      }
    });
  };

  const selectAllDays = () => {
    const allSlots = TIME_SLOTS.map(slot => slot.value);
    const newSchedule: { [key: string]: string[] } = {};
    DAYS.forEach(day => {
      newSchedule[day] = allSlots;
    });
    onChange({
      ...value,
      schedule: newSchedule
    });
  };

  const clearAll = () => {
    onChange({
      ...value,
      schedule: {}
    });
  };

  const getSlotColor = (color: string, selected: boolean) => {
    if (selected) {
      const colors = {
        yellow: 'bg-yellow-500 border-yellow-600 text-white shadow-md',
        orange: 'bg-orange-500 border-orange-600 text-white shadow-md',
        indigo: 'bg-indigo-500 border-indigo-600 text-white shadow-md'
      };
      return colors[color as keyof typeof colors];
    }
    const colors = {
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100',
      orange: 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100',
      indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Work Type Toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Work Type Preference
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onChange({ ...value, workType: 'full-time' })}
            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
              value.workType === 'full-time'
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
            }`}
          >
            <div className="font-semibold">Full-time</div>
            <div className="text-xs mt-1 opacity-80">Available all working hours</div>
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, workType: 'part-time' })}
            className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
              value.workType === 'part-time'
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
            }`}
          >
            <div className="font-semibold">Part-time</div>
            <div className="text-xs mt-1 opacity-80">Select specific hours</div>
          </button>
        </div>
      </div>

      {/* Part-time Schedule Grid */}
      {value.workType === 'part-time' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-gray-700">
              Weekly Availability Schedule
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllDays}
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 font-medium transition-colors"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            {/* Header */}
            <div className="grid grid-cols-[120px_repeat(3,1fr)_80px] bg-gray-50 border-b border-gray-200">
              <div className="p-2.5 text-xs font-semibold text-gray-700">Day</div>
              {TIME_SLOTS.map((slot) => {
                const Icon = slot.icon;
                return (
                  <div key={slot.value} className="p-2.5 text-center border-l border-gray-200">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-700">
                      <Icon size={14} />
                      {slot.label}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{slot.time}</div>
                  </div>
                );
              })}
              <div className="p-2.5 text-center text-xs font-semibold text-gray-700 border-l border-gray-200">
                All Day
              </div>
            </div>

            {/* Rows */}
            {DAYS.map((day) => {
              const allSlots = TIME_SLOTS.map(slot => slot.value);
              const currentSlots = value.schedule[day] || [];
              const isFullySelected = allSlots.every(slot => currentSlots.includes(slot));

              return (
                <div
                  key={day}
                  className="grid grid-cols-[120px_repeat(3,1fr)_80px] border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2.5 flex items-center text-sm font-medium text-gray-900">
                    {day}
                  </div>
                  {TIME_SLOTS.map((slot) => {
                    const selected = isSlotSelected(day, slot.value);
                    return (
                      <div
                        key={slot.value}
                        className="p-1.5 flex items-center justify-center border-l border-gray-200"
                      >
                        <button
                          type="button"
                          onClick={() => toggleSlot(day, slot.value)}
                          className={`w-full h-10 rounded-md border-2 transition-all text-xs font-medium ${
                            getSlotColor(slot.color, selected)
                          }`}
                        >
                          {selected && <span className="font-bold">✓</span>}
                        </button>
                      </div>
                    );
                  })}
                  <div className="p-1.5 flex items-center justify-center border-l border-gray-200">
                    <button
                      type="button"
                      onClick={() => toggleFullDay(day)}
                      className={`w-full h-10 rounded-md text-xs font-medium transition-all ${
                        isFullySelected
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {isFullySelected ? '✓' : 'All'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Selected:</strong>{' '}
              {Object.keys(value.schedule).filter(day => value.schedule[day]?.length > 0).length} days,{' '}
              {Object.values(value.schedule).reduce((sum, slots) => sum + slots.length, 0)} time slots total
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
