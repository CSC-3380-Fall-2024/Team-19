import React, { useState } from 'react';

interface FormData {
  name: string;
  location: string;
  hours: string;
  company: string;
  phone: string;
  email: string;
  supportUrl: string;
  category: string;
  services: string;
  tags: string[];
}

interface FormErrors {
  name?: string;
  location?: string;
  hours?: string;
  company?: string;
  phone?: string;
  email?: string;
  supportUrl?: string;
  category?: string;
  services?: string;
  tags?: string[];
}

const BusinessForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    location: '',
    hours: '',
    company: '',
    phone: '',
    email: '',
    supportUrl: '',
    category: '',
    services: '',
    tags: ['', '', '', '', ''],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.location.trim()) newErrors.location = 'Address is required';
    if (!formData.hours.trim()) newErrors.hours = 'Hours are required';
    if (!formData.company.trim()) newErrors.company = 'Company/Franchise is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.supportUrl.trim()) newErrors.supportUrl = 'Support page URL is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.services.trim()) newErrors.services = 'Services are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('tags[')) {
      const index = parseInt(name.match(/\d+/)![0]);
      const updatedTags = [...formData.tags];
      updatedTags[index] = value;
      setFormData(prev => ({ ...prev, tags: updatedTags }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        console.log('Form submitted:', formData);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Business Registration</h2>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-4">Business Information</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Business Name"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Location"
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Hours</label>
            <input
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Hours"
            />
            {errors.hours && <p className="text-red-500 text-xs">{errors.hours}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Company/Franchise</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Company/Franchise"
            />
            {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Phone Number"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Support Page URL</label>
            <input
              type="url"
              name="supportUrl"
              value={formData.supportUrl}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Support Page URL"
            />
            {errors.supportUrl && <p className="text-red-500 text-xs">{errors.supportUrl}</p>}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-4">Categorize Your Business</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Category"
            />
            {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Services</label>
            <input
              type="text"
              name="services"
              value={formData.services}
              onChange={handleChange}
              className="w-full px-2 py-1 border rounded-lg"
              placeholder="Services"
            />
            {errors.services && <p className="text-red-500 text-xs">{errors.services}</p>}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-4">Business Tags</h3>
        <div className="grid grid-cols-5 gap-2">
          {formData.tags.map((tag, index) => (
            <div key={index}>
              <label className="block text-gray-700 font-semibold mb-2">Tag {index + 1}</label>
              <input
                type="text"
                name={`tags[${index}]`}
                value={tag}
                onChange={handleChange}
                className="w-full px-2 py-1 border rounded-lg"
                placeholder={`Tag ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-1 px-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;
