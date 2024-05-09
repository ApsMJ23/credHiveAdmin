// CompanyViewForm.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CompanyViewForm from '../../modules/Dashboard/Components/CompanyViewForm/CompanyViewForm';

vi.mock('../../../../data/FakeData.ts', () => ({
    ModalData: {
        emails: {
            1: [{ empId: 1, id: 1, email: 'test1@example.com', type: 'Work' }],
            2: [{ empId: 2, id: 2, email: 'test2@example.com', type: 'Personal' }],
        },
    },
}));
vi.mock('react-router-dom', () => ({
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
}));

describe('CompanyViewForm', () => {
    it('renders company name and emails correctly (mocked data)', () => {
        const setShowViewModalMock = vi.fn();
        render(<CompanyViewForm setShowViewModal={setShowViewModalMock} />);

        expect(screen.getByText('Company View Form')).toBeInTheDocument();

        const emails = screen.getAllByRole('textbox');
        expect(emails.length).toBe(3); // Test shows only 1 email initially (id 1)
    });

    it('closes modal on clicking cancel button', async () => {
        const setShowViewModalMock = vi.fn();
        render(<CompanyViewForm setShowViewModal={setShowViewModalMock} />);

        const cancelButton = screen.getByText('Cancel');
        await userEvent.click(cancelButton);

        waitFor(() => {
            expect(setShowViewModalMock).toHaveBeenCalledWith(false);
        });
    });

    // Consider adding tests for:
    // - Rendering multiple emails from ModalData
    // - Handling potential errors during data fetching
});
