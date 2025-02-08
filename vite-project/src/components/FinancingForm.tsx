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
} from '@mui/material';

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
  });

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  // Format currency input
  const formatCurrency = (value: string): string => {
    if (!value) return '';
    const digits = value.replace(/\D/g, '');
    return `$${parseInt(digits || '0').toLocaleString()}`;
  };

  // Handle currency input changes
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', // Full viewport height
        padding: '16px', // Add padding to avoid touching the edges
        backgroundColor: '#f9f9f9', // Light background color
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '800px', // Maximum width for larger screens
          padding: '24px', // Inner padding
        }}
      >
        <CardHeader
          title={
            <Typography variant="h4" align="center" gutterBottom>
              Financing Application
            </Typography>
          }
        />
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px', // Spacing between form elements
            }}
          >
            {/* Financial Information */}
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
              <FormControlLabel
                value="workingCapital"
                control={<Radio />}
                label="Working Capital/Credit Line"
              />
              <FormControlLabel
                value="equipment"
                control={<Radio />}
                label="Equipment Financing"
              />
            </RadioGroup>

            {/* Personal Information */}
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

            {/* Consent Checkboxes */}
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
    </div>
  );
};

export default FinancingForm;