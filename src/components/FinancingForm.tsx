import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  MenuItem,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Define the shape of the form data
interface FormData {
  cashNeeded: string;
  monthlySales: string;
  financingType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent1: boolean;
  consent2: boolean;
  legalBusinessName: string;
  businessStartDate: Date | null;
  ein: string;
  businessClassification: string;
  generalIndustry: string;
  specificIndustry: string;
  businessAddress: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
  estimatedCreditScore: string;
  lastFourSSN: string;
  homeZipCode: string;
  ownershipPercentage: string;
  ownershipDisclaimer: boolean;
  ssn: string;
  homeAddress: string;
  homeCity: string;
  homeState: string;
  homeZip: string;
  dateOfBirth: Date | null;
  fundsNeededTiming: string;
  financingPriority: string;
  referralSource: string;
}

const FinancingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    cashNeeded: '',
    monthlySales: '',
    financingType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent1: false,
    consent2: false,
    legalBusinessName: '',
    businessStartDate: null,
    ein: '',
    businessClassification: '',
    generalIndustry: '',
    specificIndustry: '',
    businessAddress: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    estimatedCreditScore: '',
    lastFourSSN: '',
    homeZipCode: '',
    ownershipPercentage: '',
    ownershipDisclaimer: false,
    ssn: '',
    homeAddress: '',
    homeCity: '',
    homeState: '',
    homeZip: '',
    dateOfBirth: null,
    fundsNeededTiming: '',
    financingPriority: '',
    referralSource: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentScreen, setCurrentScreen] = useState<'screen1' | 'screen2' | 'screen3' | 'screen4'>('screen1');

  // Input validation function
  const validateForm = (screen: 'screen1' | 'screen2' | 'screen3' | 'screen4') => {
    const newErrors: { [key: string]: string } = {};
    //Begin Screen 1 validation
    if (screen === 'screen1') {
      if (!formData.cashNeeded) newErrors.cashNeeded = 'Cash needed is required';
      if (!formData.monthlySales) newErrors.monthlySales = 'Monthly sales are required';
      if (!formData.financingType) newErrors.financingType = 'Financing type is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Valid phone number is required';
      }
      if (!formData.consent1) newErrors.consent1 = 'Consent 1 is required';
      if (!formData.consent2) newErrors.consent2 = 'Consent 2 is required';
    } 
    //Begin Screen2 validation
    else if (screen === 'screen2') {
      if (!formData.legalBusinessName) newErrors.legalBusinessName = 'Legal business name is required';
      if (!formData.businessStartDate) newErrors.businessStartDate = 'Business start date is required';
      if (!formData.ein || !/^\d{2}-\d{7}$/.test(formData.ein)) {
        newErrors.ein = 'Valid EIN is required (format: XX-XXXXXXX)';
      }
      if (!formData.businessClassification) newErrors.businessClassification = 'Business classification is required';
      if (!formData.generalIndustry) newErrors.generalIndustry = 'General industry is required';
      if (!formData.specificIndustry) newErrors.specificIndustry = 'Specific industry is required';
      if (!formData.businessAddress) newErrors.businessAddress = 'Business address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode || !/^\d{5}$/.test(formData.zipCode)) {
        newErrors.zipCode = 'Valid ZIP code is required';
      }
    }
    //Begin Screen 3 validation
    else if (screen === 'screen3') {
      if (!formData.estimatedCreditScore) newErrors.estimatedCreditScore = 'Estimated credit score is required';
      if (!formData.lastFourSSN || !/^\d{4}$/.test(formData.lastFourSSN)) {
        newErrors.lastFourSSN = 'Last 4 digits of SSN are required';
      }
      if (!formData.homeZipCode || !/^\d{5}$/.test(formData.homeZipCode)) {
        newErrors.homeZipCode = 'Valid home ZIP code is required';
      }
      if (!formData.ownershipPercentage) newErrors.ownershipPercentage = 'Ownership percentage is required';
      if (!formData.ownershipDisclaimer) newErrors.ownershipDisclaimer = 'Ownership disclaimer is required';
    } 
    //Begin Screen 4 validation
    else if (screen === 'screen4') {
      if (!formData.ssn || !/^\d{3}-\d{2}-\d{4}$/.test(formData.ssn)) {
        newErrors.ssn = 'Valid SSN is required (format: XXX-XX-XXXX)';
      }
      if (!formData.homeAddress) newErrors.homeAddress = 'Home address is required';
      if (!formData.homeCity) newErrors.homeCity = 'Home city is required';
      if (!formData.homeState) newErrors.homeState = 'Home state is required';
      if (!formData.homeZip || !/^\d{5}$/.test(formData.homeZip)) {
        newErrors.homeZip = 'Valid home ZIP code is required';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.fundsNeededTiming) newErrors.fundsNeededTiming = 'Funds needed timing is required';
      if (!formData.financingPriority) newErrors.financingPriority = 'Financing priority is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(currentScreen)) {
      if (currentScreen === 'screen1') {
        setCurrentScreen('screen2');
      } else if (currentScreen === 'screen2') {
        setCurrentScreen('screen3');
      } else if (currentScreen === 'screen3') {
        setCurrentScreen('screen4');
      } else {
        console.log('Form submitted:', formData);
      }
    }
  };

  const formatCurrency = (value: string): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    return `$${parseInt(digits || '0').toLocaleString()}`;
  };

  const handleCurrencyInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof FormData
  ) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    setFormData({
      ...formData,
      [field]: formatCurrency(rawValue),
    });
  };

  // Render Screen 1
  const renderScreen1 = () => (
    <>
      {/* Logo Placeholder */}
      <div
        style={{
          textAlign: 'center',
          padding: '32px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '8px',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Typography variant="h4" color="textSecondary">
          Your Logo Here
        </Typography>
      </div>

      {/* First Screen Form */}
      <Card style={{ width: '100%', maxWidth: '800px', padding: '24px' }}>
        <CardHeader
          title={
            <Typography variant="h4" align="center" gutterBottom>
              Financing Application
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="How Much Cash Do You Need?"
              value={formData.cashNeeded}
              onChange={(e) => handleCurrencyInput(e, 'cashNeeded')}
              placeholder="$50,000"
              fullWidth
              error={!!errors.cashNeeded}
              helperText={errors.cashNeeded}
            />

            <TextField
              label="What Is Your Average Monthly Sales?"
              value={formData.monthlySales}
              onChange={(e) => handleCurrencyInput(e, 'monthlySales')}
              placeholder="$10,000"
              fullWidth
              error={!!errors.monthlySales}
              helperText={errors.monthlySales}
            />

            <Typography variant="body1">What Are You Interested In?</Typography>
            <RadioGroup
              value={formData.financingType}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, financingType: e.target.value })
              }
            >
              <FormControlLabel value="workingCapital" control={<Radio />} label="Working Capital/Credit Line" />
              <FormControlLabel value="equipment" control={<Radio />} label="Equipment Financing" />
            </RadioGroup>
            {errors.financingType && (
              <Typography color="error" variant="body2">
                {errors.financingType}
              </Typography>
            )}

            <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>

            <TextField
              label="Business Email Address"
              type="email"
              value={formData.email}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Cell Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="(123) 456-7890"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent1}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, consent1: e.target.checked })
                  }
                />
              }
              label="Consent Agreement 1 (to be implemented)"
            />
            {errors.consent1 && (
              <Typography color="error" variant="body2">
                {errors.consent1}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.consent2}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, consent2: e.target.checked })
                  }
                />
              }
              label="Consent Agreement 2 (to be implemented)"
            />
            {errors.consent2 && (
              <Typography color="error" variant="body2">
                {errors.consent2}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );

  // Render Screen 2
  const renderScreen2 = () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      {/* Logo Placeholder */}
      <div
        style={{
          textAlign: 'center',
          padding: '32px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '8px',
        }}
      >
        <Typography variant="h4" color="textSecondary">
          Your Logo Here
        </Typography>
      </div>

      {/* Back Button */}
      <IconButton
        onClick={() => setCurrentScreen('screen1')}
        style={{ position: 'absolute', top: '16px', left: '16px' }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Card style={{ padding: '24px' }}>
        <CardHeader
          title={
            <Typography variant="h4" align="center" gutterBottom>
              Business Information
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Legal Business Name"
              value={formData.legalBusinessName}
              onChange={(e) => setFormData({ ...formData, legalBusinessName: e.target.value })}
              fullWidth
              error={!!errors.legalBusinessName}
              helperText={errors.legalBusinessName}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Business Start Date"
                value={formData.businessStartDate}
                onChange={(date) => setFormData({ ...formData, businessStartDate: date })}
                slotProps={{ textField: { fullWidth: true, required: true, error: !!errors.businessStartDate, helperText: errors.businessStartDate } }}
              />
            </LocalizationProvider>

            <TextField
              label="Business Federal Tax ID (EIN)"
              value={formData.ein}
              onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
              placeholder="XX-XXXXXXX"
              fullWidth
              error={!!errors.ein}
              helperText={errors.ein}
              required
            />

            <Typography variant="body1">Business Classification</Typography>
            <RadioGroup
              value={formData.businessClassification}
              onChange={(e) => setFormData({ ...formData, businessClassification: e.target.value })}
            >
              <FormControlLabel value="soleProprietorship" control={<Radio />} label="Sole Proprietorship" />
              <FormControlLabel value="partnership" control={<Radio />} label="Partnership" />
              <FormControlLabel value="llc" control={<Radio />} label="LLC" />
              <FormControlLabel value="cCorp" control={<Radio />} label="C Corp" />
              <FormControlLabel value="sCorp" control={<Radio />} label="S Corp" />
            </RadioGroup>
            {errors.businessClassification && (
              <Typography color="error" variant="body2">
                {errors.businessClassification}
              </Typography>
            )}

            <TextField
              select
              label="General Industry"
              value={formData.generalIndustry}
              onChange={(e) => setFormData({ ...formData, generalIndustry: e.target.value })}
              fullWidth
              error={!!errors.generalIndustry}
              helperText={errors.generalIndustry}
              required
            >
              {[
                'Retail',
                'Restaurants and Food Services',
                'Healthcare',
                'Automotive',
                'Professional Services',
                'Construction and Contracting',
                'Beauty and Wellness',
                'E-Commerce',
                'Manufacturing',
                'Transportation and Logistics',
                'Education and Childcare',
                'Real Estate',
                'Technology',
                'Wholesale',
                'Non-Profits',
                'Other',
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Specific Industry"
              value={formData.specificIndustry}
              onChange={(e) => setFormData({ ...formData, specificIndustry: e.target.value })}
              fullWidth
              error={!!errors.specificIndustry}
              helperText={errors.specificIndustry}
              required
            />

            <TextField
              label="Physical Business Address"
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value})}
              fullWidth
              error={!!errors.businessAddress}
              helperText={errors.businessAddress}
              required
            />

            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value})}
              fullWidth
              error={!!errors.city}
              helperText={errors.city}
              required
            />

            <TextField
              label="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value})}
              fullWidth
              error={!!errors.state}
              helperText={errors.state}
              required
            />

            <TextField
              label="ZipCode"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value})}
              fullWidth
              error={!!errors.zipCode}
              helperText={errors.zipCode}
              required
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  // Render Screen 3
  const renderScreen3 = () => (
    <>
      {/* Logo Placeholder */}
      <div
        style={{
          textAlign: 'center',
          padding: '32px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '8px',
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Typography variant="h4" color="textSecondary">
          Your Logo Here
        </Typography>
      </div>

      {/* First Screen Form */}
      <Card style={{ width: '100%', maxWidth: '800px', padding: '24px' }}>
        <CardHeader
          title={
            <Typography variant="h4" align="center" gutterBottom>
              Ownership Details
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Estimated Credit Score"
              value={formData.estimatedCreditScore}
              onChange={(e) => setFormData({ ...formData, estimatedCreditScore: e.target.value})}
              fullWidth
              error={!!errors.estimatedCreditScore}
              helperText={errors.estimatedCreditScore}
            />

            <TextField
              label="Last Four of your SSN"
              value={formData.lastFourSSN}
              onChange={(e) => setFormData({ ...formData, lastFourSSN: e.target.value})}
              placeholder="XXXX"
              fullWidth
              error={!!errors.lastFourSSN}
              helperText={errors.lastFourSSN}
            />

            <TextField
              label="Home Zip Code"
              value={formData.homeZipCode}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setFormData({ ...formData, homeZipCode: e.target.value })
              }
              fullWidth
              error={!!errors.homeZipCode}
              helperText={errors.homeZipCode}
            />

            <TextField
              label="Ownership Percentage"
              value={formData.ownershipPercentage}
              onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setFormData({ ...formData, ownershipPercentage: e.target.value })
              }
              fullWidth
              error={!!errors.ownershipPercentage}
              helperText={errors.ownershipPercentage}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.ownershipDisclaimer}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, ownershipDisclaimer: e.target.checked })
                  }
                />
              }
              label="Ownership Disclaimer to be instantiated, User information usage at companies' discretion check"
            />
            {errors.ownershipDisclaimer && (
              <Typography color="error" variant="body2">
                {errors.ownershipDisclaimer}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );

  // Render Screen 4
const renderScreen4 = () => (
  <div style={{ width: '100%', maxWidth: '800px' }}>
    {/* Logo Placeholder */}
    <div
      style={{
        textAlign: 'center',
        padding: '32px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '8px',
      }}
    >
      <Typography variant="h4" color="textSecondary">
        Your Logo Here
      </Typography>
    </div>

    {/* Back Button */}
    <IconButton
      onClick={() => setCurrentScreen('screen3')}
      style={{ position: 'absolute', top: '16px', left: '16px' }}
    >
      <ArrowBackIcon />
    </IconButton>

    <Card style={{ padding: '24px' }}>
      <CardHeader
        title={
          <Typography variant="h4" align="center" gutterBottom>
            Ownership Information
          </Typography>
        }
      />
      <CardContent>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Social Security Number (SSN) */}
          <TextField
            label="Social Security Number (SSN)"
            value={formData.ssn}
            onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
            placeholder="XXX-XX-XXXX"
            fullWidth
            error={!!errors.ssn}
            helperText={errors.ssn}
            required
          />

          {/* Home Address */}
          <TextField
            label="Home Address"
            value={formData.homeAddress}
            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
            fullWidth
            error={!!errors.homeAddress}
            helperText={errors.homeAddress}
            required
          />

          {/* Home City */}
          <TextField
            label="City"
            value={formData.homeCity}
            onChange={(e) => setFormData({ ...formData, homeCity: e.target.value })}
            fullWidth
            error={!!errors.homeCity}
            helperText={errors.homeCity}
            required
          />

          {/* Home State */}
          <TextField
            label="State"
            value={formData.homeState}
            onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
            fullWidth
            error={!!errors.homeState}
            helperText={errors.homeState}
            required
          />

          {/* Home Zip Code */}
          <TextField
            label="Zip Code"
            value={formData.homeZip}
            onChange={(e) => setFormData({ ...formData, homeZip: e.target.value })}
            fullWidth
            error={!!errors.homeZip}
            helperText={errors.homeZip}
            required
          />

          {/* Date of Birth */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: !!errors.dateOfBirth,
                  helperText: errors.dateOfBirth,
                },
              }}
            />
          </LocalizationProvider>

          {/* Funds Needed Timing */}
          <Typography variant="body1">When do you need funds?</Typography>
          <RadioGroup
            value={formData.fundsNeededTiming}
            onChange={(e) => setFormData({ ...formData, fundsNeededTiming: e.target.value })}
          >
            <FormControlLabel value="immediately" control={<Radio />} label="Immediately" />
            <FormControlLabel value="withinAWeek" control={<Radio />} label="Within a week" />
            <FormControlLabel value="withinAMonth" control={<Radio />} label="Within a month" />
          </RadioGroup>
          {errors.fundsNeededTiming && (
            <Typography color="error" variant="body2">
              {errors.fundsNeededTiming}
            </Typography>
          )}

          {/* Financing Priority */}
          <Typography variant="body1">What is most important when securing financing?</Typography>
          <RadioGroup
            value={formData.financingPriority}
            onChange={(e) => setFormData({ ...formData, financingPriority: e.target.value })}
          >
            <FormControlLabel value="speed" control={<Radio />} label="Speed" />
            <FormControlLabel value="amount" control={<Radio />} label="Amount" />
            <FormControlLabel value="cost" control={<Radio />} label="Cost" />
          </RadioGroup>
          {errors.financingPriority && (
            <Typography color="error" variant="body2">
              {errors.financingPriority}
            </Typography>
          )}

          {/* Referral Source */}
          <TextField
            select
            label="How did you hear about us?"
            value={formData.referralSource}
            onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
            fullWidth
          >
            <MenuItem value="toBeImplemented">To be Implemented</MenuItem>
          </TextField>

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
);
return (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: '16px',
      boxSizing: 'border-box',
    }}
  >
    {currentScreen === 'screen1'
      ? renderScreen1()
      : currentScreen === 'screen2'
      ? renderScreen2()
      : currentScreen === 'screen3'
      ? renderScreen3()
      : renderScreen4()}
  </div>
);
};

export default FinancingForm;