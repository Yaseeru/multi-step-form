function Step1({ formData, setFormData, errors, setErrors }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div id="step1">
      <h1 className="text-blue-950 text-2xl font-bold mb-2">Personal info</h1>
      <p className="text-gray-500 tracking-tighter mb-6">
        Please provide your name, email address, and phone number.
      </p>
      <div>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label htmlFor="name" className="text-blue-950">Name</label>
            <p className="text-red-500 text-sm font-medium">{errors.name}</p>
          </div>
          <input 
            type="text" 
            placeholder="e.g. Stephen King" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-950'
            }`}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label htmlFor="email" className="text-blue-950">Email</label>
            <p className="text-red-500 text-sm font-medium">{errors.email}</p>
          </div>
          <input 
            type="email" 
            name="email" 
            id="email" 
            placeholder="e.g. stephenking@lorem.com"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-950'
            }`}
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label htmlFor="phone" className="text-blue-950">Phone Number</label>
            <p className="text-red-500 text-sm font-medium">{errors.phone}</p>
          </div>
          <input 
            type="tel" 
            name="phone" 
            id="phone" 
            placeholder="e.g. +1 234 567 890"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full border px-4 py-2 rounded-lg focus:outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-blue-950'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
export default Step1;
