import React from 'react';
import { Sun, Sunset, Moon, Calendar } from 'lucide-react';

interface AvailabilityDisplayProps {
  availability: {
    days: string[];
    timeSlots: string[];
  };
}

/**
 * AvailabilityDisplay - Visual weekly schedule display
 *
 * Shows a color-coded grid displaying when the user is available
 * throughout the week with Morning, Afternoon, and Evening time slots
 */
export const AvailabilityDisplay: React.FC<AvailabilityDisplayProps> = ({
  availability
}) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const timeSlotConfig = [
    {
      label: 'Morning',
      icon: Sun,
      time: '6 AM - 12 PM',
      colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    {
      label: 'Afternoon',
      icon: Sunset,
      time: '12 PM - 6 PM',
      colorClass: 'bg-orange-100 text-orange-800 border-orange-300'
    },
    {
      label: 'Evening',
      icon: Moon,
      time: '6 PM - 12 AM',
      colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-300'
    }
  ];

  // Parse availability data to determine which slots are available
  const parseAvailability = (day: string): string[] => {
    const availableSlots: string[] = [];
    const dayLower = day.toLowerCase();

    availability.timeSlots.forEach(slot => {
      const slotLower = slot.toLowerCase();

      // Check for "all day" or "anytime" indicators
      if (slotLower.includes('all day') || slotLower.includes('anytime') || slotLower === 'flexible') {
        if (slotLower.includes(dayLower.substring(0, 3)) ||
            availability.days.includes(day)) {
          availableSlots.push('Morning', 'Afternoon', 'Evening');
        }
      }
      // Check for specific time mentions
      else if (slotLower.includes('morning') && (slotLower.includes(dayLower.substring(0, 3)) || availability.days.includes(day))) {
        availableSlots.push('Morning');
      }
      else if (slotLower.includes('afternoon') && (slotLower.includes(dayLower.substring(0, 3)) || availability.days.includes(day))) {
        availableSlots.push('Afternoon');
      }
      else if (slotLower.includes('evening') && (slotLower.includes(dayLower.substring(0, 3)) || availability.days.includes(day))) {
        availableSlots.push('Evening');
      }
    });

    return [...new Set(availableSlots)]; // Remove duplicates
  };

  // Check if user has any availability
  const hasAvailability = availability.days.length > 0 && availability.timeSlots.length > 0;

  if (!hasAvailability) {
    return (
      <div className="flex items-center gap-2 text-gray-500 py-4">
        <Calendar size={20} />
        <span>No availability set</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 pb-3 border-b border-gray-200">
        {timeSlotConfig.map((slot) => {
          const Icon = slot.icon;
          return (
            <div key={slot.label} className="flex items-center gap-2">
              <Icon size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700">
                {slot.label} <span className="text-gray-500">({slot.time})</span>
              </span>
            </div>
          );
        })}
      </div>

      {/* Weekly Grid */}
      <div className="space-y-2">
        {daysOfWeek.map((day) => {
          const dayAvailable = availability.days.includes(day);
          const availableSlots = parseAvailability(day);

          return (
            <div
              key={day}
              className={`grid grid-cols-[120px_1fr] gap-3 items-center py-2 px-3 rounded-lg transition-colors ${
                dayAvailable ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              {/* Day Label */}
              <div className="font-medium text-gray-700 text-sm">
                {day}
              </div>

              {/* Time Slots */}
              <div className="flex gap-2">
                {dayAvailable && availableSlots.length > 0 ? (
                  timeSlotConfig.map((slot) => {
                    const isAvailable = availableSlots.includes(slot.label);
                    const Icon = slot.icon;

                    if (!isAvailable) return null;

                    return (
                      <div
                        key={slot.label}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-sm font-medium ${slot.colorClass}`}
                      >
                        <Icon size={14} />
                        <span>{slot.label}</span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-sm text-gray-400 italic">Not available</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="pt-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Available <span className="font-semibold text-gray-900">{availability.days.length}</span> day(s) per week
        </p>
      </div>
    </div>
  );
};
