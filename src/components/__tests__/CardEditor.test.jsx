
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardEditor from '../CardEditor';

test('calls onSave with front and back values', () => {
  const handleSave = jest.fn();
  render(<CardEditor onSave={handleSave} />);

  const frontInput = screen.getByLabelText(/Question/i);
  const backInput = screen.getByLabelText(/Réponse/i);
  const saveButton = screen.getByText(/Ajouter/i);

  fireEvent.change(frontInput, { target: { value: 'What is React?' } });
  fireEvent.change(backInput, { target: { value: 'A JavaScript library for building user interfaces' } });
  fireEvent.click(saveButton);

  expect(handleSave).toHaveBeenCalledWith('What is React?', 'A JavaScript library for building user interfaces');
});
