// TabSelector.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TabSelector from '../../common/Components/TabSelector/TabSelector';
import styles from '../../common/Components/TabSelector/TabSelector.module.scss';

const tabs = [
    { title: 'Tab 1', navigation: '/tab1' },
    { title: 'Tab 2', navigation: '/tab2' },
    { title: 'Tab 3', navigation: '/tab3' },
];

describe('TabSelector', () => {
    it('renders tabs correctly', () => {
        render(<TabSelector tabs={tabs} />);

        tabs.forEach((tab) => {
            expect(screen.getByText(tab.title)).toBeInTheDocument();
        });
    });

    it('initially selects the first tab', () => {
        render(<TabSelector tabs={tabs} />);

        expect(screen.getByTestId('tabselector')).toContainElement(
            screen.getByText(tabs[0].title)
        );
        expect(screen.getByText(tabs[0].title)).toHaveClass(styles.active);
    });

    it('changes selection on clicking a different tab', () => {
        render(<TabSelector tabs={tabs} />);

        const secondTabButton = screen.getAllByText(tabs[1].title)[0];
        userEvent.click(secondTabButton);
        waitFor(() => {
            expect(screen.getByTestId('tabselector')).toContainElement(
                screen.getByText(tabs[1].title)
            );
            expect(screen.getByText(tabs[1].title)).toHaveClass(styles.active);
            expect(screen.getByText(tabs[0].title)).not.toHaveClass(styles.active);
        });
    });
});
