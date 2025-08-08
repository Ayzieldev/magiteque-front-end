import React, { useState } from 'react';

interface Service {
  id: string;
  name: string;
  type: 'zoom' | 'voice';
  duration: string;
  description: string;
  price: string;
  icon: string;
}

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  selectedDate: string;
  selectedTime: string;
  selectedService: Service | null;
}

const SERVICES: Service[] = [
  {
    id: 'zoom-assessment',
    name: 'Zoom Call Assessment',
    type: 'zoom',
    duration: '1 hr',
    description: 'Professional mental wellness assessment via Zoom video call',
    price: '',
    icon: '📹'
  },
  {
    id: 'voice-assessment',
    name: 'Voice Call Assessment',
    type: 'voice',
    duration: '1 hr',
    description: 'Professional mental wellness assessment via voice call',
    price: '',
    icon: '📞'
  }
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
];

interface BookingScreenProps {
  onBack: () => void;
  onBookingComplete: (booking: BookingForm) => void;
  onEmailTrigger?: (bookingData: any) => void;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ onBack, onBookingComplete, onEmailTrigger }) => {
  const [currentStep, setCurrentStep] = useState<'service' | 'details' | 'confirmation'>('service');
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    selectedDate: '',
    selectedTime: '',
    selectedService: null
  });
  const [selectedMonth, setSelectedMonth] = useState<{ month: number; year: number }>(() => {
    const today = new Date();
    return { month: today.getMonth(), year: today.getFullYear() };
  });

  const handleServiceSelect = (service: Service) => {
    setBookingForm(prev => ({ ...prev, selectedService: service }));
    setCurrentStep('details');
  };

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (date: string) => {
    setBookingForm(prev => ({ ...prev, selectedDate: date }));
  };

  const handleMonthSelect = (month: number, year: number) => {
    setSelectedMonth({ month, year });
    // Clear selected date when month changes
    setBookingForm(prev => ({ ...prev, selectedDate: '' }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingForm(prev => ({ ...prev, selectedTime: time }));
  };

  const handleSubmit = () => {
    if (bookingForm.name && bookingForm.email && bookingForm.selectedDate && bookingForm.selectedTime) {
      console.log('🎯 BOOKING CONFIRMED - TRIGGERING EMAIL');
      console.log('📋 BOOKING DATA:', {
        name: bookingForm.name,
        email: bookingForm.email,
        service: bookingForm.selectedService?.name,
        date: bookingForm.selectedDate,
        time: bookingForm.selectedTime
      });
      
      // Trigger email sending with booking data immediately when booking is confirmed
      if (onEmailTrigger) {
        console.log('📧 CALLING onEmailTrigger...');
        onEmailTrigger({
          ...bookingForm,
          service: bookingForm.selectedService?.name,
          date: bookingForm.selectedDate,
          time: bookingForm.selectedTime
        });
        console.log('✅ onEmailTrigger called successfully');
      } else {
        console.log('❌ onEmailTrigger is not available');
      }
      setCurrentStep('confirmation');
    } else {
      console.log('❌ Cannot confirm booking - missing required fields');
      console.log('Form state:', bookingForm);
    }
  };

  const getAvailableMonths = () => {
    const months = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    // Generate next 6 months
    for (let i = 0; i < 6; i++) {
      const month = new Date(currentYear, currentMonth + i, 1);
      months.push({
        value: month.getMonth(),
        label: month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        year: month.getFullYear()
      });
    }
    return months;
  };

  const getDaysInMonth = (month: number, year: number) => {
    const days = [];
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    
    // Start from tomorrow if it's the current month
    const startDay = month === today.getMonth() && year === today.getFullYear() 
      ? today.getDate() + 1 
      : 1;
    
    for (let day = startDay; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      days.push({
        value: date.toISOString().split('T')[0],
        label: day.toString(),
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }
    return days;
  };

  return (
    <div className="booking-screen">
      <div className="booking-container">
        <div className="booking-header">
          <button className="back-button" onClick={onBack}>
            ← Back to Results
          </button>
          <h1 className="booking-title">Book Your Consultation</h1>
          <div className="booking-progress">
            <div className={`progress-step ${currentStep === 'service' ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Service</span>
            </div>
            <div className={`progress-step ${currentStep === 'details' ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Details</span>
            </div>
            <div className={`progress-step ${currentStep === 'confirmation' ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>

        {currentStep === 'service' && (
          <div className="service-selection">
            <h2>Choose Your Service</h2>
            <div className="services-grid">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="service-card"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-details">
                    <span className="service-duration">⏱️ {service.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'details' && (
          <div className="booking-details">
            <h2>Appointment Details</h2>
            
            <div className="selected-service">
              <h3>Selected Service</h3>
              <div className="service-summary">
                <span className="service-icon">{bookingForm.selectedService?.icon}</span>
                <span className="service-name">{bookingForm.selectedService?.name}</span>
              </div>
            </div>

            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={bookingForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={bookingForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={bookingForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

                         <div className="form-section">
               <h3>Appointment Time</h3>
               <div className="month-selection">
                 <label>Select Month</label>
                 <div className="month-grid">
                   {getAvailableMonths().map((month) => (
                     <button
                       key={`${month.year}-${month.value}`}
                       className={`month-option ${selectedMonth.month === month.value && selectedMonth.year === month.year ? 'selected' : ''}`}
                       onClick={() => handleMonthSelect(month.value, month.year)}
                     >
                       {month.label}
                     </button>
                   ))}
                 </div>
               </div>
               
               <div className="date-selection">
                 <label>Select Date</label>
                 <div className="date-grid">
                   {getDaysInMonth(selectedMonth.month, selectedMonth.year).map((day) => (
                     <button
                       key={day.value}
                       className={`date-option ${bookingForm.selectedDate === day.value ? 'selected' : ''}`}
                       onClick={() => handleDateSelect(day.value)}
                     >
                       <span className="day-number">{day.label}</span>
                       <span className="day-weekday">{day.dayOfWeek}</span>
                     </button>
                   ))}
                 </div>
               </div>
              
              <div className="time-selection">
                <label>Select Time</label>
                <div className="time-grid">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      className={`time-option ${bookingForm.selectedTime === time ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="booking-actions">
              <button className="btn btn--secondary" onClick={() => setCurrentStep('service')}>
                Back
              </button>
              <button 
                className="btn btn--primary" 
                onClick={handleSubmit}
                disabled={!bookingForm.name || !bookingForm.email || !bookingForm.selectedDate || !bookingForm.selectedTime}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

                {currentStep === 'confirmation' && (
          <div className="booking-confirmation">
            <div className="confirmation-icon">✅</div>
            <h2>Booking Confirmed!</h2>
            <p>Thank you for booking your consultation. We've sent a confirmation email with all the details.</p>
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-item">
                <strong>Service:</strong> {bookingForm.selectedService?.name}
              </div>
              <div className="summary-item">
                <strong>Date:</strong> {new Date(bookingForm.selectedDate).toLocaleDateString()}
              </div>
              <div className="summary-item">
                <strong>Time:</strong> {bookingForm.selectedTime}
              </div>
              <div className="summary-item">
                <strong>Name:</strong> {bookingForm.name}
              </div>
              <div className="summary-item">
                <strong>Email:</strong> {bookingForm.email}
              </div>
            </div>
            <button className="btn btn--primary" onClick={() => {
              onBookingComplete(bookingForm);
              onBack();
            }}>
              Return to Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingScreen;
