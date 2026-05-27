import { useState } from 'react';
import { toast } from 'sonner';
import { useAppContext } from '../context/AppContext';

/**
 * AddContactForm — luxury minimal form with underline inputs.
 */
function AddContactForm() {
  const { dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('personal');
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch({
      type: 'ADD_CONTACT',
      payload: {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        category,
      },
    });
    toast.success(`Added contact: ${name.trim()}`);
    setName('');
    setEmail('');
    setPhone('');
    setCategory('personal');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add contact" className="mb-8">
      <div className="mb-4">
        <label htmlFor="contact-name" className="lm-label mb-2 block">Name *</label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
          placeholder="Full name"
          className="lm-input"
          style={errors.name ? { borderBottomColor: 'var(--lm-danger)' } : undefined}
        />
        {errors.name && (
          <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--lm-danger)' }}>{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="contact-email" className="lm-label mb-2 block">Email *</label>
        <input
          id="contact-email"
          type="text"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
          placeholder="email@example.com"
          className="lm-input"
          style={errors.email ? { borderBottomColor: 'var(--lm-danger)' } : undefined}
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--lm-danger)' }}>{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="contact-phone" className="lm-label mb-2 block">Phone</label>
        <input
          id="contact-phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Optional"
          className="lm-input"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="contact-category" className="lm-label mb-2 block">Category</label>
        <select
          id="contact-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="lm-input cursor-pointer"
          style={{ paddingBottom: '0.5rem' }}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="family">Family</option>
        </select>
      </div>
      <button type="submit" className="lm-btn lm-btn-accent">Add Contact</button>
    </form>
  );
}

export default AddContactForm;
