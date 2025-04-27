import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DatePicker from 'react-datepicker';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import './ModalAddTransaction.css';

const categories = [
  'Main expenses', 'Products', 'Car', 'Self care', 'Child care',
  'Household products', 'Education', 'Leisure', 'Other expenses', 'Entertainment'
];

const schema = yup.object({
  type: yup.string().required(),
  category: yup.string().when('type', {
    is: 'expense',
    then: (schema) => schema.required('Category is required'),
  }),
  amount: yup.number().typeError('Enter a number').positive('Must be positive').required('Required'),
  date: yup.date().required('Required'),
  comment: yup.string().required('Required'),
});

const AddTransactionForm = ({ onSubmit, onCancel }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      type: 'expense',
      amount: '',
      date: new Date(),
      category: '',
      comment: '',
    },
    resolver: yupResolver(schema),
  });

  const type = watch('type');
  const category = watch('category');

  const handleTypeChange = (value) => setValue('type', value);

  const handleCategorySelect = (cat) => {
    setValue('category', cat);
    setShowDropdown(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="form-title">Add transaction</div>

      <div className="switcher">
  <span className={type === 'income' ? 'active' : ''}>Income</span>
  <label className="switch">
    <input
      type="checkbox"
      checked={type === 'expense'}
      onChange={() => handleTypeChange(type === 'income' ? 'expense' : 'income')}
    />
    <span className="slider">
      {type === 'income' ? (
        <img src="/plus.svg" alt="Plus" width="44" height="44" />
      ) : (
        <img src="/minus.svg" alt="Minus" width="44" height="44" />
      )}
    </span>
  </label>
  <span className={type === 'expense' ? 'active' : ''}>Expense</span>
</div>


      {type === 'expense' && (
        <div className="dropdown-wrap">
          <label className="dropdown-label"></label>
          <div
            className={`dropdown-select ${showDropdown ? 'open' : ''}`}
            onClick={() => setShowDropdown((s) => !s)}
            tabIndex={0}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          >
            <span>{category || 'Select a category'}</span>
            <span className="dropdown-arrow">&#9662;</span>
          </div>
          {showDropdown && (
            <div className="dropdown-list">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`dropdown-item${cat === category ? ' selected' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
          {errors.category && <p className="error">{errors.category.message}</p>}
        </div>
      )}

      <input
        type="number"
        step="0.01"
        placeholder="0.00"
        className="input"
        {...register('amount')}
      />
      {errors.amount && <p className="error">{errors.amount.message}</p>}

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <div className="date-picker-wrap">
  <div className="date-input-group">
    <DatePicker
      {...field}
      selected={field.value}
      dateFormat="dd.MM.yyyy"
      className="input date-input"
      calendarClassName="custom-calendar"
    />
    <span className="calendar-icon">
      <img src="/calendar.svg" alt="Calendar" width="18" height="20" />
    </span>
  </div>
</div>
        )}
      />
      {errors.date && <p className="error">{errors.date.message}</p>}
<div className='input-wrap'>
      <input
        type="text"
        placeholder="Comment"
        className="input input-comment"
        {...register('comment')}
      />
      </div>
      {errors.comment && <p className="error">{errors.comment.message}</p>}

      <button type="submit" className="submit-button">ADD</button>
      <button type="button" className="cancel-button" onClick={onCancel}>CANCEL</button>
    </form>
  );
};

export default AddTransactionForm;
