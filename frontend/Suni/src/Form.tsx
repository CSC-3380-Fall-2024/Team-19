import React, { useState } from 'react';

interface FormData {
  businessName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
}

interface FormErrors {
  businessName?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
}

const BusinessForm = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
        // reset form
        setFormData({
          businessName: '',
          email: '',
          phone: '',
          address: '',
          website: '',
        });
      } catch (error) {
        console.error('Submission error:', error);
        alert('An error occurred while submitting the form');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const inputClassName = (fieldName: keyof FormErrors) => `
    appearance-none block w-full bg-gray-200 text-gray-700 border 
    ${errors[fieldName] ? 'border-red-500' : 'border-gray-200'} 
    rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
  `;

  const labelClassName = "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-6">
      <div className="mb-6">
        <label htmlFor="businessName" className={labelClassName}>
          Business Name
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          placeholder="Acme Corporation"
          value={formData.businessName}
          onChange={handleChange}
          className={inputClassName('businessName')}
        />
        {errors.businessName && (
          <p className="text-red-500 text-xs italic">{errors.businessName}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className={labelClassName}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="contact@business.com"
          value={formData.email}
          onChange={handleChange}
          className={inputClassName('email')}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className={labelClassName}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="(555) 555-5555"
          value={formData.phone}
          onChange={handleChange}
          className={inputClassName('phone')}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs italic">{errors.phone}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="address" className={labelClassName}>
          Business Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="123 Business St"
          value={formData.address}
          onChange={handleChange}
          className={inputClassName('address')}
        />
        {errors.address && (
          <p className="text-red-500 text-xs italic">{errors.address}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="website" className={labelClassName}>
          Website
        </label>
        <input
          id="website"
          name="website"
          type="text"
          placeholder="example.com"
          value={formData.website}
          onChange={handleChange}
          className={inputClassName('website')}
        />
        {errors.website && (
          <p className="text-red-500 text-xs italic">{errors.website}</p>
        )}
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;