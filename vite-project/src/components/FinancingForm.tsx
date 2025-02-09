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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the back arrow icon

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

  const [currentScreen, setCurrentScreen] = useState<'screen1' | 'screen2' | 'screen3' | 'screen4'>('screen1');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentScreen === 'screen1') {
      setCurrentScreen('screen2');
    } else if (currentScreen === 'screen2') {
      setCurrentScreen('screen3');
    } else if (currentScreen === 'screen3') {
      setCurrentScreen('screen4');
    } else {
      console.log('Form submitted:', formData);
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
            />

            <TextField
              label="What Is Your Average Monthly Sales?"
              value={formData.monthlySales}
              onChange={(e) => handleCurrencyInput(e, 'monthlySales')}
              placeholder="$10,000"
              fullWidth
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

            <div style={{ display: 'flex', gap: '16px' }}>
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                fullWidth
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
              required
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Business Start Date"
                value={formData.businessStartDate}
                onChange={(date) => setFormData({ ...formData, businessStartDate: date })}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>

            <TextField
              label="Business Federal Tax ID (EIN)"
              value={formData.ein}
              onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
              placeholder="XX-XXXXXXX"
              fullWidth
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

            <TextField
              select
              label="General Industry"
              value={formData.generalIndustry}
              onChange={(e) => setFormData({ ...formData, generalIndustry: e.target.value })}
              fullWidth
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
              required
            />

            <TextField
              label="Physical Business Address"
              value={formData.businessAddress}
              onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
              placeholder="No P.O. Box"
              fullWidth
              required
            />

            <TextField
              label="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="State"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Zip Code"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Business Website or Social Media Page"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              fullWidth
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
        onClick={() => setCurrentScreen('screen2')}
        style={{ position: 'absolute', top: '16px', left: '16px' }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Card style={{ padding: '24px' }}>
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
              onChange={(e) => setFormData({ ...formData, estimatedCreditScore: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Last 4 Digits of SSN (XXXX)"
              value={formData.lastFourSSN}
              onChange={(e) => setFormData({ ...formData, lastFourSSN: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Home Zip Code"
              value={formData.homeZipCode}
              onChange={(e) => setFormData({ ...formData, homeZipCode: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Ownership Percentage"
              value={formData.ownershipPercentage}
              onChange={(e) => setFormData({ ...formData, ownershipPercentage: e.target.value })}
              fullWidth
              required
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
              label="[Insert additional Disclaimer here permitting disclosure of information at the companies discretion]"
            />

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
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
            <TextField
              label="Social Security Number (SSN) (XXX - XX - XXXX)"
              value={formData.ssn}
              onChange={(e) => setFormData({ ...formData, ssn: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Home Address"
              value={formData.homeAddress}
              onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="City"
              value={formData.homeCity}
              onChange={(e) => setFormData({ ...formData, homeCity: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="State"
              value={formData.homeState}
              onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
              fullWidth
              required
            />

            <TextField
              label="Zip Code"
              value={formData.homeZip}
              onChange={(e) => setFormData({ ...formData, homeZip: e.target.value })}
              fullWidth
              required
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                slotProps={{ textField: { fullWidth: true, required: true } }}
              />
            </LocalizationProvider>

            <Typography variant="body1">When do you need funds?</Typography>
            <RadioGroup
              value={formData.fundsNeededTiming}
              onChange={(e) => setFormData({ ...formData, fundsNeededTiming: e.target.value })}
            >
              <FormControlLabel value="immediately" control={<Radio />} label="Immediately" />
              <FormControlLabel value="withinAWeek" control={<Radio />} label="Within a week" />
              <FormControlLabel value="withinAMonth" control={<Radio />} label="Within a month" />
            </RadioGroup>

            <Typography variant="body1">What is most important when securing financing?</Typography>
            <RadioGroup
              value={formData.financingPriority}
              onChange={(e) => setFormData({ ...formData, financingPriority: e.target.value })}
            >
              <FormControlLabel value="speed" control={<Radio />} label="Speed" />
              <FormControlLabel value="amount" control={<Radio />} label="Amount" />
              <FormControlLabel value="cost" control={<Radio />} label="Cost" />
            </RadioGroup>

            <TextField
              select
              label="How did you hear about us?"
              value={formData.referralSource}
              onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
              fullWidth
            >
              <MenuItem value="toBeImplemented">To be Implemented</MenuItem>
            </TextField>

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